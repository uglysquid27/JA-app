import { Head, useForm } from '@inertiajs/react'
import DefaultSidebar from '@/Layouts/sidebarLayout'
import { useState } from 'react'

export default function AssignRequest({ request, drivers }) {
    const { data, setData, post, processing } = useForm({
        request_id: request.id,
        driver_id: ''
    })

    const [successMessage, setSuccessMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/assign-driver', {
            onSuccess: () => {
                setSuccessMessage('Driver assigned successfully.')
            },
            onError: () => {
                setSuccessMessage('')
            }
        })
    }

    return (
        <DefaultSidebar>
            <Head title="Assign Driver" />
            <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
                <h1 className="text-xl font-bold mb-4">Assign Driver to Request</h1>

                {successMessage && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-800">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Read-only fields */}
                    <div>
                        <label className="block text-sm font-medium">Requester Name</label>
                        <input
                            type="text"
                            value={request.name}
                            disabled
                            className="w-full border rounded p-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Destination</label>
                        <input
                            type="text"
                            value={request.destination}
                            disabled
                            className="w-full border rounded p-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Pickup</label>
                        <input
                            type="text"
                            value={request.pickup}
                            disabled
                            className="w-full border rounded p-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Time</label>
                        <input
                            type="text"
                            value={new Date(request.time).toLocaleString()}
                            disabled
                            className="w-full border rounded p-2 bg-gray-100"
                        />
                    </div>

                    {/* Driver selection */}
                    <div>
                        <label className="block text-sm font-medium">Assign Driver</label>
                        <select
                            value={data.driver_id}
                            onChange={e => setData('driver_id', e.target.value)}
                            className="w-full border rounded p-2"
                            required
                        >
                            <option value="">Select a driver</option>
                            {drivers
                                .filter(driver => driver.status === 'available')
                                .map(driver => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.name} ({driver.status})
                                    </option>
                                ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Assigning...' : 'Assign Driver'}
                    </button>
                </form>
            </div>
        </DefaultSidebar>
    )
}
