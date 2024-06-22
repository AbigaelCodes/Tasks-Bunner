<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{

    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => ['required','email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)){
            //session()->regenerate();
            $user = User::where('email',$request->input('email'))->first();
            $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;


            return response()->json([
                'access_token' => $token,
                'user' => $user
            ],200)
            ->header('Content-Type', 'application/json')
            ->header('Authorization', "Bearer $token");


            // return response()
            //     ->json([
            //     'message' => 'User logged correctly.'
            //     ], 200)
            //     ->header('Content-Type', 'application/json');
        }


        return new Response('The provided credentials do not match our records.', 401);
        // return back()->withErrors([
        //     'email' => 'The provided credentials do not match our records.'
        // ])->onlyInput('email');        
    }

    public function register(Request $request)
    {

        // Validate data
        $validData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ]);


        // Create user

        $user = User::create([
            'name' => $validData['name'],
            'email' => $validData['email'],
            'password' => Hash::make($validData['password']),
        ]);



        if ($user){
            $request->session()->regenerate();

            return new Response('Reggistered correctly', 200);
        }


        return new Response('The provided data could not be reggistered.', 500);  
    }
}
