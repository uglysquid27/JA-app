import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import Navbar from '@/Layouts/navbar';

export default function Home() {
    return (
        <div>
            {/* Bagian Hero */}
            <Navbar />
            <section id="hero" className="hero bg-white min-h-screen flex items-center justify-center pt-20">
    <div className="hero-content flex flex-col lg:flex-row items-center lg:justify-between px-6 lg:px-20 w-full max-w-7xl">
        {/* Bagian Teks */}
        <div className="lg:w-1/2 text-center lg:text-left font-poppins">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-black">
                Koordinasi
                <span className="relative inline-block highlight-blue-sky ml-2">Transportasi.</span>
            </h1>
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-black">
                Korporat
                <span className="relative inline-block highlight-blue ml-2">Efisien.</span>
            </h1>
            <p className="text-xl text-gray-700 mb-4 italic">
                Atur Perjalanan Kantor dengan Mudah dan Cepat.
            </p>
            <p className="text-lg text-gray-600 mb-6">
                Tingkatkan efisiensi mobilitas perusahaan dengan sistem pemesanan tumpangan terintegrasi: real-time tracking, pencatatan otomatis, dan penugasan sopir yang aman.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
                <div className="relative group">
                    <Link
                        href={route('book')}
                        className="bg-[#85C4F9] text-black font-bold py-4 px-8 border-2 border-black relative z-10 inline-block text-center"
                    >
                        Pesan Perjalanan
                    </Link>
                    <div className="absolute top-2 left-2 bg-black w-full h-full z-0 transition-all duration-300 group-hover:top-0 group-hover:left-0"></div>
                </div>
            </div>
        </div>

        {/* Gambar */}
        <div className="lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0">
            <div className="max-w-sm rounded-lg bg-gray-200 flex items-center justify-center" style={{ height: '300px', width: '300px' }}>
                <span className="text-gray-500">Placeholder Gambar</span>
            </div>
        </div>
    </div>
</section>


            {/* Bagian Tentang */}
            <section id="about" className="hero bg-white min-h-12 flex items-center justify-center pt-20">
                <div className="hero-content flex flex-col lg:flex-row items-center lg:justify-between px-6 lg:px-20 w-full max-w-7xl">
                    <div className="lg:w-full text-center lg:text-left font-poppins">
                        <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-black">
                            Tentang Aplikasi Ini
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Aplikasi ini dikembangkan untuk mendukung Departemen General Affairs (GA) dalam mengelola kebutuhan transportasi internal perusahaan secara lebih efisien dan sistematis. Aplikasi ini menyederhanakan proses permintaan, penugasan, dan pemantauan perjalanan karyawan, sehingga memastikan penggunaan kendaraan dan waktu yang efektif.
                        </p>
                    </div>
                </div>
            </section>

            {/* Layanan */}
            <section id="service" className="min-h-24 pt-60 px-8">
                <div className="max-w-6xl mx-auto text-center font-poppins">
                    <h2 className="text-4xl font-bold text-black mb-12">Layanan Kami</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                        {[
                            {
                                title: 'Permintaan Perjalanan',
                                description: 'Buat dan kelola permintaan perjalanan dengan mudah.',
                                image: '/img/spread.png',
                            },
                            {
                                title: 'Penugasan Sopir',
                                description: 'Tugaskan sopir secara real-time dengan deteksi konflik jadwal.',
                                image: '/img/treat.png',
                            },
                            {
                                title: 'Pencatatan Otomatis',
                                description: 'Waktu keberangkatan dan kedatangan dicatat otomatis—tanpa input manual.',
                                image: '/img/protect.png',
                            },
                        ].map((service, index) => (
                            <div key={index} className="relative h-full w-full max-w-sm">
                                <div className="absolute top-2 left-2 w-full h-full bg-[#85C4F9] rounded-lg z-0"></div>
                                <div className="relative bg-white border-2 border-black rounded-lg p-8 z-10 h-full flex flex-col items-center">
                                    <div className="mb-6">
                                        <img src={service.image} alt={service.title} className="mx-auto w-14 h-14 scale-150" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-black">{service.title}</h3>
                                    <p className="text-gray-600 text-center">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cara Kerja */}
            <section id="how" className="bg-white min-h-screen pt-60 px-8">
                <div className="max-w-6xl mx-auto text-center font-poppins">
                    <h2 className="text-4xl font-bold text-black mb-6">Cara Kerja</h2>
                    <p className="text-gray-600 text-lg mb-12">
                        Kami membuatnya sederhana, cepat, dan mudah diakses oleh semua orang.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        {[
                            {
                                step: 1,
                                title: 'Ajukan Permintaan Perjalanan',
                                text: 'Karyawan mengisi formulir dengan tujuan, waktu penjemputan, dan keperluan.',
                                color: '#a0f0c5',
                            },
                            {
                                step: 2,
                                title: 'Tinjauan & Penugasan Admin',
                                text: 'Admin GA menyetujui permintaan dan menugaskan sopir serta kendaraan yang tersedia.',
                                color: '#85C4F9',
                            },
                            {
                                step: 3,
                                title: 'Pelaksanaan Perjalanan',
                                text: 'Sopir yang ditugaskan melaksanakan perjalanan dan memperbarui status di sistem.',
                                color: '#a0f0c5',
                            },
                            {
                                step: 4,
                                title: 'Penyelesaian & Pencatatan',
                                text: 'Perjalanan ditandai selesai dan tercatat di sistem untuk pelacakan dan laporan.',
                                color: '#85C4F9',
                            },
                        ].map(({ step, title, text, color }) => (
                            <div key={step} className="flex flex-col items-center">
                                <div className="w-20 h-20 flex items-center justify-center rounded-full text-2xl font-bold border-2 border-black mb-4" style={{ backgroundColor: color }}>
                                    {step}
                                </div>
                                <h4 className="text-xl font-bold mb-2 text-black">{title}</h4>
                                <p className="text-gray-600 text-center">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gaya CSS inline */}
            <style>
                {`
          .highlight-blue::before, .highlight-blue-sky::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            height: 0.6em;
            z-index: -1;
            border-radius: 4px;
          }
          .highlight-blue::before {
            background-color: #1E73BE;
          }
          .highlight-blue-sky::before {
            background-color: #85C4F9;
          }
          .font-poppins {
            font-family: 'Poppins', sans-serif;
          }
        `}
            </style>
        </div>
    );
}
