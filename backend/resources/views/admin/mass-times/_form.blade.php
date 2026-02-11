{{-- resources/views/admin/mass-times/_form.blade.php --}}
{{-- Shared form for Create & Edit Mass Times --}}

@csrf

{{-- Day --}}
<div class="mb-4">
    <label class="block mb-1 font-semibold">Day</label>

    <select name="day" class="w-full border p-2 rounded">
        @php
            $days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            $selectedDay = old('day', $massTime->day ?? '');
        @endphp

        <option value="">Select a day</option>

        @foreach ($days as $day)
            <option value="{{ $day }}" {{ $selectedDay === $day ? 'selected' : '' }}>
                {{ $day }}
            </option>
        @endforeach
    </select>

    @error('day')
        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
    @enderror
</div>

{{-- Time --}}
<div class="mb-4">
    <label class="block mb-1 font-semibold">Time</label>
    <input type="time"
           name="time"
           value="{{ old('time', isset($massTime) ? \Carbon\Carbon::parse($massTime->time)->format('H:i') : '') }}"
           class="w-full border p-2 rounded">
    @error('time')
        <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
    @enderror
</div>

{{-- Location --}}
<div class="mb-4">
    <label class="block mb-1 font-semibold">Location (optional)</label>
    <input type="text"
           name="location"
           value="{{ old('location', $massTime->location ?? '') }}"
           class="w-full border p-2 rounded"
           placeholder="e.g., Cathedral">
</div>

{{-- Language --}}
<div class="mb-4">
    <label class="block mb-1 font-semibold">Language (optional)</label>
    <input type="text"
           name="language"
           value="{{ old('language', $massTime->language ?? '') }}"
           class="w-full border p-2 rounded"
           placeholder="e.g., English">
</div>

{{-- Notes --}}
<div class="mb-4">
    <label class="block mb-1 font-semibold">Notes (optional)</label>
    <textarea name="notes"
              class="w-full border p-2 rounded"
              rows="3"
              placeholder="Any extra details...">{{ old('notes', $massTime->notes ?? '') }}</textarea>
</div>

{{-- Status --}}
<div class="mb-4">
    <label class="block mb-1 font-semibold">Status</label>
    <select name="status" class="w-full border p-2 rounded">
        <option value="draft" {{ old('status', $massTime->status ?? 'draft') === 'draft' ? 'selected' : '' }}>
            Draft
        </option>
        <option value="published" {{ old('status', $massTime->status ?? 'draft') === 'published' ? 'selected' : '' }}>
            Published
        </option>
    </select>
</div>

{{-- Sort Order --}}
<div class="mb-6">
    <label class="block mb-1 font-semibold">Display Order</label>
    <input type="number"
           name="sort_order"
           value="{{ old('sort_order', $massTime->sort_order ?? 0) }}"
           class="w-full border p-2 rounded"
           min="0">
</div>

{{-- Form actions --}}
<div class="flex gap-3">
    <button type="submit"
            class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
        Save
    </button>

    <a href="{{ route('admin.mass-times.index') }}"
       class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Cancel
    </a>
</div>
