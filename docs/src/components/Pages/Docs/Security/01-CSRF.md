# CSRF

## Config
In your `application/config/config.php`:
```php
// default values:
$config['csrf_history_max_tokens'] = 15;
$config['single_use_tokens']       = false;
```

### csrf_history_max_tokens: (number)
If — for extra-security — you wish to generate a new CSRF token using `single_use_tokens` explained
below, but the client wants to open multiple tabs, actions they take in one tab will
force-generate a new CSRF, rendering the CSRF tokens in his/her other tabs invalid — this
causes a lot of false-positive security errors and a poor user experience. So,
this `csrf_history_max_tokens` setting allows you to define how many historical
CSRF tokens will still be valid.

### single_use_tokens: (bool)
This will force-regenerate a new CSRF token on each `CSRF::verify_token(...)`. As explained above
in "csrf_history_max_tokens", even though this provides an extra level of security, this should be used
with caution to avoid a poor user-experience, and with the `csrf_history_max_tokens` config explained above.

## API

> *void* - `CSRF::generate_new_token()`

Generate a new CSRF token for the user session.

------------------

> *string* - `CSRF::get_form_value($secret_hash_key = 'default')`

Retrieve the valid CSRF token which you should inject into your forms & ajax requests.

Optionally, a `$secret_hash_key` can be provided, which ideally should be unique per
form. For example: a login form can use `"login-form"` as it's secret hash key. This `$secret_hash_key` option
provides an extra level of security by allowing each CSRF token to have infinite variations.

------------------

> *bool* - `CSRF::verify_token($form_value , $secret_hash_key = 'default')`

Verify if the token is valid. Returns `true` if is valid, `false` otherwise. Parameter `$form_value` is
the value generated in `CSRF::get_form_value` above.

If `$config['single_use_tokens']` is `true`, then a new token will be generated after
the token is validated (see "Config" title above). 

## Basic Example

### Login authentication controller

#### router:
```php
// authentication module
Route::override(
    '^auth/authenticate' ,
    null ,
    function() {
        \Axe\Controller::get('mod-auth/web')->run('authenticate' , $_POST);
    }
);
```

#### controller
```php
// params below are handled by router above (POST variables)
public function authenticate(
    $csrf_value ,
    $username ,
    $password ,
    $redirect_target = null
) {

    // verify CSRF token, and if not, throw exception
    if ( \Axe\CSRF::verify_token($csrf_value , 'login-form') === false ) {
        throw new \Exception('CSRF validation error');
    }

    // authenticate user client
    $are_login_credentials_correct = \Auth::authenticate_creds($username , $password);
   
    // return result
    return $are_login_credentials_correct ? "success" : "failed";
}
```