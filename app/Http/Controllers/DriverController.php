<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Driver;
use App\Models\Rating;
use App\Models\Request as RideRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DriverController extends Controller
{
    // Method to show the dashboard for the driver
    public function dashboard()
    {
        $driver = Driver::where('user_id', Auth::id())->first();
    
        $assignedRequest = RideRequest::where('driver_id', $driver->id)
                                      ->whereIn('status', ['assigned', 'accepted']) 
                                      ->first();
    
        return Inertia::render('DriverDashboard', [
            'driver' => $driver,
            'assignedRequest' => $assignedRequest,
        ]);
    }

    // Method to update the driver's status
    public function updateStatus(Request $request)
    {
        $request->validate([
            'status' => 'required|string',
        ]);

        $driver = Driver::where('user_id', Auth::id())->first();

        if (!$driver) {
            return back()->withErrors(['message' => 'Driver not found']);
        }

        // Update the driver’s status
        $driver->status = $request->input('status');
        $driver->save();

        return back()->with('success', 'Status updated successfully.');
    }
    
    // Method to accept the ride request
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

            // Update the driver's status to "on duty"
            $driver->status = 'On Duty';
            $driver->save();
            
            return back()->with('message', 'Request accepted.');
        }

        return back()->withErrors(['request' => 'No assigned request found.']);
    }

    // Method to mark the ride as done
    public function completeRequest(Request $request)
    {
        $user = Driver::where('user_id', Auth::id())->first();
        $assignedRequest = RideRequest::where('driver_id', $user->id)
            ->where('status', 'accepted')
            ->first();
    
        if ($assignedRequest) {
            // Mark as done
            $assignedRequest->status = 'done';
            $assignedRequest->arrived_at = now();
            $assignedRequest->save();
    
            // Set driver status back to available
            $user->status = 'available';
            $user->save();
    
            // Create an initial rating record (can be updated later by user)
            Rating::create([
                'request_id' => $assignedRequest->id,
                'driver_id' => $user->id,
                'rating' => 0, // or null if you want to allow initial blank
                'comment' => null,
            ]);
    
            return redirect()->back()->with('success', 'Ride marked as done and rating initialized.');
        }
    
        return redirect()->back()->withErrors(['request' => 'No accepted request found.']);
    }
}
