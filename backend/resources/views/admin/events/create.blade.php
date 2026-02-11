{{-- This page shows the form to create an event --}}
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Create Event') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">

            <div class="bg-white shadow-sm sm:rounded-lg p-6">

                {{-- Show validation errors if user submits wrong data --}}
                @if ($errors->any())
                    <div class="mb-4 p-3 bg-red-100 border border-red-300 rounded">
                        <ul class="list-disc ml-5">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                {{-- Create form --}}
                <form method="POST" action="{{ route('admin.events.store') }}">
                    @csrf {{-- CSRF protection token --}}

                    {{-- Title --}}
                    <div class="mb-4">
                        <label class="block mb-1">Title *</label>
                        <input type="text" name="title" value="{{ old('title') }}"
                               class="w-full border rounded p-2" required>
                    </div>

                    {{-- Description --}}
                    <div class="mb-4">
                        <label class="block mb-1">Description</label>
                        <textarea name="description" class="w-full border rounded p-2"
                                  rows="4">{{ old('description') }}</textarea>
                    </div>

                    {{-- Start date --}}
                    <div class="mb-4">
                        <label class="block mb-1">Start Date *</label>
                        <input type="date" name="start_date" value="{{ old('start_date') }}"
                               class="w-full border rounded px-3 py-2">
                    </div>

                    {{-- Start time --}}
                    <div class="mb-4">
                        <label class="block mb-1">Start Time</label>
                        <input type="time" name="start_time" value="{{ old('start_time') }}"
                               class="w-full border rounded px-3 py-2">
                    </div>

                    {{-- End date --}}
                    <div class="mb-4">
                        <label class="block mb-1">End Date</label>
                        <input type="date" name="end_date" value="{{ old('end_date') }}"
                               class="w-full border rounded px-3 py-2">
                    </div>

                    {{-- End time --}}
                    <div class="mb-4">
                        <label class="block mb-1">End Time</label>
                        <input type="time" name="end_time" value="{{ old('end_time') }}"
                               class="w-full border rounded px-3 py-2">
                    </div>

                    {{-- Location --}}
                    <div class="mb-4">
                        <label class="block mb-1">Location</label>
                        <input type="text" name="location" value="{{ old('location') }}"
                               class="w-full border rounded p-2">
                    </div>

                    {{-- Category --}}
                    <div class="mb-4">
                        <label class="block mb-1">Category</label>
                        <input type="text" name="category" value="{{ old('category') }}"
                               class="w-full border rounded p-2">
                    </div>

                    {{-- Status --}}
                    <div class="mb-6">
                        <label class="block mb-1">Status *</label>
                        <select name="status" class="w-full border rounded p-2" required>
                            <option value="published" {{ old('status') === 'published' ? 'selected' : '' }}>
                                Published
                            </option>
                            <option value="draft" {{ old('status') === 'draft' ? 'selected' : '' }}>
                                Draft
                            </option>
                        </select>
                    </div>

                    {{-- Buttons --}}
                    <div class="flex gap-3">
                        <button type="submit" class="px-4 py-2 bg-black text-white rounded">
                            Save Event
                        </button>

                        <a href="{{ route('admin.events.index') }}" class="px-4 py-2 border rounded">
                            Cancel
                        </a>
                    </div>

                </form>
            </div>
        </div>
    </div>
</x-app-layout>
