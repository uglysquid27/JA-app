import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Navbar from '@/Layouts/navbar';
import Footer from '@/Layouts/footer';
import { FaCar, FaCalendarCheck, FaClock } from 'react-icons/fa';

export default function Home() {
    return (
        <div className="font-poppins">
            {/* Hero Section */}
            <section id="hero" className="bg-white h-screen flex items-center justify-center">
                <Navbar />
                <div className="container mx-auto px-6 md:px-20 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
                    {/* Text Content */}
                    <div className="lg:w-1/2 mb-10 lg:mb-0">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                            Koordinasi <span className="text-blue-600">Transportasi</span> Korporat yang <span className="text-green-600">Efisien</span>.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-8 italic">
                            Atur setiap perjalanan kantor dengan mulus dan efisien.
                        </p>
                        <p className="text-md md:text-lg text-gray-600 mb-8">
                            Tingkatkan produktivitas tim Anda dengan sistem pemesanan transportasi terpusat. Pantau lokasi kendaraan secara langsung, catat perjalanan secara otomatis, dan pastikan setiap penugasan sopir aman dan terkelola dengan baik.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <Link
                                href={route('login')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition duration-300 ease-in-out"
                            >
                                <span className="flex items-center">
                                    <FaCar className="mr-2" /> Pesan Perjalanan
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="lg:w-1/2 flex items-center justify-center">
                        <img src="/img/corporate-transport.svg" alt="Ilustrasi Transportasi Korporat" className="max-w-md rounded-lg shadow-xl" />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 md:px-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Tentang Aplikasi Kami</h2>
                    <p className="text-lg text-gray-700 mb-10">
                        Kami hadir untuk merevolusi cara Departemen General Affairs (GA) mengelola transportasi internal perusahaan. Aplikasi ini dirancang dengan fokus pada kemudahan penggunaan, efisiensi, dan visibilitas. Dengan fitur-fitur canggih, Anda dapat mengoptimalkan alokasi kendaraan, meminimalkan waktu tunggu, dan mendapatkan data perjalanan yang akurat untuk pengambilan keputusan yang lebih baik.
                    </p>
                    <p className="text-md md:text-lg text-gray-600">
                        Misi kami adalah membantu perusahaan Anda bergerak lebih cerdas dan efisien.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section id="service" className="py-24 bg-white h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 md:px-20 text-center flex flex-col items-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Layanan Utama</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 rounded-full bg-blue-200 text-blue-700 font-bold flex items-center justify-center text-2xl mb-4"> <FaCalendarCheck className="text-3xl" /></div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Permintaan Perjalanan Terstruktur</h3>
                            <p className="text-gray-600">Karyawan dapat mengajukan permintaan perjalanan dengan detail lengkap, memudahkan perencanaan dan persetujuan.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 rounded-full bg-green-200 text-green-700 font-bold flex items-center justify-center text-2xl mb-4"> <FaCar className="text-3xl" /></div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Penugasan Sopir Efisien</h3>
                            <p className="text-gray-600">Admin GA dapat menugaskan sopir dan kendaraan yang sesuai dengan ketersediaan dan kebutuhan perjalanan.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 rounded-full bg-yellow-200 text-yellow-700 font-bold flex items-center justify-center text-2xl mb-4"> <FaClock className="text-3xl" /></div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pencatatan Waktu Otomatis</h3>
                            <p className="text-gray-600">Sistem secara otomatis mencatat waktu keberangkatan dan kedatangan, mengurangi kebutuhan input manual.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how" className="py-24 bg-white h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 md:px-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Bagaimana Cara Kerjanya?</h2>
                    <p className="text-lg text-gray-700 mb-12">
                        Proses yang sederhana dan intuitif untuk manajemen transportasi yang efektif.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 rounded-full bg-blue-200 text-blue-700 font-bold flex items-center justify-center text-2xl mb-4">1</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Pengajuan Permintaan</h4>
                            <p className="text-gray-600 text-center">Karyawan mengisi form permintaan perjalanan dengan detail yang diperlukan.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 rounded-full bg-green-200 text-green-700 font-bold flex items-center justify-center text-2xl mb-4">2</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Persetujuan & Penugasan</h4>
                            <p className="text-gray-600 text-center">Admin GA meninjau, menyetujui, dan menugaskan sopir serta kendaraan.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 rounded-full bg-yellow-200 text-yellow-700 font-bold flex items-center justify-center text-2xl mb-4">3</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Pelaksanaan Perjalanan</h4>
                            <p className="text-gray-600 text-center">Sopir melaksanakan perjalanan sesuai jadwal dan dapat memperbarui status.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 rounded-full bg-indigo-200 text-indigo-700 font-bold flex items-center justify-center text-2xl mb-4">4</div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Penyelesaian & Laporan</h4>
                            <p className="text-gray-600 text-center">Perjalanan selesai tercatat secara otomatis untuk keperluan pelaporan dan analisis.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
