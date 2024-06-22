# NOTAS DE LARAVEL - FAST CODING

## Autenticación de Usuarios


#### A partir de Laravel 6, generar archivos de la UI


Descargar paquetes
> composer require laravel/ui

Utilizar paquetes en proyecto
>php artisan ui vue --auth

Generará archivos en views/auth y rutas nuevas en routes/web.php.



Instalar paquetes restantes
> npm install && npm run dev


\
\
\
\
\
\ 

## Autenticación de Usuarios (PARA API)

### Laravel Sanctum (Configuration)

https://laravel.com/docs/11.x/sanctum#api-token-authentication




You may install Laravel Sanctum via the install:api Artisan command:
~~~
php artisan install:api
~~~

Next, if you plan to utilize Sanctum to authenticate an SPA, please refer to the SPA Authentication section of this documentation.

#### SPA Authentication

In order to authenticate, your SPA and API must share the same top-level domain. However, they may be placed on different subdomains. Additionally, you should ensure that you send the Accept: application/json header and either the Referer or Origin header with your request.

configure which domains your SPA will be making requests from. You may configure these domains using the stateful configuration option in your sanctum configuration file.


Next, you should instruct Laravel that incoming requests from your SPA can authenticate using Laravel's session cookies. 
This can be easily accomplished by invoking the statefulApi middleware method in your application's bootstrap/app.php file:

~~~
->withMiddleware(function (Middleware $middleware) {
    $middleware->statefulApi();
})
~~~

##### CORS and Cookies

You should publish the complete cors configuration file (config/cors.php) using the config:publish Artisan command:
~~~
php artisan config:publish cors
~~~

NOTA: Para producción asegurarse que la configuración de "config/cors.php" está correctamente. Permitiendo desde cualquier origen. Tener en cuenta que los endpoints van automáticamente precedidos por "/api".

Next, you should ensure that your application's CORS configuration is returning the Access-Control-Allow-Credentials header with a value of True. This may be accomplished by setting the supports_credentials option within your application's config/cors.php configuration file to true.

In addition, you should enable the withCredentials and withXSRFToken options on your application's global axios instance. Typically, this should be performed in your resources/js/bootstrap.js file. If you are not using Axios to make HTTP requests from your frontend, you should perform the equivalent configuration on your own HTTP client:

Nota: Lanzar headers withCredentials = true y withXSRFToken = true, en las peticiones desde el frontend (Angular).

~~~
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
~~~

Finally, you should ensure your application's session cookie domain configuration supports any subdomain of your root domain. You may accomplish this by prefixing the domain with a leading . within your application's config/session.php configuration file:

~~~
'domain' => '.domain.com',
~~~

### Laravel Sanctum (Authenticating)

##### CSRF Protection

To authenticate your SPA, your SPA's "login" page should first make a request to the /sanctum/csrf-cookie endpoint to initialize CSRF protection for the application:

~~~
axios.get('/sanctum/csrf-cookie').then(response => {
    // Login...
});
~~~

During this request, Laravel will set an XSRF-TOKEN cookie containing the current CSRF token. This token should then be passed in an X-XSRF-TOKEN header on subsequent requests, Angular HttpClient will do automatically for you.


##### Logging In

Once CSRF protection has been initialized, you should make a POST request to your Laravel application's /login route.

If the login request is successful, you will be authenticated and subsequent requests to your application's routes will automatically be authenticated via the session cookie that the Laravel application issued to your client.

Of course, if your user's session expires due to lack of activity, subsequent requests to the Laravel application may receive a 401 or 419 HTTP error response. In this case, you should redirect the user to your SPA's login page.


You are free to write your own /login endpoint; however, you should ensure that it authenticates the user using the standard, session based authentication services that Laravel provides (https://laravel.com/docs/11.x/authentication#authenticating-users).

~~~
<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
 
class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     */
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect()->intended('dashboard');
        }
 
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
}

Specifying Additional Conditions

if (Auth::attempt(['email' => $email, 'password' => $password, 'active' => 1])) {
    // Authentication was successful...
}
~~~


##### Protecting Routes

To protect routes so that all incoming requests must be authenticated, you should attach the sanctum authentication guard to your API routes within your routes/api.php file.

~~~
use Illuminate\Http\Request;
 
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
~~~

## Pues ya estaría MY FRIEND

\
\
\
\
\
\ 

## Obtención datos de BBDD

#### Configurar archivo .ENV


#### Utilizar el modelo para obtener datos con eloquent

~~~
//Recuperar todas las imágenes y mostrarlas
 
$images = Image::orderBy('created_at','DESC')->paginate(10);
~~~

~~~
//Recuperar imagen de un usuario en concreto
 
 $user_id = Auth::User()->id;
 $user = User::find($user_id); //User::where('email','asdasd@asdasd.com')->first()
 
 $images = User()->images;
~~~

Se pueden generar modelos/rutas/controlador para objetos tipo recursos con comando:

> php artisan make:controller PhotoController --model=Photo --resource


Ejemplo de un modelo:

~~~<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{

    // Table images
    protected $table = 'images';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'description', 'image_path'
    ];

    // Relation One To Many
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    // Relation One To Many
    public function likes()
    {
        return $this->hasMany('App\Like');
    }

    // Relation Many To One
    public function user()
    {
        return $this->belongsTo('App\User','user_id');
    }
}
~~~

## Inserción de datos de BBDD

~~~
    public function store(Request $request): RedirectResponse
    {
        // Validate the request...
 
        $flight = new Flight;
 
        $flight->name = $request->name;
 
        $flight->save();
 
        return redirect('/flights');
    }
~~~

## Generar migraciones

>php artisan migrate

>php artisan make:migration initial_migration