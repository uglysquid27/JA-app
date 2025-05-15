<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function create($requestId)
    {
        // Ambil ride request & driver
        $rideRequest = \App\Models\Request::findOrFail($requestId);
        $driver = $rideRequest->driver;
    
        // Cari rating jika sudah ada
        $rating = Rating::where('request_id', $rideRequest->id)->first();
    
        return inertia('Rating/index', [
            'ratingData' => $rating,
            'requestId' => $rideRequest->id,
            'driverId' => $driver->id,
        ]);
    }
    

    public function update(Request $request, Rating $rating)
{
    $validated = $request->validate([
        'rating' => 'required|numeric|min:0.25|max:5',
        'comment' => 'nullable|string',
    ]);

    $rating->update($validated);

    return redirect()->route('dashboard')->with('success', 'Rating berhasil diperbarui.');
}


    public function store(Request $request)
    {
        $validated = $request->validate([
            'request_id' => 'required|exists:requests,id',
            'driver_id' => 'required|exists:driver,id',
            'rating' => 'required|numeric|min:0.25|max:5',
            'comment' => 'nullable|string',
        ]);

        $exists = Rating::where('request_id', $validated['request_id'])->exists();
        if ($exists) {
            return back()->withErrors(['msg' => 'Rating sudah dibuat untuk request ini.']);
        }

        Rating::create($validated);

        return redirect()->route('dashboard')->with('success', 'Rating berhasil disimpan.');
    }
}
