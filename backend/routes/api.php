<?php

use Illuminate\Support\Facades\Route;

// API Controllers
use App\Http\Controllers\Api\V1\EventApiController;
use App\Http\Controllers\Api\V1\MassTimeApiController;
use App\Http\Controllers\Api\V1\ContactApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| All routes in this file automatically start with "/api".
| Example: /api/v1/events
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Events API
    |--------------------------------------------------------------------------
    */

    // GET /api/v1/events
    // Returns list of published events
    Route::get('events', [EventApiController::class, 'index']);

    // GET /api/v1/events/{id}
    // Returns a single event
    Route::get('events/{id}', [EventApiController::class, 'show']);

    // POST /api/v1/contact
    // Store contact form message
    Route::post('contact', [ContactApiController::class, 'store']);


    /*
    |--------------------------------------------------------------------------
    | Mass Times API
    |--------------------------------------------------------------------------
    */

    // GET /api/v1/mass-times
    // Returns weekly mass schedule
    Route::get('mass-times', [MassTimeApiController::class, 'index']);
});