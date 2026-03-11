<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactApiController extends Controller
{
    /**
     * --------------------------------------------------------------------------
     * POST /api/v1/contact
     * --------------------------------------------------------------------------
     * Store a contact message submitted from the public website.
     */

    public function store(Request $request): JsonResponse
    {
        // Validate form input

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'required|string|max:255',
            'message' => 'required|string'
        ]);

        // Create contact message record

        ContactMessage::create($validated);

        // Return response

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully'
        ]);
    }
}