<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\MassTime;
use Illuminate\Http\JsonResponse;

class MassTimeApiController extends Controller
{
    /**
     * --------------------------------------------------------------------------
     * GET /api/v1/mass-times
     * --------------------------------------------------------------------------
     * This endpoint returns all published Mass times.
     * Used by the public website to display weekly Mass schedule.
     */

    public function index(): JsonResponse
    {
        // Fetch published mass times
        // Order by day and start time for proper weekly display

        $massTimes = MassTime::where('status', 'published')
            ->orderByRaw("
                FIELD(day, 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday')
            ")
            ->orderBy('start_time')
            ->get();

        // Return response as JSON

        return response()->json([
            'success' => true,
            'data' => $massTimes
        ]);
    }
}