<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

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
            'nationality' => is_string($this->nationality) ? trim($this->nationality) : $this->nationality,
            'occupation' => is_string($this->occupation) ? trim($this->occupation) : $this->occupation,
            'address_line1' => is_string($this->address_line1) ? trim($this->address_line1) : $this->address_line1,
            'address_line2' => is_string($this->address_line2) ? trim($this->address_line2) : $this->address_line2,
            'city' => is_string($this->city) ? trim($this->city) : $this->city,
            'phone' => is_string($this->phone) ? trim($this->phone) : $this->phone,
            'email' => is_string($this->email) ? strtolower(trim($this->email)) : $this->email,
            'postcode' => is_string($this->postcode) ? strtoupper(trim($this->postcode)) : $this->postcode,
            'partner_name' => is_string($this->partner_name) ? trim($this->partner_name) : $this->partner_name,
            'signature' => is_string($this->signature) ? trim($this->signature) : $this->signature,
        ]);
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'registration_type' => ['required', 'string', 'in:individual,family'],
            'full_name' => ['required', 'string', 'min:2', 'max:255', 'regex:/^[\pL\pM\s.\'-]+$/u'],
            'date_of_birth' => ['required', 'date', 'before_or_equal:today'],
            'gender' => ['required', 'string', 'in:male,female'],
            'nationality' => ['nullable', 'string', 'max:255'],
            'occupation' => ['nullable', 'string', 'max:255'],
            'address_line1' => ['required', 'string', 'min:5', 'max:255'],
            'address_line2' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'min:2', 'max:255', 'regex:/^[\pL\pM\s.\'-]+$/u'],
            'postcode' => ['required', 'string', 'max:20', 'regex:/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/'],
            'phone' => ['required', 'string', 'min:7', 'max:25', 'regex:/^[0-9+\s().-]+$/'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'partner_name' => ['nullable', 'string', 'min:2', 'max:255', 'regex:/^[\pL\pM\s.\'-]+$/u'],
            'contact_by_phone' => ['sometimes', 'boolean'],
            'contact_by_email' => ['sometimes', 'boolean'],
            'consent_confirmed' => ['accepted'],
            'signature' => ['required', 'string', 'min:2', 'max:255', 'regex:/^[\pL\pM\s.\'-]+$/u'],
            'signed_date' => ['required', 'date', 'before_or_equal:today'],
            'children' => ['sometimes', 'array'],
            'children.*.child_name' => ['required_with:children.*.age', 'nullable', 'string', 'min:2', 'max:255', 'regex:/^[\pL\pM\s.\'-]+$/u'],
            'children.*.age' => ['required_with:children.*.child_name', 'nullable', 'integer', 'between:0,18'],
            'interests' => ['sometimes', 'array'],
            'interests.volunteering' => ['sometimes', 'boolean'],
            'interests.parish_groups' => ['sometimes', 'boolean'],
            'interests.sacramental_preparation' => ['sometimes', 'boolean'],
            'interests.weekly_newsletter' => ['sometimes', 'boolean'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator) {
                if ($this->registration_type === 'individual' && !empty($this->children)) {
                    $validator->errors()->add('children', 'Children can only be added for family registrations.');
                }
            },
        ];
    }

    public function messages(): array
    {
        return [
            '*.regex' => 'This field contains characters that are not allowed.',
            'postcode.regex' => 'Enter a valid UK postcode.',
            'phone.regex' => 'Phone number may only contain numbers, spaces, and common phone symbols.',
            'consent_confirmed.accepted' => 'Consent must be confirmed before registration.',
            'children.*.age.between' => 'Child age must be between 0 and 18.',
        ];
    }
}
