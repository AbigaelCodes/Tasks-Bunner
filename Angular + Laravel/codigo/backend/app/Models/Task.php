<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    // Table tasks
    protected $table = 'tasks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'description', 'status', 'completed_at'
    ];

    /**
     * By default laravel will expect created_at & updated_at column in your table. By making it to false it will override the default setting.
     */
    public $timestamps = false;

    // Relation Many To One
    public function user()
    {
        return $this->belongsTo('App\Models\User','user_id');
    }
}