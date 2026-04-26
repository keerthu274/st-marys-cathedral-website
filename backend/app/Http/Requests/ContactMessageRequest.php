<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => is_string($this->name) ? trim($this->name) : $this->name,
            'email' => is_string($this->email) ? strtolower(trim($this->email)) : $this->email,
            'phone' => is_string($this->phone) ? trim($this->phone) : $this->phone,
            'subject' => is_string($this->subject) ? trim($this->subject) : $this->subject,
            'category' => is_string($this->category) ? trim($this->category) : ($this->category ?: 'general'),
            'message' => is_string($this->message) ? trim($this->message) : $this->message,
        ]);
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255', 'regex:/^[\pL\pM\s.\'-]+$/u'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'phone' => ['nullable', 'string', 'min:7', 'max:25', 'regex:/^[0-9+\s().-]+$/'],
            'subject' => ['required', 'string', 'min:3', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'group_id' => ['nullable', 'integer', 'exists:groups,id', 'required_if:category,group_join'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.regex' => 'Name may only contain letters, spaces, apostrophes, hyphens, and full stops.',
            'phone.regex' => 'Phone number may only contain numbers, spaces, and common phone symbols.',
            'message.min' => 'Message must be at least 10 characters.',
        ];
    }
}
