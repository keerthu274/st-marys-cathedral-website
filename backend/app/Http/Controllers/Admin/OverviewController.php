<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\MassTime;
use App\Models\ParishRegistration;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class OverviewController extends Controller
{
    public function index(): JsonResponse
    {
        $events = Event::orderBy('start_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->limit(4)
            ->get();

        $massTimes = MassTime::orderByRaw($this->dayOrderSql())
            ->orderBy('start_time')
            ->limit(4)
            ->get()
            ->map(fn (MassTime $massTime) => [
                'id' => $massTime->id,
                'day' => $massTime->day,
                'start_time' => Carbon::parse($massTime->start_time)->format('H:i'),
                'end_time' => $massTime->end_time ? Carbon::parse($massTime->end_time)->format('H:i') : null,
                'location' => $massTime->location,
                'language' => $massTime->language,
                'notes' => $massTime->notes,
                'status' => $massTime->status,
            ])
            ->values();

        $registrations = ParishRegistration::latest()
            ->limit(4)
            ->get();

        $contactMessages = ContactMessage::latest()
            ->limit(4)
            ->get();

        return response()->json([
            'stats' => [
                'events' => [
                    'total' => Event::count(),
                    'published' => Event::where('status', 'published')->count(),
                ],
                'mass_times' => [
                    'total' => MassTime::count(),
                    'published' => MassTime::where('status', 'published')->count(),
                ],
                'registrations' => [
                    'total' => ParishRegistration::count(),
                ],
                'contact_messages' => [
                    'total' => ContactMessage::count(),
                ],
            ],
            'recent' => [
                'events' => $events,
                'mass_times' => $massTimes,
                'registrations' => $registrations,
                'contact_messages' => $contactMessages,
            ],
        ]);
    }

    private function dayOrderSql(): string
    {
        return "
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
    }
}
