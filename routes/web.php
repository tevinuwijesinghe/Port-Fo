<?php

use App\Http\Controllers\ContactController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/contact', [ContactController::class, 'send'])
    ->withoutMiddleware([VerifyCsrfToken::class])
    ->middleware('throttle:5,1');

Route::get('/', function () {
    return response()->json([
        'status' => 'Portfolio backend is running',
    ]);
});