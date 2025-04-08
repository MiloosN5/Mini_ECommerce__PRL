<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
        ]);

        $cart = Cart::create([
            'user_id' => $request->user_id,
            'items' =>([]),
            'totalQuantity' => 0,
            'totalPrice' => 0,
        ]);

        return response()->json(['message' => 'Cart created successfully!', 'cart' => $cart], 201);
    }

    public function update(Request $request)
    {
        $request->validate([
            'user_id' => 'required|numeric',
            'items' => 'nullable|array',
            'totalPrice' => 'required|numeric',
            'totalQuantity' => 'required|numeric'
        ]);

        $cart = Cart::updateOrCreate(
            ['user_id' => $request->user_id],
            [
                'items' => $request->items,
                'totalPrice' => $request->totalPrice,
                'totalQuantity' => $request->totalQuantity
            ]
        );

        return response()->json(['message' => 'The cart has been successfully saved', 'cart' => $cart], 200);
    }

    public function show($cartId)
    {
        $cart = Cart::with('user')->find($cartId);

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        $cart->totalPrice = (float) $cart->totalPrice;
        $cart->totalQuantity = (int) $cart->totalQuantity;
        $cart->items = ($cart->items);

        return response()->json(['message' => 'Cart found', 'cart' => $cart], 200);
    }
}
