import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import DefaultSidebar from '@/Layouts/sidebarLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    const { vehicleChecks } = usePage().props;

    return (
        <DefaultSidebar>
            <Head title="Vehicle Checks" />
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-4">
                <h1 className="text-xl font-bold mb-4">Cek Kendaraan</h1>
                <Link href="/vehicle-checks/create" className="text-blue-500 underline mb-4 inline-block">
                    Add Check
                </Link>

                {/* Wrap the table with a scrollable container */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto mt-4 border-collapse">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Vehicle</th>
                                <th className="px-4 py-2 border-b">Driver</th>
                                <th className="px-4 py-2 border-b">Request</th>
                                <th className="px-4 py-2 border-b">Tire Condition</th>
                                <th className="px-4 py-2 border-b">Oil Check</th>
                                <th className="px-4 py-2 border-b">Light Check</th>
                                <th className="px-4 py-2 border-b">Notes</th>
                                <th className="px-4 py-2 border-b">Checked At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicleChecks.length > 0 ? (
                                vehicleChecks.map((check) => (
                                    <tr key={check.id}>
                                        <td className="px-4 py-2 border-b">{check.vehicle?.plate_number}</td>
                                        <td className="px-4 py-2 border-b">{check.driver?.name}</td>
                                        <td className="px-4 py-2 border-b">{check.rideRequest?.id}</td>
                                        <td className="px-4 py-2 border-b">{check.tire_condition}</td>
                                        <td className="px-4 py-2 border-b">{check.oil_check}</td>
                                        <td className="px-4 py-2 border-b">{check.light_check}</td>
                                        <td className="px-4 py-2 border-b">{check.additional_notes}</td>
                                        <td className="px-4 py-2 border-b">{check.checked_at}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">No vehicle checks found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultSidebar>
    );
}
