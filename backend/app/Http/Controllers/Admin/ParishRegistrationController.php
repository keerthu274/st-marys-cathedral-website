<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ParishRegistration;
use Illuminate\Http\Request;

class ParishRegistrationController extends Controller
{
    // added: show all registrations
    public function index()
    {
        $registrations = ParishRegistration::latest()->paginate(10);

        return view('admin.parish-registrations.index', compact('registrations'));
    }

    // added: show one registration with children and interests
    public function show(ParishRegistration $parishRegistration)
    {
        $parishRegistration->load(['children', 'interest']);

        return view('admin.parish-registrations.show', compact('parishRegistration'));
    }

    // added: delete registration with children and interest
    public function destroy(ParishRegistration $parishRegistration)
    {
        // delete children first
        $parishRegistration->children()->delete();

        // delete interest
        if ($parishRegistration->interest) {
            $parishRegistration->interest()->delete();
        }

        // delete main record
        $parishRegistration->delete();

        return redirect()
            ->route('admin.parish-registrations.index')
            ->with('success', 'Registration deleted successfully.');
    }

    // added: show edit form with children + interest
    public function edit(ParishRegistration $parishRegistration)
    {
        $parishRegistration->load('children', 'interest');

        return view('admin.parish-registrations.edit', compact('parishRegistration'));
    }

    // added: update registration
    public function update(Request $request, ParishRegistration $parishRegistration)
    {
        // update main details
        $parishRegistration->update([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'partner_name' => $request->partner_name,
        ]);

        // update children (simple: delete + re-add)
        $parishRegistration->children()->delete();

        if ($request->children) {
            foreach ($request->children as $child) {
                if (!empty($child['child_name'])) {
                    $parishRegistration->children()->create([
                        'child_name' => $child['child_name'],
                        'age' => $child['age']
                    ]);
                }
            }
        }

        // update interests
        if ($parishRegistration->interest) {
            $parishRegistration->interest()->update([
                'volunteering' => $request->volunteering ? true : false,
                'parish_groups' => $request->parish_groups ? true : false,
                'sacramental_preparation' => $request->sacramental_preparation ? true : false,
                'weekly_newsletter' => $request->weekly_newsletter ? true : false,
            ]);
        }

        return redirect()
            ->route('admin.parish-registrations.show', $parishRegistration)
            ->with('success', 'Registration updated successfully.');
    }

}