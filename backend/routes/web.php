<?php

use App\Models\User;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\MassTimeController;
use App\Http\Controllers\Admin\OverviewController;
use App\Http\Controllers\Admin\ParishRegistrationController;
use App\Http\Controllers\Admin\ContactMessageController;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {

    Route::get('overview', [OverviewController::class, 'index'])
        ->name('overview');

    Route::get('events/by-date', [EventController::class, 'byDate'])
        ->name('events.by-date');

    Route::resource('events', EventController::class);

    Route::resource('mass-times', MassTimeController::class)
        ->except(['show']);

    Route::get('mass-times/by-day', [MassTimeController::class, 'byDay'])
        ->name('mass-times.by-day');

    Route::get('parish-registrations', [ParishRegistrationController::class, 'index'])
        ->name('parish-registrations.index');

    Route::get('parish-registrations/{parishRegistration}', [ParishRegistrationController::class, 'show'])
        ->name('parish-registrations.show');

        // added: delete registration
    Route::delete('/parish-registrations/{parishRegistration}', [\App\Http\Controllers\Admin\ParishRegistrationController::class, 'destroy'])
       ->name('parish-registrations.destroy');

       // added: edit form
    Route::get('/parish-registrations/{parishRegistration}/edit',
        [\App\Http\Controllers\Admin\ParishRegistrationController::class, 'edit'])
        ->name('parish-registrations.edit');

      // added: update
    Route::put('/parish-registrations/{parishRegistration}',
        [\App\Http\Controllers\Admin\ParishRegistrationController::class, 'update'])
        ->name('parish-registrations.update');

    Route::get('contact-messages', [ContactMessageController::class, 'index'])
        ->name('contact-messages.index');

    Route::get('contact-messages/{contactMessage}', [ContactMessageController::class, 'show'])
        ->name('contact-messages.show');
});

Route::prefix('auth-api')->group(function () {
    Route::get('csrf-token', function (Request $request) {
        $request->session()->regenerateToken();

        return response()->json([
            'csrf_token' => csrf_token(),
        ]);
    });

    Route::post('signup', function (Request $request) {
        if (Auth::check()) {
            return response()->json([
                'message' => 'You are already signed in.',
                'user' => $request->user(),
            ], 200);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        event(new Registered($user));
        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Account created successfully.',
            'user' => $request->user(),
        ], 201);
    });

    Route::post('login', function (Request $request) {
        if (Auth::check()) {
            return response()->json([
                'message' => 'You are already signed in.',
                'user' => $request->user(),
            ], 200);
        }

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            return response()->json([
                'message' => 'These credentials do not match our records.',
                'errors' => [
                    'email' => ['These credentials do not match our records.'],
                ],
            ], 422);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Logged in successfully.',
            'user' => $request->user(),
        ]);
    });

    Route::middleware('auth')->group(function () {
        Route::get('me', function (Request $request) {
            return response()->json([
                'user' => $request->user(),
            ]);
        });

        Route::post('logout', function (Request $request) {
            Auth::guard('web')->logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'message' => 'Logged out successfully.',
            ]);
        });
    });
});

require __DIR__.'/auth.php';
