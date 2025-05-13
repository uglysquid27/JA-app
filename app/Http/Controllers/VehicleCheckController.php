<?php

namespace App\Http\Controllers;

use App\Models\VehicleCheck;
use App\Models\Vehicle;
use App\Models\Request as RideRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleCheckController extends Controller
{
    public function index()
    {
        return Inertia::render('VehicleChecks/Index', [
            'vehicleChecks' => VehicleCheck::with(['vehicle', 'request'])->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('VehicleChecks/Create', [
            'vehicles' => Vehicle::all(),
            'requests' => RideRequest::all()
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'request_id' => 'required|exists:requests,id',
            'tire_condition' => 'required|in:Good,Flat,Worn',
            'oil_check' => 'required|in:OK,Needs Refill',
            'light_check' => 'required|in:Working,Broken',
            'additional_notes' => 'nullable|string',
            'checked_at' => 'required|date',
        ]);
    
        VehicleCheck::create($validatedData);
    
        return redirect()->route('vehicle-checks.index')->with('success', 'Check recorded.');
    }
    
    
}
