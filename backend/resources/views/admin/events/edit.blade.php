{{-- This page shows the form to edit an existing event --}}
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Edit Event') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">

            <div class="bg-white shadow-sm sm:rounded-lg p-6">

                {{-- Show validation errors --}}
                @if ($errors->any())
                    <div class="mb-4 p-3 bg-red-100 border border-red-300 rounded">
                        <ul class="list-disc ml-5 text-sm text-red-800">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                {{-- Edit form --}}
                <form method="POST" action="{{ route('admin.events.update', $event) }}">
                    @csrf
                    @method('PUT')

                    {{-- Title --}}
                    <div class="mb-4">
                        <label class="block mb-1 font-medium">Title *</label>
                        <input type="text" name="title"
                               value="{{ old('title', $event->title) }}"
                               class="w-full border rounded p-2"
                               required>
                    </div>

                    {{-- Description --}}
                    <div class="mb-4">
                        <label class="block mb-1 font-medium">Description</label>
                        <textarea name="description"
                                  rows="4"
                                  class="w-full border rounded p-2">{{ old('description', $event->description) }}</textarea>
                    </div>

                    {{-- Start date --}}
                    <div class="mb-4">
                        <label class="block mb-1 font-medium">Start Date *</label>
                        <input type="date" name="start_date"
                               value="{{ old('start_date') }}"
                               class="w-full border rounded px-3 py-2"
                               required>
                    </div>

                    {{-- Start time --}}
                    <div class="mb-4">
                        <label class="block mb-1 font-medium">Start Time</label>
                        <input type="time" name="start_time"
                               value="{{ old('start_time') }}"
                               class="w-full border rounded px-3 py-2">
                    </div>

                    {{-- End date --}}
                    <div class="mb-4">
                        <label class="block mb-1 font-medium">End Date</label>
                        <input type="date" name="end_date"
                               value="{{ old('end_date') }}"
                               class="w-full border rounded px-3 py-2">
                    </div>

                    {{-- End time --}}
                    <div class="mb-4">
                        <label class="block mb-1 font-medium">End Time</label>
                        <input type="time" name="end_time"
                               value="{{ old('end_time') }}"
                               class="w-full border rounded px-3 py-2">
                    </div>

                    {{-- Location --}}
                    <div class="mb-4">
                        <label class="block mb-1 font-medium">Location</label>
                        <input type="text" name="location"
                               value="{{ old('location', $event->location) }}"
                               class="w-full border rounded p-2">
                    </div>

                    {{-- Category --}}
                    <div class="mb-4">
                        <label class="block mb-1 font-medium">Category</label>
                        <input type="text" name="category"
                               value="{{ old('category', $event->category) }}"
                               class="w-full border rounded p-2">
                    </div>

                    {{-- Status --}}
                    <div class="mb-6">
                        <label class="block mb-1 font-medium">Status *</label>
                        <select name="status"
                                class="w-full border rounded p-2"
                                required>
                            <option value="published"
                                {{ old('status', $event->status) === 'published' ? 'selected' : '' }}>
                                Published
                            </option>
                            <option value="draft"
                                {{ old('status', $event->status) === 'draft' ? 'selected' : '' }}>
                                Draft
                            </option>
                        </select>
                    </div>

                    {{-- Buttons --}}
                    <div class="mt-6 flex items-center gap-4">
                        <input type="submit"
                               value="Update Event"
                               class="px-5 py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer">

                        <a href="{{ route('admin.events.index') }}"
                           class="px-5 py-2 border rounded text-gray-700 hover:bg-gray-100">
                             Cancel
                        </a>
                    </div>
                    
                </form>

            </div>
        </div>
    </div>
</x-app-layout>
