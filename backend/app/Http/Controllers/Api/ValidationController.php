<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Society;
use App\Models\Validation;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    public function index(Request $request)
    {
        $token = $request->query('token');
        $society = Society::where('login_tokens', $token)->first();

        if (!$token || !$society) {
            return response()->json(['message' => 'Unauthorized user'], 401);
        }

        $validation = Validation::with('validator', 'job_category')
            ->where('society_id', $society->id)
            ->first();

        return response()->json([
            'validation' => $validation
        ], 200);
    }

    public function store(Request $request)
    {
        $token = $request->query('token');
        $society = Society::where('login_tokens', $token)->first();

        if (!$token || !$society) {
            return response()->json(['message' => 'Unauthorized user'], 401);
        }

        $request->validate([
            'work_experience' => 'required',
            'job_category_id' => 'required',
            'job_position' => 'required',
            'reason_accepted' => 'required',
        ]);

        Validation::create([
            'work_experience' => $request->work_experience,
            'job_category_id' => $request->job_category_id,
            'job_position' => $request->job_position,
            'reason_accepted' => $request->reason_accepted,
            'society_id' => $society->id,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Request data validation sent successful'
        ], 200);
    }
}
