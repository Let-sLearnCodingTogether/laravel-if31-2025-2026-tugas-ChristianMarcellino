<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        try {
            $validated = $request->safe()->all();

            if(!Auth::attempt($validated)){
                return response()->json([
                    'message' => 'These provided credentials are not registered!',
                    'error' => $e->getMessage(),
                ]);
            }
            $user= $request->user();
            $token = $user->createToken('api', ['*'])->plainTextToken;
            return response()->json([
                'message' => "User Logged",
                'data' => $user,
                'token' => $token,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to add user',
                'error' => $e->getMessage(),
            ],500);
        }
        

    }

    public function register(RegisterRequest $request){
        try{
            $validated = $request->safe()->all();
            $validated['password'] = Hash::make($validated['password']);
            $user = User::create($validated);
            return response()->json([
                'message' => "User Registered"
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Failed to login',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request){
        try{
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'message' => " Successfully Logged Out" 
            ], 200);
        }catch(Exception $e){
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
