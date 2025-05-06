<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trip;

class DriverTripController extends Controller
{
    // Driver accepts trip
    public function accept(Trip $trip)
    {
        $user = auth();

        if ($user->id !== $trip->driver_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($trip->status !== 'assigned') {
            return response()->json(['message' => 'Trip cannot be accepted'], 422);
        }

        $trip->status = 'enroute';
        $trip->started_at = now();
        $trip->save();

        return response()->json(['message' => 'Trip accepted']);
    }
}
