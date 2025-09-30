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
        $validated = $request->safe()->all();

    }

    public function register(RegisterRequest $request){
        try{
            $validated = $request->safe()->all();
            $validated['password'] = Hash::make($validated['password']);
            $user = User::create($validated);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Failed to add user',
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function logout(){

    }
}
