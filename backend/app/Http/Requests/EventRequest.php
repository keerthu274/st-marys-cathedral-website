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

            // Start date is required
            // Also check overlapping events (no clashes)
            'start_date' => [
                'required',
                'date',
                new NoEventOverlap($eventId, $this->location),
            ],

            // End date is optional
            // If provided, it must be same day or after start date
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],

            // Location is optional
            'location' => ['nullable', 'string', 'max:255'],

            // Status must be one of these two
            'status' => ['required', 'in:draft,published'],
        ];
    }

    public function messages(): array
    {
        return [
            // Friendly message for invalid end date
            'end_date.after_or_equal' => 'End date must be the same or after the start date.',
        ];
    }
}