<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    use HasFactory;


    protected $fillable = [
        'title',
        'completed',
        'user_id',
        'details',
    ];
}