<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreParishRegistrationRequest;
use App\Models\ParishChild;
use App\Models\ParishInterest;
use App\Models\ParishRegistration;
use App\Mail\ParishRegistrationWelcome;
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

    public function store(StoreParishRegistrationRequest $request): JsonResponse
    {
        $validated = $request->validated();

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

        foreach ($validated['children'] ?? [] as $child) {
            if (empty($child['child_name'])) {
                continue;
            }

            ParishChild::create([
                'registration_id' => $registration->id,
                'child_name' => $child['child_name'],
                'age' => $child['age'] ?? null,
            ]);
        }

        /**
         * ----------------------------------------------------------
         * Save Parish Interests
         * ----------------------------------------------------------
         */

        if (isset($validated['interests'])) {

            ParishInterest::create([
                'registration_id' => $registration->id,
                'volunteering' => $validated['interests']['volunteering'] ?? false,
                'parish_groups' => $validated['interests']['parish_groups'] ?? false,
                'sacramental_preparation' => $validated['interests']['sacramental_preparation'] ?? false,
                'weekly_newsletter' => $validated['interests']['weekly_newsletter'] ?? false,
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
