<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Hash;
use App\User;
use Illuminate\Http\Request;
use Validator;
use Uuid;

class AppController extends Controller
{
    public function __construct() {
      
    }
    
    public function application_index() {
      return view('index', [
        'test' => 'test'
      ]);
    }
    
    public function user_information(Request $request) {
      if ($request->session()->has('user')) {
        $user = User::find($request->session()->get('user'));
        return response()->json($user->toJson());
      } else {
        return response()->json([
          'error' => 'requires login'
        ], 401);
      }
    }
    
    public function login(Request $request) {
      $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required'
      ]);
      
      if ($validator->fails()) {
        return response()->json([
          'errors' => $validator->errors()
        ], 400);
      }
      
      $user = User::where('email', '=', $request->input('email'))
        ->first();
      
      if ($user !== null && Hash::check($request->input('password'), $user->password)) {
        $request->session()->put('user', $user->id);
        return response()->json([
          'status' => 'ok',
          'user' => $user->toJson()
        ]);
      } else {
        return response()->json([
          'errors' => ['invalid email password combination']
        ], 400);
      }
    }
    
    public function logout(Request $request) {
      $request->session()->forget('user');
      return response()->json([
        'status' => 'ok'
      ]);
    }
    
    public function register(Request $request) {
      $validator = Validator::make($request->all(), [
        'email' => 'required|email|max:255|unique:users',
        'password' => 'required',
        'firstname' => 'required',
        'lastname' => 'required'
      ]);
      
      if ($validator->fails()) {
        return response()->json(array(
          'errors' => $validator->errors()
        ), 400);
      }
      
      $new_user = User::create(array(
        'uuid' => Uuid::generate(4), // version 4, truly random uuid
        'email' => $request->input('email'),
        'password' => Hash::make($request->input('password')),
        'firstname' => $request->input('firstname'),
        'lastname' => $request->input('lastname')
      ));
      
      return response()->json([
        'status' => 'ok',
        'user' => $new_user->toJson()
      ]);
    }
}