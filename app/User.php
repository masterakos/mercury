<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model {

  protected $table = 'users';

  protected $fillable = [
    'id',
    'uuid',
    'email',
    'firstname',
    'lastname',
    'password',
  ];
  
  protected $hidden = [
    'id',
    'password'
  ];
}
