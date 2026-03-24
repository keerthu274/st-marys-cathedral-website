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
        ->orderBy('start_time')
        ->paginate(10);

        return view('admin.mass-times.index', compact('massTimes'));
    }

    public function create()
    {
        return view('admin.mass-times.create');
    }

    public function store(MassTimeRequest $request)
    {
        MassTime::create($request->validated());

        return redirect()
            ->route('admin.mass-times.index')
            ->with('success', 'Mass time created successfully.');
    }

    public function edit(MassTime $massTime)
    {
        return view('admin.mass-times.edit', compact('massTime'));
    }

    public function update(MassTimeRequest $request, MassTime $massTime)
    {
        $massTime->update($request->validated());

        return redirect()
            ->route('admin.mass-times.index')
            ->with('success', 'Mass time updated successfully.');
    }

    public function destroy(MassTime $massTime)
    {
        $massTime->delete();

        return redirect()
            ->route('admin.mass-times.index')
            ->with('success', 'Mass time deleted successfully.');
    }

    public function byDay(Request $request)
    {
        $day = $request->query('day');
        $location = $request->query('location');

        $massTimes = MassTime::query()
            ->when($day, fn($q) => $q->where('day', $day))
            ->when($location, fn($q) => $q->where('location', $location))
            ->orderBy('start_time')
            ->get(['id', 'day', 'location', 'start_time', 'language'])
            ->map(function ($m) {
                return [
                    'id' => $m->id,
                    'day' => $m->day,
                    'location' => $m->location,
                    'start_time' => \Carbon\Carbon::parse($m->start_time)->format('H:i'),
                    'language' => $m->language,
                ];
            });

        return response()->json($massTimes);
    }
}