<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HistoryLog;

class HistoryLogController extends Controller
{

public function index()
{
    return response()->json(HistoryLog::latest()->get());
}

}
