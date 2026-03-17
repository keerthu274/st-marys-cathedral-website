<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\JsonResponse;

class EventApiController extends Controller
{
    /**
     * --------------------------------------------------------------------------
     * GET /api/v1/events
     * --------------------------------------------------------------------------
     * Returns a list of published events.
     * Used by the public website (React frontend).
     */

    public function index(): JsonResponse
    {
        // Fetch published events ordered by upcoming date and time

        $events = Event::query()
            ->where('status', 'published')        // Only published events
            ->orderBy('start_date', 'asc')        // Upcoming events first
            ->orderBy('start_time', 'asc')
            ->get();

        // Transform events into clean public JSON structure

        $data = $events->map(function ($event) {
            return [
                'id'          => $event->id,
                'title'       => $event->title,
                'description' => $event->description,
                'start_date'  => $event->start_date,
                'start_time'  => $event->start_time,
                'end_date'    => $event->end_date,
                'end_time'    => $event->end_time,
                'location'    => $event->location,
                'category'    => $event->category,
            ];
        });

        // Return JSON response

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }


    /**
     * --------------------------------------------------------------------------
     * GET /api/v1/events/{id}
     * --------------------------------------------------------------------------
     * Returns a single published event.
     */

    public function show(int $id): JsonResponse
    {
        // Find the event only if it is published

        $event = Event::query()
            ->where('id', $id)
            ->where('status', 'published')
            ->first();

        // Return 404 if event does not exist

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found'
            ], 404);
        }

        // Return event data

        return response()->json([
            'success' => true,
            'data' => [
                'id'          => $event->id,
                'title'       => $event->title,
                'description' => $event->description,
                'start_date'  => $event->start_date,
                'start_time'  => $event->start_time,
                'end_date'    => $event->end_date,
                'end_time'    => $event->end_time,
                'location'    => $event->location,
                'category'    => $event->category,
            ]
        ]);
    }
}