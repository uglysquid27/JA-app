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
    $drivers = Driver::withAvg('ratings', 'rating')
        ->withCount('ratings') // hitung jumlah rating
        ->get()
        ->map(function ($driver) {
            return [
                'id' => $driver->id,
                'name' => $driver->name,
                'status' => $driver->status,
                'avg_rating' => $driver->ratings_avg_rating ? round($driver->ratings_avg_rating, 1) : 0,
                'rating_count' => $driver->ratings_count, // jumlah rating
            ];
        });

    return response()->json($drivers);
}


    public function getTodayRequestCount()
    {
        $todayCount = RideRequest::whereDate('request_time', Carbon::today())->count();

        return response()->json(['count' => $todayCount]);  
    }
    public function store(Request $request)
{
    // Validasi input
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'pickup' => 'required|string|max:255',
        'destination' => 'required|string|max:255',
        'request_time' => 'required|date',
        'status' => 'nullable|string|max:50',
    ]);

    $validated['status'] = $validated['status'] ?? 'pending';

    try {
        // Simpan ride request
        $rideRequest = RideRequest::create($validated);

        // Ambil nama requester
        $requesterName = $validated['name'];

        // Simpan ke HistoryLog (dengan kolom terpisah, bukan JSON)
        HistoryLog::create([
            'user_id' => auth()->id(),
            'action' => 'ride_request_created',
            'ride_request_id' => $rideRequest->id,
            'requester_name' => $requesterName,
            'driver_name' => null, // Belum ada driver saat request dibuat
            'pickup' => $validated['pickup'],
            'destination' => $validated['destination'],
            'request_time' => $validated['request_time'],
        ]);

        return response()->json(['message' => 'Request saved successfully'], 201);

    } catch (\Exception $e) {
        return response()->json(['message' => 'Gagal menyimpan permintaan'], 500);
    }
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