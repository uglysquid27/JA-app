import DefaultSidebar from '@/Layouts/sidebarLayout'
import { Head } from '@inertiajs/react'
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
} from 'recharts'
import { useEffect, useState } from 'react'
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

export default function Dashboard() {
    const [count, setCount] = useState(0);
    const [rideRequests, setRideRequests] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [logs, setLogs] = useState([]);
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchRequests = async (page = 1) => {
            try {
                const response = await fetch(`/requests?page=${page}`)
                if (response.ok) {
                    const data = await response.json()
                    setRideRequests(data.data)
                    setCurrentPage(data.current_page)
                    setLastPage(data.last_page)
                } else {
                    console.error('Failed to fetch ride requests')
                }
            } catch (error) {
                console.error('Error fetching ride requests:', error)
            }
        }

        fetchRequests(currentPage)

        fetch('http://localhost:8000/request/today-count')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched count:', data);
                setCount(data.count);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

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
                console.log(logsData)
            })
            .catch((error) => {
                console.error('Error fetching logs:', error);
            });

        axios.get('/drivers')
            .then((res) => setDrivers(res.data))
            .catch((err) => console.error('Error fetching drivers:', err));


    }, [currentPage])

    const driverStatusCounts = drivers.reduce((acc, driver) => {
        const status = driver.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});
    
    const chartData = [
        { name: 'Available', uv: driverStatusCounts['available'] || 0 },
        { name: 'On Duty', uv: driverStatusCounts['On Duty'] || 0 },
        { name: 'Off Day', uv: driverStatusCounts['Off Day'] || 0 },
    ];
    
    return (
        <DefaultSidebar>
            <Head title='Dashboard' />

            <div id='sumCard' className='py-2'>
                <div className='space-x-2 grid grid-cols-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
                    <div className='bg-white shadow-sm sm:rounded-lg overflow-hidden'>
                        <div className='p-6 text-gray-900'>
                            <div className='text-left'>Total Ride Request Today</div>
                            <div className='flex justify-center items-center mt-2 w-10 h-10 text-gray-900'>{count}</div>
                        </div>
                    </div>

                    <div className='bg-white shadow-sm sm:rounded-lg overflow-hidden'>
                        <div className='p-6 text-gray-900'>
                            <div className='text-left'>Pending Request</div>
                            <div className='flex justify-center items-center mt-2 w-10 h-10 text-gray-900'>5</div>
                        </div>
                    </div>
                    <div className='bg-white shadow-sm sm:rounded-lg overflow-hidden'>
                        <div className='p-6 text-gray-900'>
                            <div className='text-left'>Active Driver</div>
                            <div className='flex justify-center items-center mt-2 w-10 h-10 text-gray-900'>5</div>
                        </div>
                    </div>
                    <div className='bg-white shadow-sm sm:rounded-lg overflow-hidden'>
                        <div className='p-6 text-gray-900'>
                            <div className='text-left'>Available Driver</div>
                            <div className='flex justify-center items-center mt-2 w-10 h-10 text-gray-900'>5</div>
                        </div>
                    </div>
                </div>
            </div>

            <section className='lg:px-8 py-2'>
                <div className='w-screen-xl'>
                    <div className='group block bg-white shadow rounded-lg overflow-hidden'>
                        <div className='p-4'>
                            <ResponsiveContainer width='100%' height={300}>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={chartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray='3 3' />
                                    <XAxis dataKey='name' />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey='uv' fill='#82ca9d' activeBar={<Rectangle fill='gold' stroke='purple' />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='lg:px-8 py-2 max-w-screen-xl'>
                    <ul className='gap-4 grid sm:grid-cols-2 lg:grid-cols-2 mt-8'>
                        <li>
                            <div className='group block bg-white shadow rounded-lg overflow-hidden'>
                                <div className='relative px-4 pt-3 pb-4'>
                                    <h3 className='font-semibold text-gray-700 text-sm'>Request</h3>
                                    <div className='space-y-3 mt-4'>
                                        {rideRequests.map(request => (
                                            <div key={request.id} className='flex justify-between items-center'>
                                                <div>
                                                    <h4 className='font-medium text-gray-700 text-sm'>{request.name}</h4>
                                                    <p className='text-gray-500 text-xs'>Destination: {request.destination} | Time: {new Date(request.time).toLocaleString()}</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <button className='bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white text-sm'>Assign</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className='group block bg-white shadow rounded-lg overflow-hidden'>
                                <div className='relative px-4 pt-3 pb-4'>
                                    <h3 className='font-semibold text-gray-700 text-sm'>Driver</h3>
                                    <div className='space-y-3 mt-4'>
                                        {drivers.map((driver, index) => {
                                            let statusColor = 'bg-gray-400';
                                            if (driver.status === 'available') {
                                                statusColor = 'bg-green-500';
                                            } else if (driver.status === 'On Duty') {
                                                statusColor = 'bg-yellow-500';
                                            } else if (driver.status === 'Off Day') {
                                                statusColor = 'bg-red-500';
                                            }

                                            return (
                                                <div key={index} className='flex justify-between items-center'>
                                                    <div>
                                                        <h4 className='font-medium text-gray-700 text-sm'>{driver.name || 'Unnamed Driver'}</h4>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <div className={`${statusColor} px-3 py-1 rounded text-white text-sm`}>{driver.status}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section className='lg:px-8 py-2'>
                <div className='w-screen-xl'>
                    <div className='group block bg-white shadow rounded-lg overflow-hidden'>
                        <div className='relative px-4 pt-3 pb-4'>
                            <h3 className='font-semibold text-gray-700 text-sm'>Recent Activity</h3>
                            <div className='space-y-3 mt-4'>
                                <div className='flex flex-col space-y-2'>
                                    {logs.map((log, index) => (
                                        <div key={index}>
                                            <p className='font-bold'>{log.name}</p>
                                            <p>{log.action} to {log.destination} from {log.pickup} at {log.time}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className='flex justify-between items-center'>
                                    <div>
                                        <h4 className='font-medium text-gray-700 text-sm'>Jane Smith</h4>
                                        <p className='text-gray-500 text-xs'>Destination: Mall | Time: 11:00 AM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DefaultSidebar>
    )
}
