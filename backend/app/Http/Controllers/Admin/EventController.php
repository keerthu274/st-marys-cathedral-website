<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;          // Base controller class
use App\Models\Event;                         // Our Event model (database table)
use App\Http\Requests\EventRequest;           // Event validation request (clash prevention)
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a list of events (Admin: /admin/events).
     */
    public function index()
    {
        // Get events from database, newest first (latest created at top)
        $events = Event::orderBy('start_date', 'desc')->get();

        // Return the admin list page and pass the events data to it
        return view('admin.events.index', compact('events'));
    }

    /**
     * Show the form to create a new event (Admin: /admin/events/create).
     */
    public function create()
    {
        // Just show the create form page
        return view('admin.events.create');
    }

    /**
     * Store a newly created event in the database (POST /admin/events).
     */
    public function store(EventRequest $request)
    {
        // Validate input coming from the create form (security + correctness)
        $validated = $request->validated();

        // If event is marked as all day, set full-day time range
        if ($request->has('all_day')) {
            $validated['start_time'] = '00:00';
            $validated['end_time'] = '23:59';
        }

        // Capitalise selected fields
        $validated['title'] = ucfirst(strtolower($validated['title']));

        if (!empty($validated['location'])) {
            $validated['location'] = ucfirst(strtolower($validated['location']));
        }

        if (!empty($validated['category'])) {
            $validated['category'] = ucfirst(strtolower($validated['category']));
        }

        // Create the event in the database using validated data
        Event::create($validated);

        // Redirect back to events list with a success message
        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event created successfully.');
    }

    /**
     * Display a single event (Admin: /admin/events/{event}).
     * (Optional - we may not use this much, but resource route includes it.)
     */
    public function show(Event $event)
    {
        // Show a simple view page for one event (we will create it if needed)
        return view('admin.events.show', compact('event'));
    }

    /**
     * Show the form to edit an existing event (Admin: /admin/events/{event}/edit).
     */
    public function edit(Event $event)
    {
        // Show edit form and send the selected event data
        return view('admin.events.edit', compact('event'));
    }

    /**
     * Update an existing event (PUT/PATCH /admin/events/{event}).
     */
    public function update(EventRequest $request, Event $event)
    {
        // Validate input coming from the edit form
        $validated = $request->validated();

        // If event is marked as all day, set full-day time range
        if ($request->has('all_day')) {
            $validated['start_time'] = '00:00';
            $validated['end_time'] = '23:59';
        }

        // Capitalise fields
        $validated['title'] = ucfirst(strtolower($validated['title']));

        if (!empty($validated['location'])) {
            $validated['location'] = ucfirst(strtolower($validated['location']));
        }

        if (!empty($validated['category'])) {
            $validated['category'] = ucfirst(strtolower($validated['category']));
        }

        // Update the event using validated data
        $event->update($validated);

        // Redirect back to list with success message
        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Return events for a selected date (used in create/edit preview box).
     */
    public function byDate(Request $request)
    {
        // Get date from query string
        $date = $request->query('date');

        if (!$date) {
            return response()->json([]);
        }

        // Get events that are happening on that date (including multi-day events)
        $events = Event::whereDate('start_date', '<=', $date)
            ->whereRaw("IFNULL(end_date, start_date) >= ?", [$date])
            ->orderByRaw("IFNULL(start_time, '00:00') ASC")
            ->get(['id', 'title', 'start_date', 'start_time', 'end_date', 'end_time']);

        return response()->json($events);
    }

    /**
     * Delete an event (DELETE /admin/events/{event}).
     */
    public function destroy(Event $event)
    {
        // Delete the selected event from database
        $event->delete();

        // Redirect back with success message
        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event deleted successfully.');
    }
}




