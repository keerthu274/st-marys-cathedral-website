<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ParishCouncilMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        $member = $this->route('parishCouncilMember');

        return [
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string', 'max:2000'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:100000'],
            'is_active' => ['nullable', 'boolean'],
            'photo' => [
                $member ? 'nullable' : 'required',
                'file',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'photo.required' => 'Please upload a member photo.',
            'photo.mimes' => 'The member photo must be a JPG, PNG, or WebP image.',
            'photo.max' => 'The member photo must be 5MB or smaller.',
        ];
    }
}
