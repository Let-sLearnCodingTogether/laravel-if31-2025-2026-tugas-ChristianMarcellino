<?php
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\GlossariesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('guest')->group(function() {
    Route::post('/user/register', [AuthController::class, 'register']);
    Route::post('/user/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/user/logout', [AuthController::class, 'logout']);
    Route::apiResource('glossaries', GlossariesController::class)
    ->middlewareFor(['show','update','destroy'], 'ensureCreator');
});