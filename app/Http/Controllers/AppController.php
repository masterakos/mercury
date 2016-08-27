<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class AppController extends Controller
{
    public function __construct() {
      
    }
    
    public function application_index() {
      return view('index', [
        'test' => 'test'
      ]);
    }
}