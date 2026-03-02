<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AvailablePosition extends Model
{
    public $timestamps = false;
    protected $fillable = ['job_vacancy_id', 'position', 'capacity', 'apply_capacity'];

    public function applyCount()
    {
        return $this->hasMany(JobApplyPosition::class, 'position_id', 'id');
    }
}
