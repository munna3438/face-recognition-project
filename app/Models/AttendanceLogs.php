<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceLogs extends Model
{
    protected $fillable = [
        'name',
        'user_id',
        'sex',
        'image',
        'user_list',
        'mask',
        'access_card',
        'snap_timestamp',
        'institute_id'
    ];

    protected $casts = [
        'snap_timestamp' => 'datetime',
    ];

    public function institute()
    {
        return $this->belongsTo(Institute::class);
    }
}
