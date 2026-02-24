<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\MassTimeController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {

    // Events CRUD routes
    Route::resource('events', EventController::class);

    // Extra route to get existing events by date (for clash checking UI)
    Route::get('events/by-date', [EventController::class, 'eventsByDate'])
        ->name('events.byDate');

    // Mass Times CRUD routes
    Route::resource('mass-times', MassTimeController::class)
        ->except(['show']); // we don't need a "show" page for admin
});

require __DIR__.'/auth.php';