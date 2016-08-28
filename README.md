# Mercury

Full featured Open Source shop built with [Laravel](https://laravel.com/) and [Angular](https://angularjs.org/).

### [Live Demo](http://95.85.1.105/mercury)

#### Please Note
This is a very work in progress so there is a long long road before it's ready for production.

## SETUP
Clone project
````bash
$ git clone git@github.com:masterakos/mercury.git
````

Run composer install
````bash
$ composer install
````

Run bower install
````bash
$ bower install
````

Edit a copy of `.env.example`
````bash
$ cp .env.example .env
$ sudo vim .env # and edit your database settings at least
````

Generate an application key
````bash
$ php artisan key:generate
````

And you're done! You're application is served from the root folder.