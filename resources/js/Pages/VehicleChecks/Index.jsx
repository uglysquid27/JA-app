import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import DefaultSidebar from '@/Layouts/sidebarLayout'
import { Head, useForm } from '@inertiajs/react'

export default function Index() {
    const { vehicleChecks } = usePage().props;

    return (
        <DefaultSidebar>
            <Head title="Assign Driver" />
        <div>
            <h1 className="text-xl font-bold mb-4">Cek Kendaraan</h1>
            <Link href="/vehicle-checks/create" className="text-blue-500 underline">Add Check</Link>

            <table className="min-w-full mt-4 border">
                <thead>
                    <tr>
                        <th>Vehicle</th>
                        <th>Request</th>
                        <th>Status</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicleChecks.map((check) => (
                        <tr key={check.id}>
                            <td>{check.vehicle?.plate_number}</td>
                            <td>{check.ride_request?.id}</td>
                            <td>{check.status}</td>
                            <td>{check.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </DefaultSidebar>
    );
}
