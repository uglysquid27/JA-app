<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Trip;

class TripController extends Controller
{
    // Create and assign trip
    public function store(Request $request)
    {
        $request->validate([
            'vip_name' => 'required|string',
            'pickup_location' => 'required|string',
            'dropoff_location' => 'required|string',
        ]);

        // Find available driver (who has no active trips)
        $driver = User::where('role', 'driver')
            ->whereDoesntHave('trips', function ($query) {
                $query->whereIn('status', ['assigned', 'enroute']);
            })
            ->first();

        if (!$driver) {
            return response()->json(['message' => 'No available driver'], 422);
        }

        // Optional: Assign vehicle
        $vehicle = Vehicle::where('user_id', $driver->id)->first();

        $trip = Trip::create([
            'vip_name' => $request->vip_name,
            'pickup_location' => $request->pickup_location,
            'dropoff_location' => $request->dropoff_location,
            'coordinator_id' => auth(),
            'driver_id' => $driver->id,
            'status' => 'assigned',
        ]);

        // Send notification to driver
        $driver->notify(new \App\Notifications\TripAssignedNotification($trip));

        return response()->json(['trip' => $trip], 201);
    }

    // Reassign a trip to a new driver
    public function reassign(Request $request, Trip $trip)
    {
        $request->validate([
            'new_driver_id' => 'required|exists:users,id',
        ]);

        if ($trip->status !== 'assigned') {
            return response()->json(['message' => 'Cannot reassign after trip started'], 422);
        }

        $newDriver = User::find($request->new_driver_id);

        if ($newDriver->role !== 'driver') {
            return response()->json(['message' => 'User is not a driver'], 422);
        }

        // Optional: check if new driver is available
        $activeTrip = Trip::where('driver_id', $newDriver->id)
            ->whereIn('status', ['assigned', 'enroute'])
            ->first();

        if ($activeTrip) {
            return response()->json(['message' => 'Driver not available'], 422);
        }

        $trip->driver_id = $newDriver->id;
        $trip->save();

        $newDriver->notify(new \App\Notifications\TripAssignedNotification($trip));

        return response()->json(['message' => 'Trip reassigned']);
    }
}

