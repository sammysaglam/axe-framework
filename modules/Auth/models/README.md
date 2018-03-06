# User [extends ORM]

## Allowed ORM Fields:
```php
username
email
password_hash
salt
consecutive_invalid_logins
user_groups => array of(UserGroup)
```

## Methods:

> *bool* - `$user->is_groupmember_of($group)` ()

Returns `true` if the User is a member of the group, `false` otherwise.
```php
// Example 1:
// search using group id
$group_id = 235;
$user->is_groupmember_of($group_id);


// Example 2:
// search using group name
$group_name = "admin" ;
$user->is_groupmember_of($group_name);


// Example 3:
// search using UserGroup object
$group = \UserGroup::search([
	"where" => [
		"sql" => "name = ?" ,
		"params" => ["admin"]
	]
]);
$user->is_groupmember_of($group);
```

---------------------------------

> *array(User)* - `User::search(...)`

Returns an array of `User` objects from database.
```php
User::search([
    "where" => [
        "sql" => "id = ? OR email LIKE '%@jd.com%' ,
        "params" => array(234)
    ] ,
    "fields" => [
        "username" ,
        "email" ,
        "password_hash" ,
        "salt" ,
        "consecutive_invalid_logins" ,
        "user_groups"
    ]
])
```

# UserGroup [extends ORM]

## Allowed ORM Fields:
```php
name
```

## Methods:
> *array(UserGroup)* - `UserGroup::search(...)`

Returns an array of `UserGroup` objects from database.
```php
User::search([
    "where" => [
        "sql" => "id = ? OR name LIKE '%cool_people%' ,
        "params" => array(234)
    ] ,
    "fields" => [
        "name"
    ]
])
```
			
# Auth

## Methods:

> *bool* - `Auth::authenticate_creds($username,$password)`

Returns `true` if the supplied credentials are correct, `false` otherwise.
If credentials are correct, it flags the current user client session as
logged in, otherwise logs the user out.
```php
$username = 'admin';
$password = '123456';

$login_successful = Auth::authenticate_creds($username,$password);
```

---------------------------------

> *User* - `Auth::get_logged_in_user($fields)`

Returns the logged-in `User`, or `false` if not logged in.

```php
$user = Auth::get_logged_in_user([
    "username",
    "email",
    "user_groups"
]);
```

---------------------------------

> *User* - `Auth::logout()

Logs-out the current user client session.

```php
Auth::logout();
```