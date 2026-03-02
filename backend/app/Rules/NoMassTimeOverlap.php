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

    public function validate(string $attribute, mixed $value, \Closure $fail): void
    {
        // If start or end time missing, skip (other validation handles it)
        if (!$this->startTime || !$this->endTime) {
            return;
        }

        $start = \Carbon\Carbon::createFromFormat('H:i', $this->startTime)
            ->format('H:i:s');

        $end = \Carbon\Carbon::createFromFormat('H:i', $this->endTime)
            ->format('H:i:s');

        $service = app(\App\Services\ClashDetectionService::class);

        // Global conflict check (checks Events + Mass tables)
        $hasOverlap = $service->hasGlobalOverlap(
            location: $this->location,
            start: $start,
            end: $end,
            ignoreId: $this->ignoreId,
            ignoreModel: 'mass'
        );

        if ($hasOverlap) {

            $locationText = $this->location
                ? " at {$this->location}"
                : '';
    
            $fail("This Mass Time conflicts with another scheduled activity{$locationText}.");
        }
    }
}
