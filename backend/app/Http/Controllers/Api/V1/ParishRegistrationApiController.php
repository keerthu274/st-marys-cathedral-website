<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreParishRegistrationRequest;
use App\Models\ParishChild;
use App\Models\ParishInterest;
use App\Models\ParishRegistration;
use App\Mail\ParishRegistrationWelcome;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
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
        $children = $validated['children'] ?? [];
        $interests = $validated['interests'] ?? [];
        $registrationData = Arr::except($validated, ['children', 'interests']);

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

        $registrationData['member_id'] = $memberId;

        /**
         * ----------------------------------------------------------
         * Create Registration
         * ----------------------------------------------------------
         */

        $registration = DB::transaction(function () use ($registrationData, $children, $interests) {
            $registration = ParishRegistration::create($registrationData);

            /**
             * ----------------------------------------------------------
             * Save Children (for family registration)
             * ----------------------------------------------------------
             */

            foreach ($children as $child) {
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

            if (!empty($interests)) {

                ParishInterest::create([
                    'registration_id' => $registration->id,
                    'volunteering' => $interests['volunteering'] ?? false,
                    'parish_groups' => $interests['parish_groups'] ?? false,
                    'sacramental_preparation' => $interests['sacramental_preparation'] ?? false,
                    'weekly_newsletter' => $interests['weekly_newsletter'] ?? false,
                ]);
            }

            return $registration;
        });

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
