<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Cart;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users2',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => ucwords(strtolower($request->name)),
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $cart = Cart::create([
            'user_id' => $user->id,
            'items' => ([]),
            'totalQuantity' => 0,
            'totalPrice' => 0
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'The user is registered',
            'user' => $user,
            'token' => $token,
            'cartId' => $cart->id
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid data'], 401);
        }

        $user = Auth::user();
        if ($user instanceof \App\Models\User) {
            $token = $user->createToken('auth_token')->plainTextToken;
            $cart = $user->cart;
            return response()->json([
                'message' => 'User is logged in',
                'user' => $user,
                'token' => $token,
                'cartId' => $cart->id,
                'redirect' => '/dashboard'
            ], 200);
        } else {
            return response()->json(['message' => 'Not logged in or invalid user'], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'You have successfully logged out'], 200);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        Log::info('User:', ['user' => $user]);
        return response()->json([
            'user' => $user,
            'cart' => $user->cart ?? []
        ]);
    }
}
