<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\NoMassTimeOverlap;
use Carbon\Carbon;

class MassTimeRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Any logged-in admin user can manage mass times
        return auth()->check();
    }

    public function rules(): array
    {
        // Get the current mass time id when editing (so it won't clash with itself)
        $massTimeId = $this->route('mass_time')?->id;

        return [

            // Day must be provided (example: "Sunday")
            'day' => ['required', 'string', 'max:20'],

            // Start time must be valid HH:MM format
            'start_time' => [
                'required',
                'date_format:H:i',

                // Custom rule to prevent time clashes (same day + same location)
                new NoMassTimeOverlap(
                    day: $this->day,
                    location: $this->location,
                    startTime: $this->start_time,
                    endTime: $this->end_time,
                    ignoreId: $massTimeId
                ),
            ],

            // End time must exist and must be after start time
            'end_time' => [
                'required',
                'date_format:H:i',
                function ($attribute, $value, $fail) {

                    if (!$this->start_time || !$value) {
                        return;
                    }

                    $start = Carbon::createFromFormat('H:i', $this->start_time);
                    $end   = Carbon::createFromFormat('H:i', $value);

                    // End time must be later than start time
                    if ($end->lessThanOrEqualTo($start)) {
                        $fail('End Time must be after Start Time.');
                    }
                }
            ],

            'location' => ['nullable', 'string', 'max:100'],
            'language' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:1000'],

            // Status must be draft or published
            'status' => ['required', 'in:draft,published'],
        ];
    }

    public function messages(): array
    {
        return [
            'start_time.required' => 'Please select a Start Time.',
            'end_time.required' => 'Please select an End Time.',
        ];
    }
}