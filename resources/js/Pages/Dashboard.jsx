import DefaultSidebar from '@/Layouts/sidebarLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function Dashboard() {
    const data = [
        { name: 'Free', uv: 3 },
        { name: 'On Way', uv: 2 },
        { name: 'Done', uv: 4 },
    ];

    return (
        <DefaultSidebar
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div id='sumCard' className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-4 space-x-2">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="text-left">Total Ride Request Today</div>
                            <div className="mt-2 h-10 w-10 flex items-center justify-center text-gray-900">
                                5
                            </div>
                        </div>
                    </div>


                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="text-left">Pending Request</div>
                            <div className="mt-2 h-10 w-10 flex items-center justify-center text-gray-900">
                                5
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="text-left">Active Driver</div>
                            <div className="mt-2 h-10 w-10 flex items-center justify-center text-gray-900">
                                5
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="text-left">Available Driver</div>
                            <div className="mt-2 h-10 w-10 flex items-center justify-center text-gray-900">
                                5
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className='lg:px-8 py-2'>
                <div className='w-screen-xl'>
                    <div className="group block overflow-hidden bg-white shadow rounded-lg">
                      <div className='p-4'>
                      <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                            </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="max-w-screen-xl py-2 lg:px-8">


                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">

                        <li>
                            <div className="group block overflow-hidden bg-white shadow rounded-lg">
                                {/* Container for the content */}
                                <div className="relative pt-3 px-4 pb-4">
                                    <h3 className="text-sm font-semibold text-gray-700">Ride Requests</h3>

                                    {/* List of requests */}
                                    <div className="mt-4 space-y-3">
                                        {/* Single request */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">John Doe</h4>
                                                <p className="text-xs text-gray-500">Destination: Airport | Time: 10:30 AM</p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                    Assign
                                                </button>
                                                <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>

                                        {/* Single request */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">Jane Smith</h4>
                                                <p className="text-xs text-gray-500">Destination: Mall | Time: 11:00 AM</p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                    Assign
                                                </button>
                                                <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>

                                        {/* Single request */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">Jane Smith</h4>
                                                <p className="text-xs text-gray-500">Destination: Mall | Time: 11:00 AM</p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                    Assign
                                                </button>
                                                <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                        {/* Single request */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">Jane Smith</h4>
                                                <p className="text-xs text-gray-500">Destination: Mall | Time: 11:00 AM</p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                    Assign
                                                </button>
                                                <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                        {/* Single request */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">Jane Smith</h4>
                                                <p className="text-xs text-gray-500">Destination: Mall | Time: 11:00 AM</p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                    Assign
                                                </button>
                                                <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>

                                        {/* More requests */}
                                        {/* You can add more lists for other requests here */}
                                    </div>
                                </div>
                            </div>
                        </li>



                        <li>
                            <div className="group block overflow-hidden bg-white shadow rounded-lg">
                                {/* Container for the content */}
                                <div className="relative pt-3 px-4 pb-4">
                                    <h3 className="text-sm font-semibold text-gray-700">Available Driver</h3>

                                    {/* List of requests */}
                                    <div className="mt-4 space-y-3">
                                        {/* Single request */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">John Doe</h4>
                                                <p className="text-xs text-gray-500">Destination: Airport | Time: 10:30 AM</p>
                                            </div>

                                            {/* <div className="flex gap-2">
                                                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                    Assign
                                                </button>
                                                <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                            </div> */}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">John Doe</h4>
                                                <p className="text-xs text-gray-500">Destination: Airport | Time: 10:30 AM</p>
                                            </div>

                                            {/* <div className="flex gap-2">
                                                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                    Assign
                                                </button>
                                                <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                            </div> */}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">John Doe</h4>
                                                <p className="text-xs text-gray-500">Destination: Airport | Time: 10:30 AM</p>
                                            </div>

                                            {/* <div className="flex gap-2">
                                                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                    Assign
                                                </button>
                                                <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                            </div> */}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">John Doe</h4>
                                                <p className="text-xs text-gray-500">Destination: Airport | Time: 10:30 AM</p>
                                            </div>

                                            {/* <div className="flex gap-2">
                                                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                    Assign
                                                </button>
                                                <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                            </div> */}
                                        </div>

                                        {/* Single request */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700">Jane Smith</h4>
                                                <p className="text-xs text-gray-500">Destination: Mall | Time: 11:00 AM</p>
                                            </div>

                                            {/* <div className="flex gap-2">
                                                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600">
                                                    Assign
                                                </button>
                                                <button className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                    Edit
                                                </button>
                                            </div> */}
                                        </div>

                                        {/* More requests */}
                                        {/* You can add more lists for other requests here */}
                                    </div>
                                </div>
                            </div>
                        </li>


                    </ul>
                </div>
            </section>

            <section className='lg:px-8 py-2'>
                <div className='w-screen-xl'>
                    <div className="group block overflow-hidden bg-white shadow rounded-lg">
                        {/* Container for the content */}
                        <div className="relative pt-3 px-4 pb-4">
                            <h3 className="text-sm font-semibold text-gray-700">Recent Activity</h3>

                            {/* List of requests */}
                            <div className="mt-4 space-y-3">
                                {/* Single request */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700">John Doe</h4>
                                        <p className="text-xs text-gray-500">Destination: Airport | Time: 10:30 AM</p>
                                    </div>


                                </div>

                                {/* Single request */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-700">Jane Smith</h4>
                                        <p className="text-xs text-gray-500">Destination: Mall | Time: 11:00 AM</p>
                                    </div>


                                </div>

                                {/* More requests */}
                                {/* You can add more lists for other requests here */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DefaultSidebar>
    );
}
