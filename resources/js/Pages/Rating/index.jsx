import React, { useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Inertia } from '@inertiajs/inertia';
import DefaultSidebar from '@/Layouts/sidebarLayout';
import { Head } from '@inertiajs/react';
import { FaStar } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import { MdCheckCircleOutline } from 'react-icons/md';

export default function RatingPage({ ratingData, requestId, driverId }) {
    const [rating, setRating] = useState(ratingData?.rating || 0);
    const [selectedTemplates, setSelectedTemplates] = useState([]);
    const [komentarKetikan, setKomentarKetikan] = useState(ratingData?.comment || '');
    const [errors, setErrors] = useState({});
    const isRatingDiberikan = ratingData?.rating !== null && ratingData?.rating !== undefined;

    const commentTemplates = [
        "Pelayanan sangat baik dan ramah",
        "Pengemudi mengemudi dengan aman dan cepat",
        "Kendaraan bersih dan nyaman",
        "Terima kasih atas pelayanannya!",
        "Ada sedikit kendala, tapi secara keseluruhan baik"
    ];

    const handleTemplateClick = (template) => {
        if (selectedTemplates.includes(template)) {
            setSelectedTemplates(selectedTemplates.filter((t) => t !== template));
        } else {
            setSelectedTemplates([...selectedTemplates, template]);
        }
    };

    const handleKomentarKetikanChange = (e) => {
        setKomentarKetikan(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const gabunganKomentar = [...selectedTemplates];
        if (komentarKetikan.trim() !== "") {
            gabunganKomentar.push(komentarKetikan.trim());
        }

        const komentarAkhir = gabunganKomentar.join(', ');

        const formData = {
            rating,
            comment: komentarAkhir,
            request_id: requestId,
            driver_id: driverId
        };

        console.log('Mengirim pembaruan:', formData);

        if (ratingData?.id) {
            Inertia.put(route('rating.update', ratingData.id), formData, {
                onSuccess: () => console.log('Rating berhasil diperbarui!'),
                onError: (err) => {
                    console.error('Gagal memperbarui rating:', err);
                    setErrors(err);
                },
            });
        } else {
            console.warn('ID rating tidak tersedia untuk pembaruan.');
        }
    };

    return (
        <DefaultSidebar>
            <Head title='Beri Penilaian Pengemudi' />
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#282828] rounded-lg shadow-xl p-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                            {isRatingDiberikan ? 'Beri Penilaian Anda' : 'Beri Penilaian Pengemudi'}
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                            Masukan Anda membantu kami meningkatkan layanan.
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <FaStar className="inline-block mr-1 text-yellow-500" /> Pilih Rating
                                </label>
                                <Rating
                                    style={{ maxWidth: 250, margin: '0 auto' }}
                                    value={rating}
                                    onChange={setRating}
                                    precision={0.5}
                                    transition
                                    fillColor="#FBBF24"
                                    emptyColor="#D1D5DB"
                                />
                            </div>

                            <div>
                                <label htmlFor="komentar" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <BiCommentDetail className="inline-block mr-1 text-gray-500 dark:text-gray-400" /> Pilih atau Tambah Komentar
                                </label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {commentTemplates.map((template, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`rounded-full px-3 py-1 text-sm focus:outline-none ${
                                                selectedTemplates.includes(template)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                            onClick={() => handleTemplateClick(template)}
                                        >
                                            {template}
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    id="komentar"
                                    rows="3"
                                    placeholder="Tambahkan komentar Anda di sini (opsional)"
                                    value={komentarKetikan}
                                    onChange={handleKomentarKetikanChange}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-[#1f1f1f] dark:text-gray-200 mt-2"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                    rating === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                }`}
                                disabled={rating === 0}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <MdCheckCircleOutline className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                                </span>
                                {isRatingDiberikan ? 'Beri Rating' : 'Kirim Rating'}
                            </button>
                        </div>
                        {Object.keys(errors).length > 0 && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            Ada beberapa kesalahan dengan pengiriman Anda
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <ul className="list-disc pl-5">
                                                {Object.values(errors).map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </DefaultSidebar>
    );
}