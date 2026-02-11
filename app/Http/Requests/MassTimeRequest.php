<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MassTimeRequest extends FormRequest
{
    public function authorize(): bool
    {
        // For now: any logged-in admin user can manage mass times.
        // If later you add roles, you can restrict here.
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            // Day must be a short string (example: "Sunday")
            'day' => ['required', 'string', 'max:20'],

            // HTML time input sends "HH:MM" - validate as date format
            'time' => ['required', 'date_format:H:i'],

            'location' => ['nullable', 'string', 'max:100'],
            'language' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:1000'],

            // Status must be one of these two
            'status' => ['required', 'in:draft,published'],

            // Sorting must be a number (0..)
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
