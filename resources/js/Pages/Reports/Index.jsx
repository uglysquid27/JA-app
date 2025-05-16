import React from 'react';
import { Head } from '@inertiajs/react';
import DefaultSidebar from '@/Layouts/sidebarLayout';

export default function ReportPage({ requests, drivers, logs }) {
    return (
        <DefaultSidebar>
            <Head title="Laporan Sistem" />

            <div className="p-6 space-y-12">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Laporan Sistem</h1>

                {/* Requests Log */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Log Permintaan</h2>
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Driver</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pickup</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tujuan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Waktu</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {requests.map((req) => (
                                    <tr key={req.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{req.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{req.user?.name || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{req.driver?.user?.name || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{req.pickup_location}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{req.destination}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{req.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Drivers */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Daftar Pengemudi</h2>
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. Telepon</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {drivers.map((driver) => (
                                    <tr key={driver.id}>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{driver.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{driver.user?.name || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{driver.phone || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Activity Logs */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Riwayat Aktivitas</h2>
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aktivitas</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Waktu</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {logs.map((log) => (
                                    <tr key={log.id}>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{log.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{log.user?.name || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{log.activity}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{log.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </DefaultSidebar>
    );
}
