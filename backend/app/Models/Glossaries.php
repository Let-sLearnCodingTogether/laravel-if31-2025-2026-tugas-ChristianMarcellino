<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Glossaries extends Model
{
    protected $fillable =['term', 'definition', 'source','user_id'];
}
