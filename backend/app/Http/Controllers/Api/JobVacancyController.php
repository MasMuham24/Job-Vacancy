<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Society;
use App\Models\JobVacancy;
use App\Models\JobApplyPosition;

class JobVacancyController extends Controller
{
    private function authenticate($token)
    {
        if (!$token) return null;
        return Society::where('login_tokens', $token)->first();
    }

    public function index(Request $request)
    {
        $society = $this->authenticate($request->query('token'));

        if (!$society) {
            return response()->json(['message' => 'Unauthorized user'], 401);
        }

        $validation = $society->load('validation')->validation;
        $jobCategoryId = $validation?->job_category_id;

        $vacancies = JobVacancy::with(['category', 'availablePositions'])
            ->where('job_category_id', $jobCategoryId)
            ->get();

        $result = $vacancies->map(function ($vacancy) {
            return [
                'id' => $vacancy->id,
                'category' => $vacancy->category,
                'company' => $vacancy->company,
                'address' => $vacancy->address,
                'description' => $vacancy->description,
                'available_position' => $vacancy->availablePositions->map(fn($pos) => [
                    'position' => $pos->position,
                    'capacity' => $pos->capacity,
                    'apply_capacity' => $pos->apply_capacity,
                ]),
            ];
        });

        return response()->json(['vacancies' => $result], 200);
    }

    public function show(Request $request, $id)
    {
        $society = $this->authenticate($request->query('token'));

        if (!$society) {
            return response()->json(['message' => 'Unauthorized user'], 401);
        }

        $vacancy = JobVacancy::with(['category', 'availablePositions'])->find($id);

        if (!$vacancy) {
            return response()->json(['message' => 'Vacancy not found'], 404);
        }

        $result = [
            'id' => $vacancy->id,
            'category' => $vacancy->category,
            'company' => $vacancy->company,
            'address' => $vacancy->address,
            'description' => $vacancy->description,
            'available_position' => $vacancy->availablePositions->map(fn($pos) => [
                'position' => $pos->position,
                'capacity' => $pos->capacity,
                'apply_capacity' => $pos->apply_capacity,
                'apply_count' => JobApplyPosition::where('position_id', $pos->id)->count(),
            ]),
        ];

        return response()->json(['vacancy' => $result], 200);
    }
}
