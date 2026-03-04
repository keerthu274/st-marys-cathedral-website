<?php

namespace App\Rules;

use App\Models\MassTime;
use App\Services\ClashDetectionService;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NoMassTimeOverlap implements ValidationRule
{
    public function __construct(
        private readonly string $day,
        private readonly ?string $location,
        private readonly string $startTime,
        private readonly string $endTime,
        private readonly ?int $ignoreId = null
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // If times not present, skip (other validation will catch it)
        if (!$this->startTime || !$this->endTime) return;

        $start = Carbon::createFromFormat('H:i', $this->startTime)->format('H:i:s');
        $end   = Carbon::createFromFormat('H:i', $this->endTime)->format('H:i:s');

        $service = app(ClashDetectionService::class);

        // Same day + same location must not overlap
        $hasOverlap = $service->hasOverlap(
            modelClass: MassTime::class,
            startColumn: 'start_time',
            endColumn: 'end_time',
            start: $start,
            end: $end,
            ignoreId: $this->ignoreId,
            filters: [
                'day' => $this->day,
                'location' => $this->location,
            ]
        );

        if ($hasOverlap) {

             $locationText = $this->location
             ? " at {$this->location}"
             : '';

         $fail("This Mass Time overlaps with an existing Mass for {$this->day}{$locationText}.");
        }
    }
}
