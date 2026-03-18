<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\NoEventOverlap;
use Illuminate\Support\Facades\Auth;

class EventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
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

            'start_time' => ['required', 'date_format:H:i'],
            'end_time'   => ['required', 'date_format:H:i'],

            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],

            'location' => ['nullable', 'string', 'max:255'],

            'status' => ['required', 'in:draft,published'],

            'category' => ['nullable', 'string', 'max:255'],

            'all_day' => ['nullable', 'boolean'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {

            if ($this->start_time && $this->end_time) {

                if ($this->end_time <= $this->start_time) {
                    $validator->errors()->add('end_time', 'End time must be after start time.');
                }
            }
        });
    }
}