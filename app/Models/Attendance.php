<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'in_time',
        'exit_time',
        'institute_token'
    ];

    protected $casts = [
        'in_time' => 'datetime',
        'exit_time' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(EnrollUser::class, 'user_id', 'UserID');
    }
}
