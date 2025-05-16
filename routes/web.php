<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\HistoryLogController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


Route::get('/test', function () {
    return Inertia::render('Test');
});

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
})->name('book'); 

Route::get('/history-logs', [HistoryLogController::class, 'index']);
Route::get('/assign/{id}', [RequestController::class, 'assignForm'])->name('assign.form');
Route::post('/assign-driver', [RequestController::class, 'assignDriver'])->name('assign.driver');


Route::get('/drivers', [RequestController::class, 'driver']);
Route::get('/requests', [RequestController::class, 'index']);
Route::post('/api/requests', [RequestController::class, 'store']);
Route::get('/request/today-count', [RequestController::class, 'getTodayRequestCount']);

Route::resource('vehicle-checks', \App\Http\Controllers\VehicleCheckController::class);

Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth'])->group(function () {
    Route::get('/driver/dashboard', [DriverController::class, 'dashboard'])->name('driver.dashboard');
    Route::post('/driver/status', [DriverController::class, 'updateStatus'])->name('driver.status');
    Route::post('/driver/accept-request', [DriverController::class, 'acceptRequest'])->name('driver.acceptRequest');
    Route::post('/driver/complete-request', [DriverController::class, 'completeRequest'])->name('driver.complete');

});

// Menampilkan halaman form rating
Route::get('/rating/{request}', [RatingController::class, 'create'])->name('rating.create');

// Menyimpan rating setelah submit
Route::put('/rating/{rating}', [RatingController::class, 'update'])->name('rating.update');


// Route::middleware(['auth'])->group(function () {
//     // Dashboard route, accessible to both admin and driver
//     Route::get('/driver/dashboard', function () {
//         if (in_array(Auth::user()->role, ['driver', 'admin'])) {
//             return Inertia::render('DriverDashboard', [
//                 'driver' => Auth::user(),
//             ]);
//         }
//         return redirect('/');
//     })->name('driver.dashboard');

//     // Update driver status route, accessible to both admin and driver
//     Route::put('/driver/status', function (Request $request) {
//         if (in_array(Auth::user()->role, ['driver', 'admin'])) {
//             return app(DriverController::class)->updateStatus($request);
//         }
//         abort(403);
//     })->name('driver.status');

//     // Accept request route, accessible to both admin and driver
//     Route::post('/driver/accept-request', function (Request $request) {
//         if (in_array(Auth::user()->role, ['driver', 'admin'])) {
//             return app(DriverController::class)->acceptRequest($request);
//         }
//         abort(403);
//     })->name('driver.acceptRequest');

//     // Complete request route, accessible to both admin and driver
//     Route::post('/driver/complete-request', function (Request $request) {
//         if (in_array(Auth::user()->role, ['driver', 'admin'])) {
//             return app(DriverController::class)->completeRequest($request);
//         }
//         abort(403);
//     })->name('driver.complete');
// });



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::get('/find-place', [LocationController::class, 'findPlace']);

require __DIR__.'/auth.php';