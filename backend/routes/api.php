<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

// Auth routes
Route::get('auth', [AuthController::class, 'index']);
Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

// Protected routes with Sanctum token
Route::middleware('auth:sanctum')->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/me', [AuthController::class, 'me']);
});

// Products & Cart routes
Route::resource('products', ProductController::class)->only(['index', 'store']);
Route::resource('carts', CartController::class)->only(['store', 'show', 'update']);
