<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\NoMassTimeOverlap;
use Illuminate\Support\Facades\Auth;

class MassTimeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        $massTimeId = $this->route('mass_time')?->id;

        return [

            'day' => ['required', 'string', 'max:20'],

            'start_time' => [
                'required',
                'date_format:H:i',
                new NoMassTimeOverlap(
                    day: $this->day,
                    location: $this->location,
                    startTime: $this->start_time,
                    ignoreId: $massTimeId
                ),
            ],

            'location' => ['nullable', 'string', 'max:100'],
            'language' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:1000'],

            'status' => ['required', 'in:draft,published'],
        ];
    }

    public function messages(): array
    {
        return [
            'start_time.required' => 'Please select a Start Time.',
        ];
    }
}