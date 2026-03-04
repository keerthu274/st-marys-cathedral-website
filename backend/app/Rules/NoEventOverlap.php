<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Services\ClashDetectionService;

class NoEventOverlap implements ValidationRule
{
    // ignoreId is used when editing (so it won't clash with itself)
    public function __construct(private ?int $ignoreId) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Get values from request
        $startDate = request('start_date');
        $endDate   = request('end_date') ?: $startDate;

        // If time missing, use full-day defaults
        $startTime = request('start_time') ?: '00:00';
        $endTime   = request('end_time') ?: '23:59';

        // Build full datetime strings
        $newStart = $startDate . ' ' . $startTime . ':00';
        $newEnd   = $endDate . ' ' . $endTime . ':00';

        // Extra safety: ensure end is after start
        if (strtotime($newEnd) <= strtotime($newStart)) {
            $fail('End time must be after start time.');
            return;
        }

        $location = request('location');

        // Use global scheduling engine
        $service = app(ClashDetectionService::class);

        $hasOverlap = $service->hasGlobalOverlap(
            location: $location,
            start: $newStart,
            end: $newEnd,
            ignoreId: $this->ignoreId,
            ignoreModel: 'event'
        );

        if ($hasOverlap) {
            $fail('This Event conflicts with another scheduled activity at the selected location.');
        }
    }
}