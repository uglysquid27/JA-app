import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import DefaultSidebar from '@/Layouts/sidebarLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    const { vehicleChecks } = usePage().props;

    return (
        <DefaultSidebar>
            <Head title="Cek Kendaraan" />
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow mt-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">📋 Daftar Cek Kendaraan</h1>
                <Link 
                    href="/vehicle-checks/create" 
                    className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    ➕ Tambah Pemeriksaan
                </Link>

                {/* Tabel pemeriksaan kendaraan */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse mt-4">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 border-b">Kendaraan</th>
                                <th className="px-4 py-2 border-b">Driver</th>
                                <th className="px-4 py-2 border-b">Permintaan</th>
                                <th className="px-4 py-2 border-b">Ban</th>
                                <th className="px-4 py-2 border-b">Oli</th>
                                <th className="px-4 py-2 border-b">Lampu</th>
                                <th className="px-4 py-2 border-b">Catatan</th>
                                <th className="px-4 py-2 border-b">Waktu Cek</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicleChecks.length > 0 ? (
                                vehicleChecks.map((check) => (
                                    <tr key={check.id} className="text-sm text-gray-700 dark:text-gray-100">
                                        <td className="px-4 py-2 border-b">{check.vehicle?.plate_number || '-'}</td>
                                        <td className="px-4 py-2 border-b">{check.driver?.name || '-'}</td>
                                        <td className="px-4 py-2 border-b">{check.rideRequest?.id || '-'}</td>
                                        <td className="px-4 py-2 border-b">{check.tire_condition}</td>
                                        <td className="px-4 py-2 border-b">{check.oil_check}</td>
                                        <td className="px-4 py-2 border-b">{check.light_check}</td>
                                        <td className="px-4 py-2 border-b">{check.additional_notes || '-'}</td>
                                        <td className="px-4 py-2 border-b">{new Date(check.checked_at).toLocaleString('id-ID')}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-gray-500">
                                        Belum ada data pemeriksaan kendaraan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultSidebar>
    );
}
