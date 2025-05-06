<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Request as RideRequest;

class RequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'pickup' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'time' => 'required|date',
            'status' => 'nullable|string|max:50', // Optional, default to 'pending'
        ]);

        $validated['status'] = $validated['status'] ?? 'pending'; // Default status

        RideRequest::create($validated);

        return response()->json(['message' => 'Request saved successfully'], 201);
    }
}