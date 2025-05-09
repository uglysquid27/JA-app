import { Head, useForm } from '@inertiajs/react'
import DefaultSidebar from '@/Layouts/sidebarLayout'
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function DriverDashboard({ driver, assignedRequest }) {
    const [loading, setLoading] = useState(false);
    const { setData, post, processing, errors, reset } = useForm({
        status: driver.status || '',
    });

    const toggleStatus = () => {
        const newStatus = driver.status === 'on duty' ? 'off duty' : 'on duty';

        setLoading(true);

        Inertia.post(route('driver.status'), { status: newStatus }, {
            onSuccess: () => {
                Inertia.reload({ only: ['driver'] }); // Reload just the driver data
            },
            onFinish: () => setLoading(false),
            onError: (error) => console.error("Status update failed", error),
        });
    };

    const handleAcceptRequest = () => {
        post('/driver/accept-request', {}, {
            onSuccess: () => reset(),
            onError: (error) => console.error(error),
        });
    };

    return (
        <DefaultSidebar>
            <Head title="Driver Dashboard" />
            <div className="max-w-xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Welcome, {driver.name}</h1>
                <p className="mb-2">Current Status: <strong>{driver.status}</strong></p>

                {/* Toggle Status Button */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={toggleStatus}
                        disabled={loading}
                        className={`px-4 py-2 rounded font-semibold text-white transition ${driver.status === 'on duty'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        } ${loading && 'opacity-50 cursor-not-allowed'}`}
                    >
                        {loading ? 'Updating...' : (driver.status === 'on duty' ? 'Set Off Duty' : 'Set On Duty')}
                    </button>
                </div>

                {/* Show validation errors */}
                {errors.status && <div className="text-red-500 mb-2">{errors.status}</div>}

                {/* Assigned Request */}
                {assignedRequest && (
                    <div className="bg-yellow-100 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">You have a new ride request:</h2>
                        <p><strong>Pickup:</strong> {assignedRequest.pickup}</p>
                        <p><strong>Destination:</strong> {assignedRequest.destination}</p>
                        <p><strong>Time:</strong> {new Date(assignedRequest.time).toLocaleString()}</p>

                        <button
                            onClick={handleAcceptRequest}
                            disabled={processing}
                            className={`mt-3 px-4 py-2 text-white rounded ${processing ? 'bg-gray-400' : 'bg-blue-600'}`}
                        >
                            {processing ? 'Accepting...' : 'Accept Request'}
                        </button>
                    </div>
                )}
            </div>
        </DefaultSidebar>
    )
}
