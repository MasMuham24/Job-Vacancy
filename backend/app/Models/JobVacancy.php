<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobVacancy extends Model
{
    public $timestamps = false;
    protected $fillable = ['job_category_id', 'company', 'address', 'description'];

    public function category()
    {
        return $this->belongsTo(JobCategory::class, 'job_category_id', 'id');
    }

    public function availablePositions()
    {
        return $this->hasMany(AvailablePosition::class, 'job_vacancy_id', 'id');
    }
}
