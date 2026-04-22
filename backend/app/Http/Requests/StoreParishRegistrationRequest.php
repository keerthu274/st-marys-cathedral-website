<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreParishRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'full_name' => is_string($this->full_name) ? trim($this->full_name) : $this->full_name,
            'email' => is_string($this->email) ? strtolower(trim($this->email)) : $this->email,
            'postcode' => is_string($this->postcode) ? strtoupper(trim($this->postcode)) : $this->postcode,
        ]);
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'registration_type' => ['required', 'string', 'in:individual,family'],
            'full_name' => ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'date', 'before_or_equal:today'],
            'gender' => ['required', 'string', 'in:male,female'],
            'nationality' => ['nullable', 'string', 'max:255'],
            'occupation' => ['nullable', 'string', 'max:255'],
            'address_line1' => ['required', 'string', 'max:255'],
            'address_line2' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'postcode' => ['required', 'string', 'max:20'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'partner_name' => ['nullable', 'string', 'max:255'],
            'contact_by_phone' => ['sometimes', 'boolean'],
            'contact_by_email' => ['sometimes', 'boolean'],
            'consent_confirmed' => ['accepted'],
            'signature' => ['required', 'string', 'max:255'],
            'signed_date' => ['required', 'date', 'before_or_equal:today'],
            'children' => ['sometimes', 'array'],
            'children.*.child_name' => ['required_with:children.*.age', 'nullable', 'string', 'max:255'],
            'children.*.age' => ['required_with:children.*.child_name', 'nullable', 'integer', 'between:0,18'],
            'interests' => ['sometimes', 'array'],
            'interests.volunteering' => ['sometimes', 'boolean'],
            'interests.parish_groups' => ['sometimes', 'boolean'],
            'interests.sacramental_preparation' => ['sometimes', 'boolean'],
            'interests.weekly_newsletter' => ['sometimes', 'boolean'],
        ];
    }
}
