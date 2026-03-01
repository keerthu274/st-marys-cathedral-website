<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MassTimeRequest;
use App\Models\MassTime;
use Illuminate\Http\Request;

class MassTimeController extends Controller
{
    public function index()
    {
        // Auto-order Mass Times by day (Sunday → Saturday) and then by start_time
        $massTimes = MassTime::orderByRaw("
            FIELD(day,
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            )
        ")
        ->orderBy('start_time') // Correct column name
        ->paginate(10);

        return view('admin.mass-times.index', compact('massTimes'));
    }

    public function create()
    {
        // Show create form
        return view('admin.mass-times.create');
    }

    public function store(MassTimeRequest $request)
    {
        // Create using validated input only
        MassTime::create($request->validated());

        return redirect()
            ->route('admin.mass-times.index')
            ->with('success', 'Mass time created successfully.');
    }

    public function edit(MassTime $massTime)
    {
        // Show edit form for the selected row
        return view('admin.mass-times.edit', compact('massTime'));
    }

    public function update(MassTimeRequest $request, MassTime $massTime)
    {
        // Update using validated input only
        $massTime->update($request->validated());

        return redirect()
            ->route('admin.mass-times.index')
            ->with('success', 'Mass time updated successfully.');
    }

    public function destroy(MassTime $massTime)
    {
        // Delete the selected row
        $massTime->delete();

        return redirect()
            ->route('admin.mass-times.index')
            ->with('success', 'Mass time deleted successfully.');
    }

    public function byDay(Request $request)
    {
    // Get filters from query string
    $day = $request->query('day');
    $location = $request->query('location');

    // Fetch mass times for that day (+ location if provided)
    $massTimes = MassTime::query()
        ->when($day, fn($q) => $q->where('day', $day))
        ->when($location, fn($q) => $q->where('location', $location))
        ->orderBy('start_time')
        ->get(['id', 'day', 'location', 'start_time', 'end_time', 'language']);

    return response()->json($massTimes);
    }
}