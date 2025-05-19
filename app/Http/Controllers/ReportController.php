<?php

namespace App\Http\Controllers;

use App\Models\Request as RideRequest;
use App\Models\Driver;
use App\Models\HistoryLog;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Reports/Index');
    }

    public function getRequests()
    {
        $requests = RideRequest::with(['user', 'driver.user'])->latest()->get();
        return response()->json($requests);
    }

    public function getDrivers()
    {
        $drivers = Driver::with('user')->get();
        return response()->json($drivers);
    }

    public function getLogs()
    {
        $logs = HistoryLog::with('user')->latest()->get();
        return response()->json($logs);
    }
}
