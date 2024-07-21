<?php

use App\Http\Controllers\TaskManagerController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Guests

Route::post('/login',[UserController::class, 'login']);
Route::post('/register',[UserController::class, 'register']);

// Auth

Route::get('/user', function (Request $request) {
    return $request->user();
    })->middleware('auth:sanctum');

Route::get('/tasks',[TaskManagerController::class, 'index'])
->middleware('auth:sanctum');

Route::post('/tasks/create',[TaskManagerController::class, 'CreateTask'])
->middleware('auth:sanctum');

Route::post('/tasks/update',[TaskManagerController::class, 'UpdateTask'])
->middleware('auth:sanctum');

Route::post('/tasks/delete',[TaskManagerController::class, 'DeleteTask'])
->middleware('auth:sanctum');
    
