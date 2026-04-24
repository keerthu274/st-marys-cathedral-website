<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ApiAuthController extends Controller
{
    public function csrfToken(Request $request): JsonResponse
    {
        $request->session()->regenerateToken();

        return response()->json([
            'csrf_token' => csrf_token(),
        ]);
    }

    public function signup(RegisterUserRequest $request): JsonResponse
    {
        if (Auth::check()) {
            return response()->json([
                'message' => 'You are already signed in.',
                'user' => $request->user(),
            ]);
        }

        $validated = $request->validated();

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
    }

    public function login(LoginRequest $request): JsonResponse
    {
        if (Auth::check()) {
            return response()->json([
                'message' => 'You are already signed in.',
                'user' => $request->user(),
            ]);
        }

        $request->authenticate();
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Logged in successfully.',
            'user' => $request->user(),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user()?->loadMissing('group');

        return response()->json([
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_main_admin' => (bool) $user->is_main_admin,
                'group_id' => $user->group_id,
                'group' => $user->group ? [
                    'id' => $user->group->id,
                    'name' => $user->group->name,
                    'slug' => $user->group->slug,
                ] : null,
            ] : null,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}
