<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\NoEventOverlap;

class EventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $eventId = $this->route('event')?->id;

        return [
            'title' => ['required', 'string', 'max:255'],

            'description' => ['nullable', 'string'],

            'start_date' => [
                'required',
                'date',
                new NoEventOverlap($eventId),
            ],

            // If not all day, time is required
            'start_time' => ['nullable', 'date_format:H:i'],
            'end_time'   => ['nullable', 'date_format:H:i'],

            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],

            'location' => ['nullable', 'string', 'max:255'],

            'status' => ['required', 'in:draft,published'],

            'category' => ['nullable', 'string', 'max:255'],

            // All day checkbox
            'all_day' => ['nullable', 'boolean'],
        ];
    }
}