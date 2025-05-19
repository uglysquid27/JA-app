import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import DefaultSidebar from '@/Layouts/sidebarLayout';
import {
    MoonIcon,
    SunIcon,
} from '@heroicons/react/24/outline';

// Reusable Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-end gap-2 mt-4 ">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
        >
            Prev
        </button>
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
        >
            Next
        </button>
    </div>
);

export default function ReportPage() {
    const [requests, setRequests] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [logs, setLogs] = useState([]);
    const [isDark, setIsDark] = useState(false); // added for dark mode
    const [loading, setLoading] = useState(true);

    // Pagination state
    const itemsPerPage = 5;
    const [requestsPage, setRequestsPage] = useState(1);
    const [driversPage, setDriversPage] = useState(1);
    const [logsPage, setLogsPage] = useState(1);

    // Efek untuk mengelola tema gelap/terang
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
    }, [isDark]); // Dijalankan setiap kali isDark berubah

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchRequests(),
                fetchDrivers(),
                fetchLogs(),
            ]);
        } catch (e) {
            console.error("Failed to fetch data:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchRequests = async () => {
        const res = await axios.get(route('reports.requests'));
        setRequests(res.data);
    };

    const fetchDrivers = async () => {
        const res = await axios.get(route('reports.drivers'));
        setDrivers(res.data);
    };

    const fetchLogs = async () => {
        const res = await axios.get(route('reports.logs'));
        setLogs(res.data);
    };

    // Paginated data
    const paginatedRequests = useMemo(() => {
        const start = (requestsPage - 1) * itemsPerPage;
        return requests.slice(start, start + itemsPerPage);
    }, [requests, requestsPage]);

    const paginatedDrivers = useMemo(() => {
        const start = (driversPage - 1) * itemsPerPage;
        return drivers.slice(start, start + itemsPerPage);
    }, [drivers, driversPage]);

    const paginatedLogs = useMemo(() => {
        const start = (logsPage - 1) * itemsPerPage;
        return logs.slice(start, start + itemsPerPage);
    }, [logs, logsPage]);

    return (
        <DefaultSidebar>
            <Head title="Report Sistem" />
            <div className='py-6 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8'>
                <div className='mb-6 flex justify-between items-center bg-white dark:bg-[#282828] rounded-lg shadow-md p-4'>
                    <div>
                        <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>Reporting</h2>
                        <p className='text-gray-500 dark:text-gray-200'>Lihat ringkasan lengkap aktivitas sistem, termasuk permintaan, pengemudi, dan log aktivitas.</p>
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
                <div className="p-6 space-y-12">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Laporan Sistem</h1>

                    {loading ? (
                        <p className="text-gray-600 dark:text-gray-300">Loading data...</p>
                    ) : (
                        <>
                            {/* Requests Log */}
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Log Permintaan</h2>
                                <div className="overflow-x-auto rounded-lg shadow">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                        <thead className="bg-gray-100 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Pemesan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Driver</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pickup</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tujuan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Waktu Permintaan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {paginatedRequests.map((req) => (
                                                <tr key={req.id}>
                                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{req.id}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{req.user?.name || req.name || '-'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{req.driver?.name || req.driver?.user?.username || '-'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{req.pickup}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{req.destination}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{req.request_time}</td>
                                                    <td className="px-6 py-4 text-sm capitalize text-gray-600 dark:text-gray-300">{req.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    currentPage={requestsPage}
                                    totalPages={Math.ceil(requests.length / itemsPerPage)}
                                    onPageChange={setRequestsPage}
                                />
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
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">No. Telepon</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {paginatedDrivers.map((driver) => (
                                                <tr key={driver.id}>
                                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{driver.id}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{driver.name || '-'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{driver.user?.username || '-'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{driver.user?.email || '-'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{driver.phone || '-'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 capitalize">{driver.status || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    currentPage={driversPage}
                                    totalPages={Math.ceil(drivers.length / itemsPerPage)}
                                    onPageChange={setDriversPage}
                                />
                            </section>

                            {/* Activity Logs */}
                            <section className="mt-10">
                                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Log Aktivitas</h2>
                                <div className="overflow-x-auto rounded-lg shadow">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                        <thead className="bg-gray-100 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pemesan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Driver</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pickup</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tujuan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Waktu</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Oleh</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {paginatedLogs.map((log) => (
                                                <tr key={log.id}>
                                                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{log.id}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{log.action.replaceAll('_', ' ')}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{log.requester_name || '-'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{log.driver_name || '-'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{log.pickup}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{log.destination}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                        {new Date(log.created_at).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                        {log.user?.username || '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    currentPage={logsPage}
                                    totalPages={Math.ceil(logs.length / itemsPerPage)}
                                    onPageChange={setLogsPage}
                                />
                            </section>
                        </>
                    )}
                </div>
            </div>
        </DefaultSidebar>
    );
}
