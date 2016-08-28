<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
  public function run() {
    DB::table('users')->insert([
      'uuid' => '1337',
      'email' => 'john_smith@gmail.com',
      'password' => '$2y$10$NJmV560MKgpZOE/HriAgQO/0CHuZXHTg6ZOkiqwYwu7isTtKMORD2', // hashed 'johnjohn'
      'firstname' => 'John',
      'lastname' => 'Smith'
    ]);
  }
}
