<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RequestController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use App\Http\Controllers\HistoryLogController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', function () {
    if (auth()->check() && auth()->user()->role == 'general_affair') {
        return Inertia::render('Dashboard');
    }
    return redirect(to:'/');
})->name(name: 'Dashboard');

Route::get('/book', function () {
    if (auth()->check() && auth()->user()->role == 'general_affair') {
        return Inertia::render('Book');
    }
    return redirect('/');
})->name('book'); // ✅ Make sure this is present

Route::get('/history-logs', [HistoryLogController::class, 'index']);


Route::get('/drivers', [RequestController::class, 'driver']);
Route::get('/requests', [RequestController::class, 'index']);
Route::post('/api/requests', [RequestController::class, 'store']);
Route::get('/request/today-count', [RequestController::class, 'getTodayRequestCount']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::get('/find-place', [LocationController::class, 'findPlace']);

require __DIR__.'/auth.php';