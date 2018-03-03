# Creating Routes

## Routes file path
Axe will load the following file; all your routing configuration must be here. If the file does
not exist, the default routes will be created.
```bash no-line-numbers
YOUR_SITE_PATH/application/config/routes.php
```

## Adding routes
To add routes, always use `Route::override`

### Route::override
```php no-line-numbers
Route::override(
    $regex_pattern: array | string,
    null,
    $callback_function: function
)
```

#### example usage
```php
<?php

    $regex_pattern = '^docs\/routing\/([A-Za-z0-9]+)';

    Route::override($regex_pattern, null , function($uri_parts) {

        // remove first part of matches => "docs"
        array_shift($uri_parts);
        
        // get controller method => "routing"
        $controller_method = array_shift($uri_parts);
					
        // the following piece will run:
        // Module(Website) => Module(Docs) => method("routing")
        // -> method params: ($uri_parts)
        \Axe\Controller::get('mod-website/mod-docs')->run($controller_method , $uri_parts);
        
    });
```