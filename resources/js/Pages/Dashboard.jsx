import DefaultSidebar from '@/Layouts/sidebarLayout';
import { Head } from '@inertiajs/react';
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { useEffect, useState, useMemo } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import {
    BriefcaseIcon,
    ClockIcon,
    UserIcon,
    MapPinIcon,
    ArrowsRightLeftIcon,
    TruckIcon,
    MoonIcon,
    SunIcon,
    EnvelopeIcon,
    StarIcon// Ikon untuk aktivitas terakhir
} from '@heroicons/react/24/outline';
import { format, parseISO, isValid } from 'date-fns';
import { id } from 'date-fns/locale';


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

export default function Dashboard() {
    const [requests, setRequests] = useState([]);
    const [count, setCount] = useState(0); // Assume you have useState if this is React
    const [loadingCount, setLoadingCount] = useState(false);
    const [status, setStatus] = useState('pending'); // Added status state
    const [isDark, setIsDark] = useState(false); // added for dark mode
    const [currentPage, setCurrentPage] = useState(1);
    const [rideRequests, setRideRequests] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [loadingRequests, setLoadingRequests] = useState(false);
    const [logs, setLogs] = useState([]);
    const [loadingLogs, setLoadingLogs] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [statusCounts, setStatusCounts] = useState({ available: 0, 'On Duty': 0, 'Off Day': 0 });
    const [loadingDrivers, setLoadingDrivers] = useState(false);

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

    // Efek untuk fetching data ride requests
    useEffect(() => {
        const fetchRequests = async (page = 1) => {
            setLoadingRequests(true);
            try {
                const response = await fetch(`/requests?page=${page}`);
                if (response.ok) {
                    const data = await response.json();
                    setRideRequests(data.data);
                    setCurrentPage(data.current_page);
                    setLastPage(data.last_page);
                } else {
                    console.error('Failed to fetch ride requests');
                    // Optionally set an error state here
                }
            } catch (error) {
                console.error('Error fetching ride requests:', error);
                // Optionally set an error state here
            } finally {
                setLoadingRequests(false);
            }
        };

        fetchRequests(currentPage);
    }, [currentPage]); // Hanya bergantung pada currentPage

    // Efek untuk fetching count hari ini
    useEffect(() => {
        setLoadingCount(true);
        setStatus('pending');
        fetch('/request/today-count')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network error');
                }
                return response.json();
            })
            .then(data => {
                setCount(data.count);
                setStatus('success');
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setStatus('error');
            })
            .finally(() => setLoadingCount(false));
    }, []); // Hanya dijalankan saat komponen mount

    // Efek untuk fetching history logs
    useEffect(() => {
        setLoadingLogs(true);
        axios.get('/history-logs')
            .then((response) => {
                const logsData = response.data.map((log) => {
                    return {
                        name: log.requester_name || log.driver_name || 'Unknown',
                        action: log.action.replaceAll('_', ' '), // supaya lebih readable
                        destination: log.destination || 'Unknown',
                        pickup: log.pickup || 'Unknown',
                        time: log.request_time || 'Unknown',
                    };
                });

                setLogs(logsData);
            })
            .catch(error => console.error('Error fetching logs:', error))
            .finally(() => setLoadingLogs(false));


    }, []); // Hanya dijalankan saat komponen mount

    // Efek untuk fetching drivers
    useEffect(() => {
        setLoadingDrivers(true);
        axios.get('/drivers')
            .then(res => {
                console.log('Raw drivers from API:', res.data);
                const driversWithAvg = res.data.map(driver => ({
                    ...driver,
                    avg_rating: driver.avg_rating !== null ? parseFloat(driver.avg_rating) : null,
                }));
                setDrivers(driversWithAvg);
                console.log('Processed first driver:', driversWithAvg[0]);
                const counts = driversWithAvg.reduce((acc, driver) => {
                    const status = driver.status;
                    acc[status] = (acc[status] || 0) + 1;
                    return acc;
                }, { available: 0, 'On Duty': 0, 'Off Day': 0 });
                setStatusCounts(counts);
            })
            .catch(err => console.error('Error fetching drivers:', err))
            .finally(() => setLoadingDrivers(false));
    }, []); // Hanya dijalankan saat komponen mount
    const chartData = [
        { name: 'Available', driver: statusCounts['available'] || 0 },
        { name: 'On Duty', driver: statusCounts['On Duty'] || 0 },
        { name: 'Off Day', driver: statusCounts['Off Day'] || 0 },
    ];

    const formatIndonesianDateTime = (dateTimeString) => {
        try {
            const date = parseISO(dateTimeString); // untuk format ISO
            if (!isValid(date)) {
                throw new Error('Invalid date');
            }
            return format(date, "dd MMMM',' HH:mm", { locale: id });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
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
            <Head title='Dashboard' />
            <div className='py-6 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8'>
                <div className='mb-6 flex justify-between items-center bg-white dark:bg-[#282828] rounded-lg shadow-md p-4'>
                    <div>
                        <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>Dashboard</h2>
                        <p className='text-gray-500 dark:text-gray-200'>Pantau aktivitas dan status layanan Anda.</p>
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

                <div id='top card' className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8 dark:text-white'>
                    {[
                        {
                            title: 'Permintaan Hari Ini',
                            value: loadingCount ? <span className="animate-pulse">Memuat...</span> : count,
                            icon: <BriefcaseIcon className='w-6 h-6 text-blue-500 dark:text-[#A78BFA]' />,
                            color: 'bg-blue-50 dark:bg-[#282828]',
                            textColor: 'text-blue-500 dark:text-white',
                        },
                        {
                            title: 'Permintaan Tertunda',
                            value: loadingCount ? <span className="animate-pulse">Memuat...</span> : count,
                            icon: <ClockIcon className='w-6 h-6 text-yellow-500 dark:text-[#A78BFA]' />,
                            color: 'bg-yellow-50 dark:bg-[#282828]',
                            textColor: 'text-yellow-500 dark:text-white',
                        },
                        {
                            title: 'Pengemudi Aktif',
                            value: loadingDrivers ? <span className="animate-pulse">Memuat...</span> : statusCounts['On Duty'],
                            icon: <TruckIcon className='w-6 h-6 text-green-500 dark:text-[#A78BFA]' />,
                            color: 'bg-green-50 dark:bg-[#282828]',
                            textColor: 'text-green-500 dark:text-white',
                            titleColor: 'text-gray-5',
                        },
                        {
                            title: 'Pengemudi Tersedia',
                            value: loadingDrivers ? <span className="animate-pulse">Memuat...</span> : statusCounts['available'],
                            icon: <UserIcon className='w-6 h-6 text-teal-500 dark:text-[#A78BFA]' />,
                            color: 'bg-teal-50 dark:bg-[#282828]',
                            textColor: 'text-teal-500 dark:text-white',
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className={`${card.color} rounded-lg shadow-md p-5 flex items-center justify-between`}
                        >
                            <div>
                                <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>{card.title}</p>
                                <p className={`text-2xl font-bold ${card.textColor} mt-1`}>{card.value}</p>
                            </div>
                            <div className='rounded-full p-3 bg-white shadow dark:bg-gray-500'>
                                {card.icon}
                            </div>
                        </div>
                    ))}
                </div>


                <div id='chart' className={`bg-white dark:bg-[#282828] rounded-lg shadow-md p-6 mb-8 sm:p-0`}>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4 p-4`}>Status Pengemudi</h3>
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart data={chartData} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray='3 3' stroke={isDark ? '#4A5568' : '#e0e0e0'} />
                            <XAxis dataKey='name' tick={{ fill: isDark ? '#E2E8F0' : '#6b7280' }} />
                            <YAxis domain={[0, (dataMax) => (dataMax || 0) + 1]} allowDecimals={false} tick={{ fill: isDark ? '#E2E8F0' : '#6b7280' }} />
                            <Tooltip
                                itemStyle={{ color: isDark ? '#E2E8F0' : '#374151' }}
                                wrapperStyle={{ backgroundColor: isDark ? '#4A5568' : '#f3f4f6', padding: '10px', borderRadius: '5px' }}
                            />
                            {/* <Legend wrapperStyle={{ top: 0, right: 0, backgroundColor: '#fff', borderRadius: 3, lineHeight: '20px' }} /> */}
                            <Bar
                                dataKey='driver'
                                fill={isDark ? '#A78BFA' : '#6366F1'} // Warna batang untuk dark : light
                                activeBar={
                                    <Rectangle
                                        fill={isDark ? '#C4B5FD' : '#a78bfa'} // Warna active bar untuk dark : light
                                        stroke={isDark ? '#8B5CF6' : '#4f46e5'} // Warna stroke active bar untuk dark : light
                                    />
                                }
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div id='card' className='grid gap-6 grid-cols-1 md:grid-cols-2 mb-8'>

                    {/* Request Section */}
                    <div className='bg-white dark:bg-[#282828] rounded-lg shadow-md p-6'>
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-blue-100 border border-blue-200 rounded-full mr-3 dark:bg-blue-900 dark:border-blue-800">
                                <ArrowsRightLeftIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100'>Permintaan Terbaru</h3>
                        </div>

                        {loadingRequests ? (
                            <div className="animate-pulse">
                                <div className="h-10 bg-gray-200 rounded mb-2.5 dark:bg-gray-700"></div>
                                <div className="h-10 bg-gray-200 rounded mb-2.5 dark:bg-gray-700"></div>
                                <div className="h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                            </div>
                        ) : rideRequests.length > 0 ? (
                            rideRequests
                                .slice() // clone array to avoid mutating original state
                                .sort((a, b) => new Date(b.request_time) - new Date(a.request_time)) // sort descending by request_time
                                .map(request => (
                                    <div key={request.id} className='border-b pb-3 mb-3 last:border-b-0 flex items-start justify-between'>
                                        <div>
                                            <h4 className='text-sm font-medium text-gray-700 dark:text-white'>{request.name}</h4>
                                            <p className='text-xs text-gray-500 dark:text-gray-300'>
                                                <MapPinIcon className="w-4 h-4 inline mr-1" /> {request.destination} |
                                                <ClockIcon className="w-4 h-4 inline ml-2 mr-1" /> {formatIndonesianDateTime(request.request_time)}
                                            </p>

                                            {request.status === 'pending' ? (
                                                <button
                                                    onClick={() => Inertia.visit(`/assign/${request.id}`)}
                                                    className='mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400'
                                                >
                                                    Tugaskan
                                                </button>
                                            ) : request.status === 'done' ? (
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    <span className='bg-gray-200 text-gray-700 text-xs font-medium py-2 px-3 rounded-md dark:bg-gray-700 dark:text-gray-300'>
                                                        Selesai {formatIndonesianDateTime(request.arrived_at)}
                                                    </span>
                                                    {!request.rating && (
                                                        <button
                                                            onClick={() => Inertia.visit(`/rating/${request.id}`)}
                                                            className='bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-400'
                                                        >
                                                            Beri Rating
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className='inline-block mt-2 bg-green-100 text-green-700 text-xs font-medium py-2 px-3 rounded-md dark:bg-green-700 dark:text-white'>
                                                    Sudah Ditugaskan
                                                </span>
                                            )}
                                        </div>
                                        {request.status === 'done' && !request.rating && (
                                            <StarIcon className="w-5 h-5 text-yellow-500 ml-2" />
                                        )}
                                    </div>
                                ))
                        ) : (
                            <p className='text-gray-500 text-sm dark:text-gray-400'>Tidak ada permintaan baru.</p>
                        )}
                    </div>

                    {/* Driver Section */}
                    <div className="bg-white dark:bg-[#282828] rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-green-100 border border-green-200 rounded-full mr-3 dark:bg-green-900 dark:border-green-800">
                                <UserIcon className="w-6 h-6 text-green-500 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Status Pengemudi
                            </h3>
                        </div>

                        {loadingDrivers ? (
                            <div className="animate-pulse">
                                <div className="h-10 bg-gray-200 rounded mb-2.5 dark:bg-gray-700" />
                                <div className="h-10 bg-gray-200 rounded mb-2.5 dark:bg-gray-700" />
                                <div className="h-10 bg-gray-200 rounded dark:bg-gray-700" />
                            </div>
                        ) : drivers.length > 0 ? (
                            drivers.map((driver, index) => {
                                const statusColor =
                                    driver.status === 'available'
                                        ? 'bg-green-500'
                                        : driver.status === 'On Duty'
                                            ? 'bg-yellow-500'
                                            : 'bg-red-500';
                                const textColor = 'text-white';

                                const renderStars = (rating) => {
                                    const stars = [];
                                    const fullStars = Math.floor(rating);
                                    const hasHalfStar = rating - fullStars >= 0.5;

                                    for (let i = 1; i <= 5; i++) {
                                        if (i <= fullStars) {
                                            // Full star
                                            stars.push(
                                                <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.976 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.97 2.746c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.911L9.05 2.927z" />
                                                </svg>
                                            );
                                        } else if (i === fullStars + 1 && hasHalfStar) {
                                            // Half star
                                            stars.push(
                                                <svg key={i} className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                                    <defs>
                                                        <linearGradient id={`halfGradient${i}`}>
                                                            <stop offset="50%" stopColor="#FBBF24" />
                                                            <stop offset="50%" stopColor="#D1D5DB" />
                                                        </linearGradient>
                                                    </defs>
                                                    <path fill={`url(#halfGradient${i})`} d="M12 .587l3.668 7.431L24 9.753l-6 5.849L19.335 24 12 19.897 4.66s5 24 6 15.602 0 9.753l8.332-1.735z" />
                                                </svg>
                                            );
                                        } else {
                                            // Empty star
                                            stars.push(
                                                <svg key={i} className="w-4 h-4 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.976 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.97 2.746c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.911L9.05 2.927z" />
                                                </svg>
                                            );
                                        }
                                    }

                                    return stars;
                                };

                                return (
                                    <div
                                        key={driver.id || index}
                                        className="flex justify-between items-center border-b pb-3 mb-3 last:border-b-0"
                                    >
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 dark:text-white">
                                                {driver.name || 'Pengemudi Tanpa Nama'}
                                            </h4>
                                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-300">
                                                Rating: {renderStars(driver.avg_rating)}  ({driver.avg_rating} dari {driver.rating_count} rating)
                                            </div>
                                        </div>
                                        <span
                                            className={`${statusColor} ${textColor} text-xs font-medium py-1 px-2 rounded-full`}
                                        >
                                            {driver.status}
                                        </span>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 text-sm dark:text-gray-400">Tidak ada data pengemudi.</p>
                        )}
                    </div>
                </div>

                <div id='activity' className='bg-white dark:bg-[#282828] rounded-lg shadow-md p-6'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center dark:text-white'>
                        <div className="p-2 bg-yellow-100 border border-yellow-200 rounded-full mr-3 dark:bg-yellow-600 dark:border-yellow-800">
                            <EnvelopeIcon className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
                        </div>
                        Aktivitas Terakhir
                    </h3>

                    {loadingLogs ? (
                        <div className="animate-pulse">
                            <div className="h-10 bg-gray-200 rounded mb-2 dark:bg-gray-700"></div>
                            <div className="h-10 bg-gray-200 rounded mb-2 dark:bg-gray-700"></div>
                            <div className="h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
                        </div>
                    ) : paginatedLogs.length > 0 ? (
                        paginatedLogs.map((log, index) => (
                            <div key={index} className='border-b pb-3 mb-3 last:border-b-0 flex items-center'>
                                <div className='mr-4 rounded-full bg-gray-100 dark:bg-gray-700 p-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 dark:text-gray-400">
                                        {log.action.toLowerCase().includes('kirim') && (
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        )}
                                        {log.action.toLowerCase().includes('ubah') && (
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M16.023 9.343l-4 4c-.207.205-.512.342-.83.342h-.718a9 9 0 00-5.52 5.52m8.353-9.343l4-4c.205-.207.342-.512.342-.83V13.5a9 9 0 01-5.52 5.52h-.718c-.318 0-.623-.137-.83-.342l-4-4" />
                                        )}
                                        {!log.action.toLowerCase().includes('kirim') &&
                                            !log.action.toLowerCase().includes('ubah') && (
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M15.75 17.25L12 21m0 0l-3-3m3 3V3m-9 19.5h18M9 6.75a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3zm3 0a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3zm3 0a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3zm3 0a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3z" />
                                            )}
                                    </svg>
                                </div>
                                <div>
                                    <p className='font-semibold text-gray-700 dark:text-white'>{log.name}</p>
                                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                                        <span className='font-semibold'>{log.action}</span> ke <span className='font-medium'>{log.destination}</span> dari <span className='font-medium'>{log.pickup}</span><br />
                                        <span className='text-xs'>{log.time}</span>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-500 text-sm dark:text-gray-400'>Belum ada aktivitas terbaru.</p>
                    )}
                    <Pagination
                        currentPage={logsPage}
                        totalPages={Math.ceil(logs.length / itemsPerPage)}
                        onPageChange={setLogsPage}
                    />
                </div>

            </div>
        </DefaultSidebar>

    );
}