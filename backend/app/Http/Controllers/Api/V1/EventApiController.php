<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller; // Base controller
use App\Models\Event;                // Event model
use Illuminate\Http\Request;         // Request handling

class EventApiController extends Controller
{
    /**
 * GET /api/v1/events
 * Return a list of published events as JSON (clean public format).
 */
public function index()
{
    // Get published events ordered by start date (soonest first)
    $events = Event::query()
        ->where('status', 'published')       // Only published events
        ->orderBy('start_date', 'asc')       // Soonest date first
        ->orderBy('start_time', 'asc')       // Soonest time first
        ->get();

    // Convert events into a clean "public" JSON structure
    // This prevents exposing extra fields later
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

    // Return as JSON
    return response()->json($data);
}


    /**
     * GET /api/v1/events/{id}
     * Return one published event as JSON.
     */
    public function show($id)
    {
        // Find a published event by ID
        $event = Event::query()
            ->where('id', $id)
            ->where('status', 'published')
            ->first();

        // If not found, return 404 JSON
        if (!$event) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        // Return event JSON
        return response()->json($event);
    }
}
