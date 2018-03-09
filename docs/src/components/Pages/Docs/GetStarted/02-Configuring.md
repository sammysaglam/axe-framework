# Configuration
Your site configuration will be in:
```bash no-line-numbers
application/config/config.php
```

## Not Required
By default, there is no need for any configuration. If the `config.php` is not found or is completely blank, the framework will still work — this was
done in case the framework is to be used simply as a library, or without MVC structure.

## Creating Your Own Configuration Values
Add any configuration to the `$config` variable in `application/config/config.php`
```php
$config["your_custom_config"] = "23547uhgf349";
$config["some_random_value"] = 2345345;
$config["an_object"] = (object) [
	"value" => "hello world!"
];
```

## Accessing Configuration
Access any configuration value from `$GLOBALS['axe_config']`
```php
$GLOBALS['axe_config'] -> your_custom_config // = "23547uhgf349"
```

## Default Values Explained
```php
// General
$config["dev_mode"] = false;

// CSRF - see docs: Security/CSRF
$config['csrf_history_max_tokens'] = 15;
$config['single_use_tokens']       = false;
```

### General
> `$config["dev_mode"] = false`
> 
> - shows errors
> - sets `DEV_MODE` constant (bool)
> - allows global function `html_dump()` output

### CSRF
> `$config['csrf_history_max_tokens'] = 15`
> 
> `$config['single_use_tokens'] = false`
>
> - See docs: Security/CSRF