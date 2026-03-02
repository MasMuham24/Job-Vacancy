<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplyPosition extends Model
{
    public $timestamps = false;
    protected $fillable = ['date', 'society_id', 'job_vacancy_id', 'position_id', 'job_apply_societies_id', 'status'];
    public function position()
    {
        return $this->belongsTo(AvailablePosition::class, 'position_id', 'id');
    }
}
