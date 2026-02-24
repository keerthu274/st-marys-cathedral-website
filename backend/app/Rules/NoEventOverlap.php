<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Event;

class NoEventOverlap implements ValidationRule
{
    // ignoreId is used when editing (so it won't clash with itself)
    // location is used if you want to check clashes only in same location
    public function __construct(
        private ?int $ignoreId,
        private ?string $location
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Get start and end date from request
        $start = request('start_date');

        // If end date is empty, treat it as same as start date
        $end = request('end_date') ?: $start;

        // Start building query
        $query = Event::query()

            // Ignore current event when editing
            ->when($this->ignoreId, fn($q) => 
                $q->where('id', '!=', $this->ignoreId)
            )

            // Check clash only in same location (optional logic)
            ->when($this->location, fn($q) => 
                $q->where('location', $this->location)
            );

        // Overlap logic:
        // Existing event start <= new event end
        // AND existing event end >= new event start
        $query->where(function ($q) use ($start, $end) {
            $q->whereDate('start_date', '<=', $end)
              ->whereDate('end_date', '>=', $start);
        });

        // If any overlapping event exists, fail validation
        if ($query->exists()) {
            $fail('This event clashes with another event already booked for that date/time range.');
        }
    }
}