# Axe default routes:

## Route::create_default_routes
This will create the default routes for Axe Framework. This is purely optional, and is a helper
to get setup faster:
```php
<?php

    Route::create_default_routes();
```

### The default routes include:

#### - Loading assets from view folders:

> url("**/js/mod-website/script.js**")
> converts to:
> file("**application/modules/Website/views/script.js**")

> url("**/img/mod-website/mod-docs/images/img.png**")
> converts to:
> file("**application/modules/Website/modules/Docs/views/images/img.png**")

> url("**/css/mod-website/styles/style.css**")
> converts to:
> file("**application/modules/Website/views/styles/style.css**")

> url("**/fonts/mod-website/font.ttf**")
> converts to:
> file("**application/modules/Website/views/font.ttf**")

#### - Loading default module defined in `application/config/config.js`

`config.js:`
```php
$config["default_module"] = 'Website';
```

This above will run the Website module without any additional router configuration:
```php
// www.your-site.com
\Axe\Controller::get('mod-website')->run('index');

// www.your-site.com/docs
\Axe\Controller::get('mod-website')->run('docs');

// www.your-site.com/docs/apple/page-1
\Axe\Controller::get('mod-website')->run('docs',[
    "apple",
    "page-1"
]);
```