<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AvailablePosition;
use App\Models\Society;
use App\Models\JobApplyPosition;
use App\Models\Validation;
use Illuminate\Support\Facades\Validator;
use App\Models\JobApplySociety;

class ApplicationsController extends Controller
{
    private function authenticate($token)
    {
        if (! $token) {
            return null;
        }

        return Society::where('login_tokens', $token)->first();
    }

    public function store(Request $request)
    {
        $society = $this->authenticate($request->query('token'));

        if (! $society) {
            return response()->json(['message' => 'Unauthorized user'], 401);
        }

        $validation = Validation::where('society_id', $society->id)
            ->where('status', 'accepted')
            ->first();

        if (! $validation) {
            return response()->json([
                'message' => 'Your data validator must be accepted by validator before',
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'vacancy_id' => 'required',
            'positions' => 'required|array|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors(),
            ], 401);
        }

        $alreadyApplied = JobApplySociety::where('society_id', $society->id)
            ->where('job_vacancy_id', $request->vacancy_id)
            ->first();

        if ($alreadyApplied) {
            return response()->json([
                'message' => 'Application for a job can only be once',
            ], 401);
        }

        $positions = AvailablePosition::where('job_vacancy_id', $request->vacancy_id)
            ->whereIn('position', $request->positions)
            ->get();

        foreach ($positions as $pos) {
            $applyCount = JobApplyPosition::where('position_id', $pos->id)->count();
            if ($applyCount >= $pos->apply_capacity) {
                return response()->json([
                    'message' => "Position {$pos->position} has reached maximum apply",
                ], 401);
            }
        }

        $apply = JobApplySociety::create([
            'society_id' => $society->id,
            'job_vacancy_id' => $request->vacancy_id,
            'notes' => $request->notes ?? null,
            'date' => now()->toDateString(),
        ]);

        foreach ($positions as $pos) {
            JobApplyPosition::create([
                'date' => now()->toDateString(),
                'society_id' => $society->id,
                'job_vacancy_id' => $request->vacancy_id,
                'position_id' => $pos->id,
                'job_apply_societies_id' => $apply->id,
                'status' => 'pending',
            ]);
        }

        return response()->json(['message' => 'Applying for job successful'], 200);
    }

    public function index(Request $request)
    {
        $society = $this->authenticate($request->query('token'));

        if (! $society) {
            return response()->json(['message' => 'Unauthorized user'], 401);
        }

        $applies = JobApplySociety::with(['vacancy.category', 'positions.position'])
            ->where('society_id', $society->id)
            ->get();

        $result = $applies->map(function ($apply) {
            return [
                'id' => $apply->vacancy->id,
                'category' => $apply->vacancy->category,
                'company' => $apply->vacancy->company,
                'address' => $apply->vacancy->address,
                'position' => $apply->positions->map(fn ($p) => [
                    'position' => $p->position->position ?? null,
                    'apply_status' => $p->status,
                    'notes' => $apply->notes,
                ]),
            ];
        });

        return response()->json(['vacancies' => $result], 200);
    }
}
