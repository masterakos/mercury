<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'AppController@application_index');
Route::post('/login', 'AppController@login');
Route::get('/me', 'AppController@user_information');
Route::post('/register', 'AppController@register');
Route::post('/logout', 'AppController@logout');

/**
* User Routes
*/

