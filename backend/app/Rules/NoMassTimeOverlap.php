<?php

namespace App\Rules;

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
        // If start or end missing, skip (other rules handle it)
        if (!$this->startTime || !$this->endTime) {
            return;
        }

        // Format times to H:i:s for DB comparison
        $start = Carbon::createFromFormat('H:i', $this->startTime)
            ->format('H:i:s');

        $end = Carbon::createFromFormat('H:i', $this->endTime)
            ->format('H:i:s');

        $service = app(ClashDetectionService::class);

        // Global conflict check (Events + Mass Times)
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