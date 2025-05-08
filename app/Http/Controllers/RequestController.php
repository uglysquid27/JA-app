<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Request as RideRequest;
use App\Models\Driver;
use App\Models\HistoryLog;
use Carbon\Carbon;
use Inertia\Inertia;

class RequestController extends Controller
{
    public function index()
    {
        $requests = RideRequest::paginate(5); // Paginate with 5 items per page
        return response()->json($requests);
    }

    public function driver()
    {
        // Get all drivers with name and status only
        $drivers = Driver::select('name', 'status')->get();

        return response()->json($drivers);
    }

    public function getTodayRequestCount()
    {
        $todayCount = RideRequest::whereDate('time', Carbon::today())->count();

        return response()->json(['count' => $todayCount]);  
    }
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'pickup' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'time' => 'required|date',
            'status' => 'nullable|string|max:50', // Optional, default to 'pending'
        ]);

        // Set default status if not provided
        $validated['status'] = $validated['status'] ?? 'pending'; // Default status

        // Create the ride request
        $rideRequest = RideRequest::create($validated);

        // Create a readable log message
        $logMessage = "{$validated['name']} needs to go to {$validated['destination']} and picked up from {$validated['pickup']} at {$validated['time']}.";

        // Log the history of this action
        HistoryLog::create([
            'user_id' => auth()->id(),  // Assuming you are using Laravel's built-in authentication
            'action' => 'ride_request_created',
            'data' => json_encode([
                'ride_request_id' => $rideRequest->id,
                'log_message' => $logMessage
            ])
        ]);

        return response()->json(['message' => 'Request saved successfully'], 201);
    }
    public function assignForm($id)
{
    $request = RideRequest::findOrFail($id);
    $drivers = Driver::all(); // Or use ->where('status', 'available') if needed

    return Inertia::render('AssignDriver', [
        'request' => $request,
        'drivers' => $drivers,
    ]);
}

public function assignDriver(Request $request)
{
    $request->validate([
        'request_id' => 'required|exists:requests,id',
        'driver_id' => 'required|exists:driver,id',
    ]);

    // Find the ride request and update it
    $requestModel = RideRequest::findOrFail($request->request_id);
    $requestModel->driver_id = $request->driver_id;
    $requestModel->assigned_at = Carbon::now();
    $requestModel->status = 'assigned';
    $requestModel->save();

    // Find the driver and change their status to 'on duty'
    $driver = Driver::findOrFail($request->driver_id);
    $driver->status = 'On Duty';  // Change driver's status
    $driver->save();

    return redirect()->back()->with('success', 'Driver assigned successfully and status updated.');
}


    
}