<?php

namespace App\Http\Controllers;

use App\Models\Request;
use App\Models\Driver;
use App\Models\HistoryLog;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $requests = Request::with(['user', 'driver'])->latest()->get();
        $drivers = Driver::with('user')->get();
        $logs = HistoryLog::with('user')->latest()->get();

        return Inertia::render('Reports/Index', [
            'requests' => $requests,
            'drivers' => $drivers,
            'logs' => $logs,
        ]);
    }
}
