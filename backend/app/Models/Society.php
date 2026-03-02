<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Society extends Model
{
    protected $table = 'societies';

    public $timestamps = false;

    protected $fillable = [
        'id_card_number',
        'password',
        'name',
        'born_date',
        'gender',
        'address',
        'regional_id',
        'login_tokens',
    ];

    protected $hidden = ['password'];

    public function regional()
    {
        return $this->belongsTo(Regional::class, 'regional_id', 'id');
    }

    public function validation()
    {
        return $this->hasOne(Validation::class, 'society_id', 'id')
            ->where('status', 'accepted');
    }
}
