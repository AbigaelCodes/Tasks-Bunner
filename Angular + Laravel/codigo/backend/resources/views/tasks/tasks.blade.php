@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">            
            <h1> TASK MANAGER </h1>
            
            <ul>
            <li>Hola</li>
            @foreach ($tasks as $task)
                <li>
                    {{-- Boton borrar --}}
                    <div>
                     Borrar {{ $task->user_id }}
                    </div>

                    {{-- Detalles --}}
                    <div>
                        {{ $task->description }}
                    </div>

                    {{-- Boton completar --}}
                    <div>
                     Completar
                    </div>
                </li>
            @endforeach
            </ul>
        </div>
    </div>
</div>
@endsection
