import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DefaultSidebar from '@/Layouts/sidebarLayout';

export default function Create({ vehicles, requests, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        vehicle_id: '',
        driver_id: auth.user.id,  // Ensure this is being passed correctly
        request_id: '',
        tire_condition: '',
        oil_check: '',
        light_check: '',
        additional_notes: '',
        checked_at: new Date().toISOString().slice(0, 16), // current datetime
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting data:", data);

        // Ensure the values for enum fields are correct
        const correctedData = {
            ...data,
            tire_condition: data.tire_condition.charAt(0).toUpperCase() + data.tire_condition.slice(1),  // Capitalize first letter
            oil_check: data.oil_check.charAt(0).toUpperCase() + data.oil_check.slice(1),              // Capitalize first letter
            light_check: data.light_check.charAt(0).toUpperCase() + data.light_check.slice(1),          // Capitalize first letter
        };

        post(route('vehicle-checks.store'), {
            data: correctedData,
            onSuccess: () => {
                console.log("✅ Submitted successfully");
            },
            onError: (errors) => {
                console.error("❌ Validation errors:", errors);
            }
        });
    };

    return (
        <DefaultSidebar user={auth.user}>
            <Head title="Create Vehicle Check" />

            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold mb-4">Vehicle Pre-Check Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Vehicle</label>
                        <select
                            value={data.vehicle_id}
                            onChange={(e) => setData('vehicle_id', e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select a vehicle</option>
                            {vehicles.map((v) => (
                                <option key={v.id} value={v.id}>
                                    {v.plate_number} - {v.brand} {v.model}
                                </option>
                            ))}
                        </select>
                        {errors.vehicle_id && <p className="text-red-600 text-sm">{errors.vehicle_id}</p>}
                    </div>

                    <div>
                        <label>Request</label>
                        <select
                            value={data.request_id}
                            onChange={(e) => setData('request_id', e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select a ride request</option>
                            {requests.map((r) => (
                                <option key={r.id} value={r.id}>
                                    Request #{r.id}
                                </option>
                            ))}
                        </select>
                        {errors.request_id && <p className="text-red-600 text-sm">{errors.request_id}</p>}
                    </div>

                    <div>
                        <label>Tire Condition</label>
                        <select
                            value={data.tire_condition}
                            onChange={(e) => setData('tire_condition', e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select tire condition</option>
                            <option value="Good">Good</option>
                            <option value="Flat">Flat</option>
                            <option value="Worn">Worn</option>
                        </select>
                        {errors.tire_condition && <p className="text-red-600 text-sm">{errors.tire_condition}</p>}
                    </div>

                    <div>
                        <label>Oil Check</label>
                        <select
                            value={data.oil_check}
                            onChange={(e) => setData('oil_check', e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select oil check status</option>
                            <option value="OK">OK</option>
                            <option value="Needs Refill">Needs Refill</option>
                        </select>
                        {errors.oil_check && <p className="text-red-600 text-sm">{errors.oil_check}</p>}
                    </div>

                    <div>
                        <label>Light Check</label>
                        <select
                            value={data.light_check}
                            onChange={(e) => setData('light_check', e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select light check status</option>
                            <option value="Working">Working</option>
                            <option value="Broken">Broken</option>
                        </select>
                        {errors.light_check && <p className="text-red-600 text-sm">{errors.light_check}</p>}
                    </div>

                    <div>
                        <label>Additional Notes</label>
                        <textarea
                            value={data.additional_notes}
                            onChange={(e) => setData('additional_notes', e.target.value)}
                            className="w-full p-2 border rounded"
                        ></textarea>
                        {errors.additional_notes && <p className="text-red-600 text-sm">{errors.additional_notes}</p>}
                    </div>

                    <div>
                        <label>Checked At</label>
                        <input
                            type="datetime-local"
                            value={data.checked_at}
                            onChange={(e) => setData('checked_at', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.checked_at && <p className="text-red-600 text-sm">{errors.checked_at}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Submit Check
                        </button>
                    </div>
                </form>
            </div>
        </DefaultSidebar>
    );
}
