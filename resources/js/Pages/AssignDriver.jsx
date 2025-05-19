import { Head, useForm } from '@inertiajs/react'
import DefaultSidebar from '@/Layouts/sidebarLayout'
import { useState, useEffect } from 'react'
import {
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/outline';

export default function AssignRequest({ request, drivers }) {
    const { data, setData, post, processing } = useForm({
        request_id: request.id,
        driver_id: ''
    })

    const [successMessage, setSuccessMessage] = useState('')
    const [isDark, setIsDark] = useState(false); // added for dark mode
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data); // 👀 log to inspect
        post('/assign-driver', {
            onSuccess: () => {
                setSuccessMessage('Driver berhasil ditugaskan.');
            },
            onError: () => {
                setSuccessMessage('');
            },
        });
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDark(true);
            window.document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            window.document.documentElement.classList.remove('dark');
        }
    }, []); // Hanya dijalankan saat komponen mount untuk inisialisasi dari localStorage

    // Efek untuk menerapkan perubahan tema dan menyimpannya
    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]); // Dijalankan setiap kali is

    return (
        <DefaultSidebar>
               <Head title='Tugaskan Driver' />
            <div className='py-6 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8'>
                <div className='mb-6 flex justify-between items-center bg-white dark:bg-[#282828] rounded-lg shadow-md p-4'>
                    <div>
                        <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>Tugaskan Driver</h2>
                        <p className='text-gray-500 dark:text-gray-200'>Optimalkan penjadwalan dan penugasan driver untuk pelayanan terbaik.</p>
                    </div>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {isDark ? (
                            <SunIcon className="w-6 h-6 text-yellow-400" />
                        ) : (
                            <MoonIcon className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>
                <Head title="Tugaskan Driver" />
                <div className="max-w-4xl mx-auto p-6 mt-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">Tugaskan Driver</h1>

                    <div className="bg-white dark:bg-[#282828] shadow-md rounded-xl p-6 space-y-6 border border-gray-100 dark:border-gray-800">
                        {successMessage && (
                            <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded">
                                ✅ {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Detail permintaan */}
                            <div className="col-span-2">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2 dark:text-white">📝 Detail Permintaan</h2>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-white">Nama Pemesan</label>
                                <input
                                    type="text"
                                    value={request.name}
                                    disabled
                                    className="w-full border rounded-lg p-2 bg-gray-100 dark:bg-[#282828] dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-white">Tujuan</label>
                                <input
                                    type="text"
                                    value={request.destination}
                                    disabled
                                    className="w-full border rounded-lg p-2 bg-gray-100 dark:bg-[#282828] dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-white">Penjemputan</label>
                                <input
                                    type="text"
                                    value={request.pickup}
                                    disabled
                                    className="w-full border rounded-lg p-2 bg-gray-100 dark:bg-[#282828] dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-white">Waktu</label>
                                <input
                                    type="text"
                                    value={new Date(request.time).toLocaleString('id-ID')}
                                    disabled
                                    className="w-full border rounded-lg p-2 bg-gray-100 dark:bg-[#282828] dark:text-white"
                                />
                            </div>

                            {/* Pilih driver */}
                            <div className="col-span-2 mt-4">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2 dark:text-white">👤 Pilih Driver Tersedia</h2>
                                <select
                                    value={data.driver_id}
                                    onChange={e => setData('driver_id', e.target.value)}
                                    className="w-full border border-gray-600 dark:border-white dark:text-white rounded-lg p-2 dark:bg-[#282828]"
                                    required
                                >
                                    <option value="">Pilih driver</option>
                                    {drivers
                                        .filter(driver => driver.status === 'available')
                                        .map(driver => (
                                            <option key={driver.id} value={driver.id}>
                                                {driver.name} ({driver.status})
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* Tombol submit */}
                            <div className="col-span-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 transition"
                                >
                                    {processing ? 'Menugaskan...' : 'Tugaskan Driver'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultSidebar>
    )
}
