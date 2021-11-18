<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


use App\Models\User;

class AuthController extends Controller
{
        public function register(Request $request)
    {
            $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password' => 'required|min:3|max:12',
            'confirmPassword'=>'required|min:3|max:12|same:password'
            ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
            $user = new User();
            $user->name = request('name');
            $user->email = request('email');
            $user->password = \Hash::make(request('password'));
            $user->save();

            return response()->json([
                'status'=> 200,
                'message'=>'User Registered Successfully',
            ]);
        }
    }

       public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email'=>'required|email|exists:users,email',
            'password'=>'required|min:3|max:12'
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else
        {
            $credentials = $request->only('email','password');

            if(Auth::attempt($credentials) )
            {
                $user = Auth::user();
                $token = $user->createToken('token')->accessToken;
                // $token = $user->createToken('token')->plainTextToken;
                // $cookie = cookie('jwt', $token, 60 * 24);

                return response([
                    'status' => 200,
                    'message' => $token
                 ]);
            }
            else
            {
              return response()->json([
                    'status'=> 401,
                    'message' => 'Invalid credentials',
                ]);
            }
        }
    }

    public function user()
    {
        return Auth::user();
    }

}
