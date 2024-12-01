<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnrollUser extends Model
{
    protected $fillable = ['userName', 'UserID', 'userGender', 'userImage', 'status', 'log', 'institute_id', 'hidden', 'deleted', 'updated'];

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->status = 0;
            $model->log = "Waiting for upload request";
        });
    }

    public function institute()
    {
        return $this->belongsTo(Institute::class);
    }
}
