<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ParishRegistration;
use App\Models\ParishChild;
use App\Models\ParishInterest;
use App\Mail\ParishRegistrationWelcome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\JsonResponse;

class ParishRegistrationApiController extends Controller
{
    /**
     * --------------------------------------------------------------------------
     * POST /api/v1/parish-registrations
     * --------------------------------------------------------------------------
     * Store a new parish registration submitted from the website.
     */

    public function store(Request $request): JsonResponse
    {
        /**
         * ----------------------------------------------------------
         * Validate registration form
         * ----------------------------------------------------------
         */

        $validated = $request->validate([
            'registration_type' => 'required|string',

            'full_name' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string',

            'nationality' => 'nullable|string',
            'occupation' => 'nullable|string',

            'address_line1' => 'required|string',
            'address_line2' => 'nullable|string',
            'city' => 'required|string',
            'postcode' => 'required|string',

            'phone' => 'required|string',
            'email' => 'required|email',

            'partner_name' => 'nullable|string',

            'contact_by_phone' => 'boolean',
            'contact_by_email' => 'boolean',

            'consent_confirmed' => 'required|boolean',
            'signature' => 'required|string',
            'signed_date' => 'required|date',

            'children' => 'array',
            'interests' => 'array'
        ]);

        /**
         * ----------------------------------------------------------
         * Generate Member ID
         * ----------------------------------------------------------
         */

        $lastMember = ParishRegistration::orderBy('id', 'desc')->first();

        if ($lastMember && $lastMember->member_id) {

            $lastNumber = intval(substr($lastMember->member_id, 3));
            $newNumber = $lastNumber + 1;

        } else {

            $newNumber = 1;
        }

        $memberId = 'SMC' . str_pad($newNumber, 6, '0', STR_PAD_LEFT);

        /**
         * ----------------------------------------------------------
         * Add member_id to validated data
         * ----------------------------------------------------------
         */

        $validated['member_id'] = $memberId;

        /**
         * ----------------------------------------------------------
         * Create Registration
         * ----------------------------------------------------------
         */

        $registration = ParishRegistration::create($validated);

        /**
         * ----------------------------------------------------------
         * Save Children (for family registration)
         * ----------------------------------------------------------
         */

        if ($request->has('children')) {

            foreach ($request->children as $child) {

                ParishChild::create([
                    'registration_id' => $registration->id,
                    'child_name' => $child['child_name'],
                    'age' => $child['age'] ?? null
                ]);
            }
        }

        /**
         * ----------------------------------------------------------
         * Save Parish Interests
         * ----------------------------------------------------------
         */

        if ($request->has('interests')) {

            ParishInterest::create([
                'registration_id' => $registration->id,
                'volunteering' => $request->interests['volunteering'] ?? false,
                'parish_groups' => $request->interests['parish_groups'] ?? false,
                'sacramental_preparation' => $request->interests['sacramental_preparation'] ?? false,
                'weekly_newsletter' => $request->interests['weekly_newsletter'] ?? false
            ]);
        }

        /**
         * ----------------------------------------------------------
         * Send Welcome Email
         * ----------------------------------------------------------
         */

        Mail::to($registration->email)
            ->send(new ParishRegistrationWelcome($registration->full_name));

        /**
         * ----------------------------------------------------------
         * API Response
         * ----------------------------------------------------------
         */

        return response()->json([
            'success' => true,
            'member_id' => $registration->member_id,
            'message' => 'Parish registration completed successfully'
        ]);
    }
}