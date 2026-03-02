<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Society;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'id_card_number' => 'required',
            'password' => 'required',
        ]);

        $society = Society::with('regional')->where('id_card_number', $request->id_card_number)->first();

        if (! $society || $request->password != $society->password) {
            return response()->json([
                'message' => 'ID Card Number or Password Incorrect',
            ], 401);
        }

        $token = md5($request->id_card_number.time());
        $society->update([
            'login_tokens' => $token,
        ]);

        return response()->json([
            'name' => $society->name,
            'born_date' => $society->born_date,
            'gender' => $society->gender,
            'address' => $society->address,
            'token' => $token,
            'regional' => $society->regional,
        ], 200);
    }

    public function logout(Request $request)
    {
        $token = $request->query('token')
               ?? $request->input('token')
               ?? $request->bearerToken();

        if (! $token) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $society = Society::where('login_tokens', $token)->first();

        if (! $society) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $society->update(['login_tokens' => null]);

        return response()->json(['message' => 'Logout success'], 200);
    }
}
