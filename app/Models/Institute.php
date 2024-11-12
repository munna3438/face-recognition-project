<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Institute extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'email',
        'cam_ip',
        'cam_port',
        'token',
        'max_user',
        'status',
    ];

    public const ARR_STATUS = ['inactive', 'active'];

    protected static function booted() {
        static::creating(function($model) {
            $model->slug = Str::slug($model->name . '-' . $model->id);
            $model->token = Str::random(64);
        });
    }

}
