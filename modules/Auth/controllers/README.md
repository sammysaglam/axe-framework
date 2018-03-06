# Main

## Get logged in user
The following will return the logged in `User`:

```php no-line-numbers
\Axe\Controller::get('mod-auth')->get_logged_in_user();
```

# Web

## Authenticate credentials
The following will verify the CSRF token, and then check the user credentials: if correct, it will
log the user in. Can also force a redirect using the `$redirect_target` parameter.

> Bound as default route: *yoursite.com/auth/authenticate/*

```php
\Axe\Controller::get('mod-auth/web')->authenticate(
    $csrf_value ,
    $username ,
    $password ,
    $redirect_target = null
);
```

## Logout
Will log the current user session out.

> Bound as default route: *yoursite.com/auth/logout/*

```php no-line-numbers
\Axe\Controller::get('mod-auth/web')->logout();
```

## Register
Will register a new user.

> Bound as default route: *yoursite.com/auth/register/*

```php
\Axe\Controller::get('mod-auth/web')->register(
    $csrf_value ,
    $username ,
    $password
);
```