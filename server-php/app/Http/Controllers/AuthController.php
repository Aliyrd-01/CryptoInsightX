<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'name' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'name' => $request->name,
            'plan' => 'free',
        ]);

        Auth::login($user);

        return response()->json([
            'id' => (string) $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'plan' => $user->plan,
            'createdAt' => $user->created_at->toISOString(),
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (
            !$user ||
            empty($user->password) ||
            !Hash::check($request->password, $user->password)
        ) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        Auth::login($user);

        return response()->json([
            'id' => (string) $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'plan' => $user->plan,
            'createdAt' => $user->created_at->toISOString(),
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        return response()->json([
            'id' => (string) $user->id,
            'email' => $user->email,
            'name' => $user->name,
            'plan' => $user->plan,
            'createdAt' => $user->created_at->toISOString(),
        ]);
    }
}
