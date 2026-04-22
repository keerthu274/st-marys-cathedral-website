<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class NewsletterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'title' => is_string($this->title) ? trim($this->title) : $this->title,
            'description' => is_string($this->description) ? trim($this->description) : $this->description,
        ]);
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $newsletter = $this->route('newsletter');

        return [
            'title' => ['required', 'string', 'min:3', 'max:255'],
            'publication_date' => ['required', 'date'],
            'description' => ['nullable', 'string', 'max:2000'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'pdf' => [
                $newsletter ? 'nullable' : 'required',
                'file',
                'extensions:pdf',
                'max:20480',
            ],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            if (! $this->hasFile('pdf')) {
                return;
            }

            $file = $this->file('pdf');

            if (! $file || ! $file->isValid()) {
                return;
            }

            $handle = @fopen($file->getRealPath(), 'rb');

            if (! $handle) {
                $validator->errors()->add('pdf', 'The newsletter file could not be read.');
                return;
            }

            $signature = fread($handle, 5);
            fclose($handle);

            if ($signature !== '%PDF-') {
                $validator->errors()->add('pdf', 'The newsletter file must be a valid PDF.');
            }
        });
    }

    public function messages(): array
    {
        return [
            'pdf.required' => 'Please upload a newsletter PDF.',
            'pdf.extensions' => 'The newsletter file must use the .pdf extension.',
            'pdf.max' => 'The newsletter PDF must be 20MB or smaller.',
        ];
    }
}
