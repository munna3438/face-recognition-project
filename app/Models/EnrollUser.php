<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnrollUser extends Model
{
    protected $fillable = ['userName', 'UserID', 'userGender', 'userImage', 'status', 'log', 'institute'];

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->status = 0;
            $model->log = "Waiting for upload request";
        });
    }
}
