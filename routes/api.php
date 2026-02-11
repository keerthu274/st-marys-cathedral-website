<?php

use Illuminate\Support\Facades\Route;                   // Routing helper
use App\Http\Controllers\Api\V1\EventApiController;     // Events API controller

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| All routes in this file automatically start with "/api".
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // GET /api/v1/events
    // Returns list of published events
    Route::get('events', [EventApiController::class, 'index']);

    // GET /api/v1/events/{id}
    // Returns a single published event
    Route::get('events/{id}', [EventApiController::class, 'show']);
});
