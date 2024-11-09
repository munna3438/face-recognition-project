<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class enrollUser extends Model
{
    protected $fillable = ['userName', 'UserID', 'userGender', 'userImage', 'status'];
}
