# Configuration
Your site configuration will be in:
```bash no-line-numbers
application/config/config.php
```

## Not Required
By default, there is no need for any configuration. If the `config.php` is not found or is completely blank, the framework will still work — this was
done in case the framework is to be used simply as a library, or without MVC structure.

## Default Values
```php
// General
$config["dev_mode"] = false;

// CSRF - see docs: Security/CSRF
$config['csrf_history_max_tokens'] = 15;
$config['single_use_tokens']       = false;
```