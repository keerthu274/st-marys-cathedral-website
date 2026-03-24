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
        $dayOrderSql = "
            CASE day
                WHEN 'Sunday' THEN 1
                WHEN 'Monday' THEN 2
                WHEN 'Tuesday' THEN 3
                WHEN 'Wednesday' THEN 4
                WHEN 'Thursday' THEN 5
                WHEN 'Friday' THEN 6
                WHEN 'Saturday' THEN 7
                ELSE 8
            END
        ";

        $massTimes = MassTime::where('status', 'published')
            ->orderByRaw($dayOrderSql)
            ->orderBy('start_time')
            ->get();

        // Return response as JSON

        return response()->json([
            'success' => true,
            'data' => $massTimes
        ]);
    }
}
