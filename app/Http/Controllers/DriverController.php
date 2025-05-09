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
        $user = auth()->user();
    
        if (!in_array($user->role, ['driver', 'admin'])) {
            abort(403, 'Unauthorized');
        }
    
        $driver = Driver::where('user_id', $user->id)->first();
    
        $assignedRequest = RideRequest::where('driver_id', $driver->id)
                                      ->whereIn('status', ['assigned', 'accepted'])
                                      ->first();
    
        return Inertia::render('DriverDashboard', [
            'driver' => $driver,
            'assignedRequest' => $assignedRequest
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

public function completeRequest()
{
    $user = auth()->user();
    $driver = Driver::where('user_id', $user->id)->first();

    $request = RideRequest::where('driver_id', $driver->id)
                          ->where('status', 'accepted')
                          ->firstOrFail();

    $request->status = 'done';
    $request->arrived_at = now();
    $request->save();

    return back();
}


}
