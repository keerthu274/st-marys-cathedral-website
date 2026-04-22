<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Http\Resources\EventResource;
use App\Http\Resources\MassTimeResource;
use App\Http\Resources\ParishRegistrationResource;
use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\MassTime;
use App\Models\ParishRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OverviewController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $events = Event::orderBy('start_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->limit(4)
            ->get();

        $massTimes = MassTime::orderByRaw($this->dayOrderSql())
            ->orderBy('start_time')
            ->limit(4)
            ->get();

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
                'events' => EventResource::collection($events)->resolve($request),
                'mass_times' => MassTimeResource::collection($massTimes)->resolve($request),
                'registrations' => ParishRegistrationResource::collection($registrations)->resolve($request),
                'contact_messages' => ContactMessageResource::collection($contactMessages)->resolve($request),
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
