import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import DefaultSidebar from '@/Layouts/sidebarLayout';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;
  const [requestsPage, setRequestsPage] = useState(1);
  const [driversPage, setDriversPage] = useState(1);
  const [logsPage, setLogsPage] = useState(1);

  const exportToExcel = (data, sheetName, fileName) => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const formattedData = data.map(item => {
      if (sheetName === 'Requests') {
        return {
          ID: item.id,
          'Nama Pemesan': item.user?.name || item.name || '-',
          Driver: item.driver?.name || item.driver?.user?.username || 'Belum Dipilih',
          Pickup: item.pickup,
          Tujuan: item.destination,
          'Waktu Permintaan': item.request_time,
          Status: item.status,
        };
      }
      if (sheetName === 'Drivers') {
        return {
          ID: item.id,
          Nama: item.name || '-',
          Username: item.user?.username || '-',
          Email: item.user?.email || '-',
          'No. Telepon': item.phone || '-',
          Status: item.status || '-',
        };
      }
      if (sheetName === 'Logs') {
        return {
          ID: item.id,
          Aksi: item.action.replaceAll('_', ' '),
          Pemesan: item.requester_name || '-',
          Driver: item.driver_name || '-',
          Pickup: item.pickup,
          Tujuan: item.destination,
          Waktu: new Date(item.created_at).toLocaleString(),
          Oleh: item.user?.username || '-',
        };
      }
      return item;
    });

    // Buat worksheet dan workbook menggunakan XLSX
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate buffer dan simpan file
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
  };

  // Dark mode from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Save dark mode changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Fetch data on mount
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
            aria-label="Toggle Dark Mode"
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
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Log Permintaan</h2>
                  <button
                    onClick={() => exportToExcel(requests, 'Requests', 'Laporan_Permintaan')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Export Excel
                  </button>
                </div>
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
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {paginatedRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{request.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{request.user?.name || request.name || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{request.driver?.name || request.driver?.user?.username || 'Belum Dipilih'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{request.pickup}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{request.destination}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{request.request_time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{request.status}</td>
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

              {/* Drivers Log */}
              <section>
                <div className="flex justify-between items-center mb-3 mt-10">
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Log Pengemudi</h2>
                  <button
                    onClick={() => exportToExcel(drivers, 'Drivers', 'Laporan_Pengemudi')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Export Excel
                  </button>
                </div>
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
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {paginatedDrivers.map((driver) => (
                        <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{driver.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{driver.name || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{driver.user?.username || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{driver.user?.email || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{driver.phone || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{driver.status || '-'}</td>
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

              {/* Logs Activity */}
              <section>
                <div className="flex justify-between items-center mb-3 mt-10">
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Log Aktivitas</h2>
                  <button
                    onClick={() => exportToExcel(logs, 'Logs', 'Laporan_Logs')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Export Excel
                  </button>
                </div>
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
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {paginatedLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.action.replaceAll('_', ' ')}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.requester_name || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.driver_name || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.pickup}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.destination}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{new Date(log.created_at).toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.user?.username || '-'}</td>
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
