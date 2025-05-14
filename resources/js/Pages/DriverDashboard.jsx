import { Head, useForm } from '@inertiajs/react';
import DefaultSidebar from '@/Layouts/sidebarLayout';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { PowerIcon, MapPinIcon, FlagIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

// Komponen Timer untuk menampilkan durasi perjalanan
function RunningTime({ startTime }) {
    const [elapsed, setElapsed] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const start = new Date(startTime);
            const now = new Date();
            const diff = Math.floor((now - start) / 1000);
            const minutes = Math.floor(diff / 60);
            const seconds = diff % 60;
            setElapsed(`${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    return (
        <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-200">
            <ClockIcon className="h-4 w-4 text-blue-500" />
            <span><strong>Berjalan:</strong> {elapsed}</span>
        </div>
    );
}

export default function DriverDashboard({ driver, assignedRequest }) {
    const [loading, setLoading] = useState(false);
    const { post, processing, errors } = useForm({});

    const toggleStatus = () => {
        const newStatus = driver.status === 'available' ? 'off duty' : 'available';
        setLoading(true);
        Inertia.post(route('driver.status'), { status: newStatus }, {
            onSuccess: () => {
                Inertia.reload({ only: ['driver'] });
            },
            onFinish: () => setLoading(false),
            onError: (error) => console.error("Gagal memperbarui status", error),
        });
    };


    const handleAcceptRequest = () => {
        post('/driver/accept-request', {}, {
            onSuccess: () => {
                Inertia.reload({ only: ['assignedRequest'] });
            },
            onError: (error) => console.error(error),
        });
    };

    const handleRideDone = () => {
        post('/driver/complete-request', {}, {
            onSuccess: () => {
                Inertia.reload({ only: ['assignedRequest'] });
            },
            onError: (error) => console.error(error),
        });
    };


    return (
        <DefaultSidebar>
            <Head title="Dasbor Pengemudi" />
            <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-700 shadow overflow-hidden rounded-lg mb-6">
                    <div className="px-4 py-5 sm:px-6">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Selamat datang, <span className="text-blue-600 dark:text-blue-300">{driver.name}</span>
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
                            Kelola status dan permintaan perjalanan Anda di sini.
                        </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-6 bg-gray-50 dark:bg-gray-800 sm:flex sm:items-center sm:justify-between">
                        <div className="flex items-center space-x-3">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Status Saat Ini:
                            </p>
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${driver.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {driver.status === 'available' ? 'Tersedia' : 'Tidak Bertugas'}
                            </span>
                        </div>
                        <button
                            onClick={toggleStatus}
                            disabled={loading}
                            className={`mt-3 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-500 dark:text-gray-400 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading && 'opacity-50 cursor-not-allowed'
                                }`}
                        >
                            <PowerIcon className={`h-5 w-5 mr-2 ${driver.status === 'available' ? 'text-red-500' : 'text-green-500'}`} />
                            {driver.status === 'available' ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                    </div>
                    {errors.status && <div className="px-4 py-3 bg-red-50 text-red-500 text-sm">{errors.status}</div>}
                </div>

                {/* Permintaan yang Diberikan */}
                {assignedRequest && (
                    <div className="bg-white shadow overflow-hidden rounded-lg">
                        <div className="px-4 py-5 sm:px-6 bg-indigo-50 dark:bg-gray-700 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                                Permintaan Perjalanan Saat Ini
                            </h2>
                        </div>
                        <div>
                            <div className="px-4 py-5 sm:p-6 dark:bg-gray-800">
                                <dl className="divide-y divide-gray-200">
                                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                            <MapPinIcon className="h-5 w-5 inline-block mr-1 text-gray-400 " /> Penjemputan
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                            {assignedRequest.pickup}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                            <FlagIcon className="h-5 w-5 inline-block mr-1 text-gray-400" /> Tujuan
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                            {assignedRequest.destination}
                                        </dd>
                                    </div>
                                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                            <ClockIcon className="h-5 w-5 inline-block mr-1 text-gray-400" /> Waktu
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                            {/* Showing the 'time' field */}
                                            {assignedRequest.time ? new Date(assignedRequest.time).toLocaleString() : 'N/A'}
                                        </dd>
                                    </div>

                                    {/* Only show 'Diterima Pada' if 'accepted_at' exists and status is 'accepted' */}
                                    {assignedRequest.status === 'accepted' && assignedRequest.accepted_at && (
                                        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                                <ClockIcon className="h-5 w-5 inline-block mr-1 text-blue-500" /> Diterima Pada
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                                {/* Showing the 'accepted_at' field */}
                                                {assignedRequest.accepted_at ? new Date(assignedRequest.accepted_at).toLocaleString() : 'N/A'}
                                                {/* Displaying RunningTime component */}
                                                <RunningTime startTime={assignedRequest.accepted_at} />
                                            </dd>
                                        </div>
                                    )}


                                    {assignedRequest.status === 'done' && assignedRequest.arrived_at && (
                                        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-200">
                                                <CheckCircleIcon className="h-5 w-5 inline-block mr-1 text-purple-500" /> Tiba Pada
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                                                {new Date(assignedRequest.arrived_at).toLocaleString()}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            <div className="px-4 py-4 sm:px-6 bg-gray-50 dark:bg-gray-600 flex justify-end space-x-2">
                                {assignedRequest.status === 'assigned' && (
                                    <button
                                        onClick={handleAcceptRequest}
                                        disabled={processing}
                                        className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${processing && 'opacity-50 cursor-not-allowed'
                                            }`}
                                    >
                                        {processing ? 'Menerima...' : 'Terima Permintaan'}
                                    </button>
                                )}
                                {assignedRequest.status === 'accepted' && (
                                    <button
                                        onClick={handleRideDone}
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    >
                                        {processing ? 'Menandai...' : 'Tandai Tiba'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DefaultSidebar>
    );
}
