import { Head, useForm } from '@inertiajs/react';
import DefaultSidebar from '@/Layouts/sidebarLayout';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

// Timer component to show running time
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

    return <p><strong>Time Running:</strong> {elapsed}</p>;
}

export default function DriverDashboard({ driver, assignedRequest }) {
    const [loading, setLoading] = useState(false);
    const { setData, post, processing, errors, reset } = useForm({
        status: driver.status || '',
    });

    const toggleStatus = () => {
        const newStatus = driver.status === 'available' ? 'off duty' : 'available';

        setLoading(true);

        Inertia.post(route('driver.status'), { status: newStatus }, {
            onSuccess: () => {
                Inertia.reload({ only: ['driver'] });
            },
            onFinish: () => setLoading(false),
            onError: (error) => console.error("Status update failed", error),
        });
    };

    const handleAcceptRequest = () => {
        post('/driver/accept-request', {}, {
            onSuccess: () => {
                Inertia.reload({ only: ['assignedRequest'] }); // Refresh the ride card
            },
            onError: (error) => console.error(error),
        });
    };

    const handleRideDone = () => {
        post('/driver/complete-request', {}, {
            onSuccess: () => {
                Inertia.reload({ only: ['assignedRequest'] }); // Refresh the ride card
            },
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
                        className={`px-4 py-2 rounded font-semibold text-white transition ${driver.status === 'available'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                            } ${loading && 'opacity-50 cursor-not-allowed'}`}
                    >
                        {loading ? 'Updating...' : (driver.status === 'available' ? 'Set Off Duty' : 'Set On Duty')}
                    </button>
                </div>

                {/* Show validation errors */}
                {errors.status && <div className="text-red-500 mb-2">{errors.status}</div>}

                {/* Assigned Request Card */}
                {assignedRequest && (
                    <div className="bg-yellow-100 p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Ride Request</h2>
                        <p><strong>Pickup:</strong> {assignedRequest.pickup}</p>
                        <p><strong>Destination:</strong> {assignedRequest.destination}</p>
                        <p><strong>Time:</strong> {new Date(assignedRequest.time).toLocaleString()}</p>

                        {/* Pending - show Accept button */}
                        {assignedRequest.status === 'assigned' && (
                            <button
                                onClick={handleAcceptRequest}
                                disabled={processing}
                                className={`mt-3 px-4 py-2 text-white rounded ${processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {processing ? 'Accepting...' : 'Accept Request'}
                            </button>
                        )}

                        {/* Accepted - show status, accepted time, timer, and done button */}
                        {/* Accepted - show status, accepted time, timer, and done button */}
                        {assignedRequest.status === 'accepted' && (
                            <div className="mt-4 border-t pt-3 space-y-2 text-sm text-gray-800">
                                <p className="text-green-700 font-semibold">Status: Accepted</p>
                                <p><strong>Accepted At:</strong> {new Date(assignedRequest.accepted_at).toLocaleString()}</p>
                                <RunningTime startTime={assignedRequest.accepted_at} />
                                <button
                                    onClick={handleRideDone}
                                    disabled={processing}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
                                >
                                    {processing ? 'Marking...' : 'Mark as Arrived'}
                                </button>
                            </div>
                        )}

                        {/* Done - show arrived time */}
                        {assignedRequest.status === 'done' && (
                            <div className="mt-4 border-t pt-3 space-y-2 text-sm text-gray-800">
                                <p className="text-purple-700 font-semibold">Status: Arrived</p>
                                <p><strong>Accepted At:</strong> {new Date(assignedRequest.accepted_at).toLocaleString()}</p>
                                <p><strong>Arrived At:</strong> {new Date(assignedRequest.arrived_at).toLocaleString()}</p>
                                <RunningTime startTime={assignedRequest.accepted_at} />
                            </div>
                        )}


                    </div>
                )}
            </div>
        </DefaultSidebar>
    );
}
