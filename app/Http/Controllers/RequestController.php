<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Request as RideRequest;
use App\Models\Driver;
use App\Models\HistoryLog;
use Carbon\Carbon;

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
}