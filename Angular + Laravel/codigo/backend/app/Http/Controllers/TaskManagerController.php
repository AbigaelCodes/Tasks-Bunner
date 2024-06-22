<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TaskManagerController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show user's tasks.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {   // Get user tasks from database.
        $user_id = Auth::User()->id;
        $user = User::find($user_id);
        $tasks =  $user->tasks;

        // Return tasks.
        return response()
        ->json(['tasks' => $tasks],200)
        ->header('Content-Type', 'application/json');
    }

    public function CreateTask(Request $request)
    {
        // Obtener usuario.
        $user_id = Auth::User()->id;
        $user = User::find($user_id);

        // Obtener datos de la tarea.
        $task = new Task();
        $task->user_id = $user->id;
        $task->description = $request->input('description');
        $task->created_at = date('Y-m-d H:i:s');
        $task->status = 0;
        $task->completed_at = null;

        // Crear tarea.
        $task->save();

        return response()
        ->json(['message' => 'Task created correctly.'],200)
        ->withHeaders([
            'Access-Control-Allow-Headers' => 'Origin',
            'Access-Control-Allow-Origin' => 'http://localhost:4200',
            'Content-Type' => 'application/json'
        ]);
    }

    public function UpdateTask(Request $request)
    {
        // Obtener usuario.
        $user_id = Auth::User()->id;
        $user = User::find($user_id);

        // Actualizar datos de la tarea.
        $task = Task::find($request->task_id);
        $task->status = 1;
        $task->completed_at = date('Y-m-d H:i:s');

        // Actualizar tarea.
        $task->update();

        return response('Task updated correctly.',200)
        ->withHeaders([
            'Access-Control-Allow-Headers' => 'Origin',
            'Access-Control-Allow-Origin' => 'http://localhost:4200'
        ]);
    }
}
