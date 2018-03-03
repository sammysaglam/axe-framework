# Installation

> Requirements:
>  - PHP >= 7.1
>  - PDO PHP Extension
>  - V8JS Extension

Download & place the "axe-framework" folder anywhere, and
include "axe-framework/load.php" file in your index.php:

```php
<?php
   
   require("C:/frameworks/php/axe-framework/load.php") ;
```

## Framework & Application Separation
Your application location can be completely separate from your axe-framework installation.
As well, multiple sites can use a single installation of axe-framework.
 
For example, the "axe-framework" location could be:

```bash no-line-numbers
C:\frameworks\php\axe-framework
```

while your sites using a single installation could be:
```bash no-line-numbers
D:\web\projects\my-project-1\index.php
D:\web\projects\my-project-2\index.php
D:\web\projects\some-other-unrelated-project\index.php
```