<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Validation extends Model
{
    protected $table = 'validations';

    public $timestamps = false;

    protected $fillable = [
        'society_id',
        'validator_id',
        'job_category_id',
        'job_position',
        'reason_accepted',
        'work_experience',
        'status',
        'notes',
    ];

    public function job_category()
    {
        return $this->belongsTo(JobCategory::class, 'job_category_id');
    }

    public function validator()
    {
        return $this->belongsTo(Validator::class, 'validator_id');
    }

    public function society()
    {
        return $this->belongsTo(Society::class, 'society_id');
    }
}
