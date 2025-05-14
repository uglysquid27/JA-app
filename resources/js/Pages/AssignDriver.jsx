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
        e.preventDefault();
        console.log(data); // 👀 log to inspect
        post('/assign-driver', {
            onSuccess: () => {
                setSuccessMessage('Driver berhasil ditugaskan.');
            },
            onError: () => {
                setSuccessMessage('');
            },
        });
    };
    

    return (
        <DefaultSidebar>
            <Head title="Tugaskan Driver" />
            <div className="max-w-4xl mx-auto p-6 mt-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">🚗 Tugaskan Driver</h1>

                <div className="bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-100">
                    {successMessage && (
                        <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded">
                            ✅ {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Detail permintaan */}
                        <div className="col-span-2">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">📝 Detail Permintaan</h2>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Nama Pemesan</label>
                            <input
                                type="text"
                                value={request.name}
                                disabled
                                className="w-full border rounded-lg p-2 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Tujuan</label>
                            <input
                                type="text"
                                value={request.destination}
                                disabled
                                className="w-full border rounded-lg p-2 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Penjemputan</label>
                            <input
                                type="text"
                                value={request.pickup}
                                disabled
                                className="w-full border rounded-lg p-2 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">Waktu</label>
                            <input
                                type="text"
                                value={new Date(request.time).toLocaleString('id-ID')}
                                disabled
                                className="w-full border rounded-lg p-2 bg-gray-100"
                            />
                        </div>

                        {/* Pilih driver */}
                        <div className="col-span-2 mt-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">👤 Pilih Driver Tersedia</h2>
                            <select
                                value={data.driver_id}
                                onChange={e => setData('driver_id', e.target.value)}
                                className="w-full border rounded-lg p-2"
                                required
                            >
                                <option value="">Pilih driver</option>
                                {drivers
                                    .filter(driver => driver.status === 'available')
                                    .map(driver => (
                                        <option key={driver.id} value={driver.id}>
                                            {driver.name} ({driver.status})
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Tombol submit */}
                        <div className="col-span-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 transition"
                            >
                                {processing ? 'Menugaskan...' : 'Tugaskan Driver'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultSidebar>
    )
}
