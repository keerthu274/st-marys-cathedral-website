<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Event;
use App\Services\ClashDetectionService;
use Carbon\Carbon;

class NoEventOverlap implements ValidationRule
{
    // ignoreId is used when editing (so it won't clash with itself)
    public function __construct(private ?int $ignoreId) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Get date + time from request
        $startDate = request('start_date');
        $endDate   = request('end_date') ?: $startDate;

        // If time is missing, use safe defaults (for all-day events)
        $startTime = request('start_time') ?: '00:00';
        $endTime   = request('end_time') ?: '23:59';

        // Convert event date to weekday (Sunday, Monday etc.)
        $weekday = Carbon::parse($startDate)->format('l');

        // Create full datetime strings
        $newStart = $startTime . ':00';
        $newEnd   = $endTime . ':00';

        // Extra safety: make sure end > start
        if (strtotime($newEnd) <= strtotime($newStart)) {
            $fail('End time must be after start time.');
            return;
        }

        // First: Check Event vs Event overlap (same date)
        $eventQuery = Event::query()
            ->when($this->ignoreId, fn($q) => $q->where('id', '!=', $this->ignoreId))
            ->where('start_date', $startDate)
            ->where('start_time', '<', $newEnd)
            ->where('end_time', '>', $newStart);

        if ($eventQuery->exists()) {
            $fail('This time slot is already booked for another event.');
            return;
        }

        // Second: Global clash check (Event vs Mass)
        $service = app(ClashDetectionService::class);

        $hasGlobalOverlap = $service->hasGlobalOverlap(
            location: request('location'),
            start: $newStart,
            end: $newEnd,
            weekday: $weekday,
            ignoreId: $this->ignoreId,
            ignoreModel: 'event'
        );

        if ($hasGlobalOverlap) {
            $fail('This event conflicts with an existing Mass time at the same location.');
        }
    }
}