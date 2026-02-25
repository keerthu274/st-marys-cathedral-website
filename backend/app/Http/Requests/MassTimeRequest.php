<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            // Day must be a short string (example: "Sunday")
            'day' => ['required', 'string', 'max:20'],

            // Time must be in HH:MM format
            // Also block duplicate day + time slots (no clashes)
            'time' => [
                'required',
                'date_format:H:i',
                Rule::unique('mass_times')
                    ->where(fn ($q) => $q->where('day', $this->day))
                    ->ignore($massTimeId),
            ],

            'location' => ['nullable', 'string', 'max:100'],
            'language' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:1000'],

            // Status must be one of these two
            'status' => ['required', 'in:draft,published'],
        ];
    }

    public function messages(): array
    {
        return [
            // Friendly message for duplicate time slot
            'time.unique' => 'This time slot is already booked for the selected day.',
        ];
    }
}