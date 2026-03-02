<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplySociety extends Model
{
    public $timestamps = false;
    protected $table = 'job_apply_societies';
    protected $fillable = ['notes', 'date', 'society_id', 'job_vacancy_id'];

    public function vacancy()
    {
        return $this->belongsTo(JobVacancy::class, 'job_vacancy_id', 'id');
    }

    public function positions()
    {
        return $this->hasMany(JobApplyPosition::class, 'job_apply_societies_id', 'id');
    }
}
