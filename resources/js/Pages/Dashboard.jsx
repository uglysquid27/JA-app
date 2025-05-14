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
    Legend,
    ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';
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
    EnvelopeIcon, // Ikon untuk aktivitas terakhir
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { id } from 'date-fns/locale'; // Import Indonesian locale

export default function Dashboard() {
    const [isDark, setIsDark] = useState(() => localStorage.theme === 'dark');
    const [count, setCount] = useState(0);
    const [rideRequests, setRideRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [logs, setLogs] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [statusCounts, setStatusCounts] = useState({
        available: 0,
        'On Duty': 0,
        'Off Day': 0,
    });
    const [loadingRequests, setLoadingRequests] = useState(true);
    const [loadingCount, setLoadingCount] = useState(true);
    const [loadingLogs, setLoadingLogs] = useState(true);
    const [loadingDrivers, setLoadingDrivers] = useState(true);
    const [theme, setTheme] = useState('light'); // State untuk menyimpan tema

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
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

        setLoadingCount(true);
        fetch('http://localhost:8000/request/today-count')
            .then(response => response.ok ? response.json() : Promise.reject('Network error'))
            .then(data => setCount(data.count))
            .catch(error => console.error('Fetch error:', error))
            .finally(() => setLoadingCount(false));

        setLoadingLogs(true);
        axios.get('/history-logs')
            .then((response) => {
                const logsData = response.data.map((log) => {
                    const parsedData = JSON.parse(log.data);
                    const logMsg = parsedData.log_message;
                    const match = logMsg.match(/^(.+?) needs to go to (.+?) and picked up from (.+?) at (.+?)\./);
                    return {
                        name: match?.[1] || 'Unknown',
                        action: log.action,
                        destination: match?.[2] || 'Unknown',
                        pickup: match?.[3] || 'Unknown',
                        time: match?.[4] || 'Unknown'
                    };
                });
                setLogs(logsData);
            })
            .catch(error => console.error('Error fetching logs:', error))
            .finally(() => setLoadingLogs(false));

        setLoadingDrivers(true);
        axios.get('/drivers')
            .then(res => {
                const counts = res.data.reduce((acc, driver) => {
                    const status = driver.status;
                    acc[status] = (acc[status] || 0) + 1;
                    return acc;
                }, { available: 0, 'On Duty': 0, 'Off Day': 0 });
                setDrivers(res.data);
                setStatusCounts(counts);
            })
            .catch(err => console.error('Error fetching drivers:', err))
            .finally(() => setLoadingDrivers(false));

    }, [currentPage, isDark]);

    const chartData = [
        { name: 'Available', driver: statusCounts['available'] || 0 },
        { name: 'On Duty', driver: statusCounts['On Duty'] || 0 },
        { name: 'Off Day', driver: statusCounts['Off Day'] || 0 },
    ];

    const formatIndonesianDateTime = (dateTimeString) => {
        try {
            const date = new Date(dateTimeString);
            return format(date, "dd MMMM',' HH:mm", { locale: id });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    return (
        <DefaultSidebar>
            <Head title='Dashboard' />
            <div className='py-6 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8'>
                <div className='mb-6 flex justify-between items-center'>
                    <div>
                        <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-100'>Dashboard</h2>
                        <p className='text-gray-500'>Pantau aktivitas dan status layanan Anda.</p>
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

                <div id='top card' className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
                    {[
                        {
                            title: 'Permintaan Hari Ini',
                            value: loadingCount ? <span className="animate-pulse">Memuat...</span> : count,
                            icon: <BriefcaseIcon className='w-6 h-6 text-blue-500' />,
                            color: 'bg-blue-50',
                            textColor: 'text-blue-500',
                        },
                        {
                            title: 'Permintaan Tertunda',
                            value: 5,
                            icon: <ClockIcon className='w-6 h-6 text-yellow-500' />,
                            color: 'bg-yellow-50',
                            textColor: 'text-yellow-500',
                        },
                        {
                            title: 'Pengemudi Aktif',
                            value: loadingDrivers ? <span className="animate-pulse">Memuat...</span> : statusCounts['On Duty'],
                            icon: <TruckIcon className='w-6 h-6 text-green-500' />,
                            color: 'bg-green-50',
                            textColor: 'text-green-500',
                        },
                        {
                            title: 'Pengemudi Tersedia',
                            value: loadingDrivers ? <span className="animate-pulse">Memuat...</span> : statusCounts['available'],
                            icon: <UserIcon className='w-6 h-6 text-teal-500' />,
                            color: 'bg-teal-50',
                            textColor: 'text-teal-500',
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            className={`${card.color} rounded-lg shadow-md p-5 flex items-center justify-between`}
                        >
                            <div>
                                <p className='text-sm font-medium text-gray-600'>{card.title}</p>
                                <p className={`text-2xl font-bold ${card.textColor} mt-1`}>{card.value}</p>
                            </div>
                            <div className='rounded-full p-3 bg-white shadow'>
                                {card.icon}
                            </div>
                        </div>
                    ))}
                </div>


                <div id='chart' className='bg-white rounded-lg shadow-md p-6 mb-8'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>Status Pengemudi</h3>
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart data={chartData} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray='3 3' stroke='#e0e0e0' />
                            <XAxis dataKey='name' tick={{ fill: '#6b7280' }} />
                            <YAxis domain={[0, (dataMax) => (dataMax || 0) + 1]} allowDecimals={false} tick={{ fill: '#6b7280' }} />
                            <Tooltip itemStyle={{ color: '#374151' }} wrapperStyle={{ backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '5px' }} />
                            <Legend wrapperStyle={{ top: 0, right: 0, backgroundColor: '#fff', borderRadius: 3, lineHeight: '20px' }} />
                            <Bar dataKey='driver' fill='#6366F1' activeBar={<Rectangle fill='#a78bfa' stroke='#4f46e5' />} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div id='card' className='grid gap-6 grid-cols-1 md:grid-cols-2 mb-8'>

                    {/* Request Section */}
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-blue-100 border border-blue-200 rounded-full mr-3">
                                <ArrowsRightLeftIcon className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Permintaan Terbaru</h3>
                        </div>
                        {loadingRequests ? (
                            <div className="animate-pulse">
                                <div className="h-10 bg-gray-200 rounded mb-2.5"></div>
                                <div className="h-10 bg-gray-200 rounded mb-2.5"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        ) : rideRequests.length > 0 ? (
                            rideRequests.map(request => (
                                <div key={request.id} className='border-b pb-3 mb-3 last:border-b-0'>
                                    <h4 className='text-sm font-medium text-gray-700'>{request.name}</h4>
                                    <p className='text-xs text-gray-500'>
                                        <MapPinIcon className="w-4 h-4 inline mr-1" /> {request.destination} |
                                        <ClockIcon className="w-4 h-4 inline ml-2 mr-1" /> {formatIndonesianDateTime(request.time)}
                                    </p>
                                    <button
                                        onClick={() => Inertia.visit(`/assign/${request.id}`)}
                                        className='mt-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1'>
                                        Tugaskan
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className='text-gray-500 text-sm'>Tidak ada permintaan baru.</p>
                        )}
                    </div>

                    {/* Driver Section */}
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-green-100 border border-green-200 rounded-full mr-3">
                                <UserIcon className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className='text-lg font-semibold text-gray-800'>Status Pengemudi</h3>
                        </div>
                        {loadingDrivers ? (
                            <div className="animate-pulse">
                                <div className="h-10 bg-gray-200 rounded mb-2.5"></div>
                                <div className="h-10 bg-gray-200 rounded mb-2.5"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        ) : drivers.length > 0 ? (
                            drivers.map((driver, index) => {
                                const statusColor = driver.status === 'available'
                                    ? 'bg-green-500' : driver.status === 'On Duty'
                                        ? 'bg-yellow-500' : 'bg-red-500';
                                const textColor = 'text-white';
                                return (
                                    <div key={index} className='flex justify-between items-center border-b pb-3 mb-3 last:border-b-0'>
                                        <h4 className='text-sm font-medium text-gray-700'>{driver.name || 'Pengemudi Tanpa Nama'}</h4>
                                        <span className={`${statusColor} ${textColor} text-xs font-medium py-1 px-2 rounded-full`}>{driver.status}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <p className='text-gray-500 text-sm'>Tidak ada data pengemudi.</p>
                        )}
                    </div>
                </div>


                <div id='activity' className='bg-white rounded-lg shadow-md p-6'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
                        <EnvelopeIcon className="w-6 h-6 text-gray-500 mr-2" /> Aktivitas Terakhir
                    </h3>
                    {loadingLogs ? (
                        <div className="animate-pulse">
                            <div className="h-12 bg-gray-200 rounded mb-2.5"></div>
                            <div className="h-12 bg-gray-200 rounded mb-2.5"></div>
                            <div className="h-12 bg-gray-200 rounded"></div>
                        </div>
                    ) : logs.length > 0 ? (
                        logs.map((log, index) => (
                            <div key={index} className='border-b pb-3 mb-3 last:border-b-0 flex items-center'>
                                <div className='mr-3'>
                                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <p className='font-medium text-gray-700'>{log.name}</p>
                                    <p className='text-sm text-gray-600'>
                                        <span className='font-semibold'>{log.action}</span> ke <span className='font-medium'>{log.destination}</span> dari <span className='font-medium'>{log.pickup}</span> pada {log.time}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-500 text-sm'>Belum ada aktivitas terbaru.</p>
                    )}
                </div>
            </div>
        </DefaultSidebar>
    );
}