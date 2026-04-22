<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateParishRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'full_name' => is_string($this->full_name) ? trim($this->full_name) : $this->full_name,
            'email' => is_string($this->email) ? strtolower(trim($this->email)) : $this->email,
            'phone' => is_string($this->phone) ? trim($this->phone) : $this->phone,
            'partner_name' => is_string($this->partner_name) ? trim($this->partner_name) : $this->partner_name,
        ]);
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'partner_name' => ['nullable', 'string', 'max:255'],
            'children' => ['sometimes', 'array'],
            'children.*.child_name' => ['required_with:children.*.age', 'nullable', 'string', 'max:255'],
            'children.*.age' => ['required_with:children.*.child_name', 'nullable', 'integer', 'between:0,18'],
            'volunteering' => ['sometimes', 'boolean'],
            'parish_groups' => ['sometimes', 'boolean'],
            'sacramental_preparation' => ['sometimes', 'boolean'],
            'weekly_newsletter' => ['sometimes', 'boolean'],
        ];
    }
}
