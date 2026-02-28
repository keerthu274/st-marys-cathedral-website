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

    // Route to get events by selected date (used in create/edit preview box)
    Route::get('events/by-date', [EventController::class, 'byDate'])
    ->name('events.by-date');

    // Events CRUD routes
    Route::resource('events', EventController::class);

    // Mass Times CRUD routes
    Route::resource('mass-times', MassTimeController::class)
        ->except(['show']);
});

require __DIR__.'/auth.php';