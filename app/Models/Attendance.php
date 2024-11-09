<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
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
    ];
}
