<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Driver;
use App\Models\Request as RideRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DriverController extends Controller
{
    public function dashboard()
    {
        $driver = Driver::where('user_id', Auth::id())->first();
    
        $assignedRequest = RideRequest::where('driver_id', $driver->id)
                                      ->whereIn('status', ['assigned', 'accepted']) // <== THIS IS GOOD
                                      ->first();
    
        return Inertia::render('DriverDashboard', [
            'driver' => $driver,
            'assignedRequest' => $assignedRequest,
        ]);
    }

public function updateStatus(Request $request)
{
    $driver = Driver::where('user_id', Auth::id())->first();

    if (!$driver) {
        return back()->withErrors(['message' => 'Driver not found']);
    }

    $driver->status = $request->input('status');
    $driver->save();

    return back()->with('success', 'Status updated successfully.');
}
    
public function acceptRequest(Request $request)
{
    $driver = Driver::where('user_id', Auth::id())->first();

    $rideRequest = RideRequest::where('driver_id', $driver->id)
                              ->where('status', 'assigned')
                              ->first();

    if ($rideRequest) {
        $rideRequest->status = 'accepted';
        $rideRequest->accepted_at = now(); // Set accepted_at timestamp
        $rideRequest->save();

        $driver->status = 'on duty';
        $driver->save();
    }

    return back()->with('message', 'Request accepted.');
}

public function completeRequest(Request $request)
{
    $user = auth()->user();
    $assignedRequest = RideRequest::where('driver_id', $user->id)
        ->where('status', 'accepted')
        ->first();

    if ($assignedRequest) {
        $assignedRequest->status = 'done';
        $assignedRequest->arrived_at = now();
        $assignedRequest->save();

        return redirect()->back()->with('success', 'Ride marked as done.');
    }

    return redirect()->back()->withErrors(['request' => 'No accepted request found.']);
}


}
