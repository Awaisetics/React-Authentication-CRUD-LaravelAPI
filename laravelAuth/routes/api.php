<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function(){
    Route::get('/user', [AuthController::class, 'user']);

    Route::get('/students', [StudentController::class, 'index']);
    
    Route::post('/add-student', [StudentController::class, 'store']);
    Route::get('/edit-student/{id}', [StudentController::class, 'edit']);
    Route::put('update-student/{id}', [StudentController::class, 'update']);
    Route::delete('delete-student/{id}', [StudentController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});




