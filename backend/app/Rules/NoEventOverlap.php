<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Event;

class NoEventOverlap implements ValidationRule
{
    // ignoreId is used when editing (so it won't clash with itself)
    public function __construct(private ?int $ignoreId) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Get date + time from request
        $startDate = request('start_date');
        $endDate   = request('end_date') ?: $startDate;

        // If time is missing, use full-day safe defaults
        $startTime = request('start_time') ?: '00:00';
        $endTime   = request('end_time') ?: '23:59';

        // Create full date-time strings
        $newStart = $startDate . ' ' . $startTime . ':00';
        $newEnd   = $endDate . ' ' . $endTime . ':00';

        // Make sure end is after start (extra safety)
        if (strtotime($newEnd) <= strtotime($newStart)) {
            $fail('End time must be after start time.');
            return;
        }

        // Find any event that overlaps this time range
        $query = Event::query()
            ->when($this->ignoreId, fn($q) => $q->where('id', '!=', $this->ignoreId))
            ->whereRaw("
                STR_TO_DATE(CONCAT(start_date,' ',IFNULL(start_time,'00:00')), '%Y-%m-%d %H:%i') < ?
                AND
                STR_TO_DATE(CONCAT(IFNULL(end_date,start_date),' ',IFNULL(end_time,'23:59')), '%Y-%m-%d %H:%i') > ?
            ", [$newEnd, $newStart]);

        if ($query->exists()) {
            $fail('This time slot is already booked for another event.');
        }
    }
}