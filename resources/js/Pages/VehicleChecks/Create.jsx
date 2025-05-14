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
    
        <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-2">📝 Vehicle Pre-Check Form</h1>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                {/* Vehicle Selection */}
                <div>
                    <label className="font-medium text-gray-700 dark:text-gray-100">Vehicle</label>
                    <select
                        value={data.vehicle_id}
                        onChange={(e) => setData('vehicle_id', e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Select a vehicle --</option>
                        {vehicles.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.plate_number} - {v.brand} {v.model}
                            </option>
                        ))}
                    </select>
                    {errors.vehicle_id && <p className="text-red-600 text-sm mt-1">{errors.vehicle_id}</p>}
                </div>
    
                {/* Ride Request Selection */}
                <div>
                    <label className="font-medium text-gray-700 dark:text-gray-100">Ride Request</label>
                    <select
                        value={data.request_id}
                        onChange={(e) => setData('request_id', e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Select a ride request --</option>
                        {requests.map((r) => (
                            <option key={r.id} value={r.id}>
                                Request #{r.id} - {r.driver?.name} → {r.requester?.name}
                            </option>
                        ))}
                    </select>
                    {errors.request_id && <p className="text-red-600 text-sm mt-1">{errors.request_id}</p>}
                </div>
    
                {/* Tire Condition */}
                <div>
                    <label className="font-medium text-gray-700 dark:text-gray-100">Tire Condition</label>
                    <select
                        value={data.tire_condition}
                        onChange={(e) => setData('tire_condition', e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Select condition --</option>
                        <option value="Good">Good</option>
                        <option value="Flat">Flat</option>
                        <option value="Worn">Worn</option>
                    </select>
                    {errors.tire_condition && <p className="text-red-600 text-sm mt-1">{errors.tire_condition}</p>}
                </div>
    
                {/* Oil Check */}
                <div>
                    <label className="font-medium text-gray-700 dark:text-gray-100">Oil Check</label>
                    <select
                        value={data.oil_check}
                        onChange={(e) => setData('oil_check', e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Select oil status --</option>
                        <option value="OK">OK</option>
                        <option value="Needs Refill">Needs Refill</option>
                    </select>
                    {errors.oil_check && <p className="text-red-600 text-sm mt-1">{errors.oil_check}</p>}
                </div>
    
                {/* Light Check */}
                <div>
                    <label className="font-medium text-gray-700 dark:text-gray-100">Light Check</label>
                    <select
                        value={data.light_check}
                        onChange={(e) => setData('light_check', e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Select light status --</option>
                        <option value="Working">Working</option>
                        <option value="Broken">Broken</option>
                    </select>
                    {errors.light_check && <p className="text-red-600 text-sm mt-1">{errors.light_check}</p>}
                </div>
    
                {/* Additional Notes */}
                <div>
                    <label className="font-medium text-gray-700 dark:text-gray-100">Additional Notes</label>
                    <textarea
                        rows={3}
                        value={data.additional_notes}
                        onChange={(e) => setData('additional_notes', e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Tire needs replacement soon..."
                    />
                    {errors.additional_notes && <p className="text-red-600 text-sm mt-1">{errors.additional_notes}</p>}
                </div>
    
                {/* Checked At */}
                <div>
                    <label className="font-medium text-gray-700 dark:text-gray-100">Checked At</label>
                    <input
                        type="datetime-local"
                        value={data.checked_at}
                        onChange={(e) => setData('checked_at', e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.checked_at && <p className="text-red-600 text-sm mt-1">{errors.checked_at}</p>}
                </div>
    
                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-60"
                    >
                        {processing ? 'Submitting...' : 'Submit Vehicle Check'}
                    </button>
                </div>
            </form>
        </div>
    </DefaultSidebar>
    
    );
}
