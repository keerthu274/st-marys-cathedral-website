<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\NoEventOverlap;

class EventRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Any logged-in admin user can manage events
        return auth()->check();
    }

    public function rules(): array
    {
        // Get the current event id when editing (so it won't clash with itself)
        $eventId = $this->route('event')?->id;

        return [
            // Title is required
            'title' => ['required', 'string', 'max:255'],

            // Description is optional
            'description' => ['nullable', 'string'],

            // Start date is required
            // Also check overlapping events (no clashes)
            'start_date' => [
                'required',
                'date',
                new NoEventOverlap($eventId),
            ],

            // Start time is required (so clashes are accurate)
            'start_time' => ['required', 'date_format:H:i'],

            // End date is optional (defaults to start date in the rule)
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],

            // End time is required (prevents "open ended" overlaps)
            'end_time' => ['required', 'date_format:H:i'],

            // Location is optional
            'location' => ['nullable', 'string', 'max:255'],

            // Status must be one of these two
            'status' => ['required', 'in:draft,published'],

            // Category is optional
            'category' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            // Friendly message for invalid end date
            'end_date.after_or_equal' => 'End date must be the same or after the start date.',

            // Friendly message for time fields
            'start_time.required' => 'Start time is required.',
            'end_time.required' => 'End time is required.',
        ];
    }
}