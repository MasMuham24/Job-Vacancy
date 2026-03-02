<?php

use App\Http\Controllers\Api\ApplicationsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobVacancyController;
use App\Http\Controllers\Api\ValidationController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login'])->name('login');
        Route::post('/logout', [AuthController::class, 'logout']);
    });
    Route::get('/validations', [ValidationController::class, 'index']);
    Route::post('/validations', [ValidationController::class, 'store']);
    Route::get('job_categories', function () {
        return response()->json([
            'job_categories' => \App\Models\JobCategory::all(),
        ]);
    });
    Route::get('job_vacancies', [JobVacancyController::class, 'index']);
    Route::get('job_vacancies/{id}', [JobVacancyController::class, 'show']);
    Route::post('applications', [ApplicationsController::class, 'store']);
    Route::get('applications', [ApplicationsController::class, 'index']);
});
