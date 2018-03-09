<?php

	class Auth {

		public static function authenticate_creds($username , $password) {

			// get salt from the database for password hashing
			$user_search = \Auth\User::search(
				[
					"where"  => [
						"sql"    => 'username = ?' ,
						"params" => [$username]
					] ,
					"fields" => [
						"username" ,
						"salt" ,
						"password_hash" ,
						"consecutive_invalid_logins"
					]
				]
			);

			// username is valid
			if ( count($user_search) === 1 ) {

				// get user
				$user = array_pop($user_search);

				// hash user password
				$password_hashed = hash_pbkdf2('sha512' , $password , $user->salt , 250);

				// password hashes match
				if ( hash_equals($user->password_hash , $password_hashed) ) {

					// check if user has incorrectly logged in too many times
					$max_consecutive_invalid_logins = isset_or($GLOBALS['axe_config']->max_consecutive_invalid_logins , 15);
					if ( $user->consecutive_invalid_logins >= $max_consecutive_invalid_logins ) {
						$user->inc_consecutive_invalid_logins();
						self::logout();

						return false;
					}

					// since login is succesfull -> reset "consecutive_invalid_logins" to 0
					$user->reset_consecutive_invalid_logins();

					// regenerate session id on login
					session_regenerate_id(true);

					// save session
					$_SESSION['user_id'] = $user->id;
					$_SESSION['login_string'] = hash_pbkdf2('sha512' , $password_hashed . $_SESSION['user_agent'] , $user->salt , 20);

					return true;

				} else {

					// password hashes do not match -> i.e. supplied password is incorrect
					$user->inc_consecutive_invalid_logins();
					self::logout();

					return false;
				}

			} else {

				// username is not valid
				return false;

			}

		}

		public static function get_logged_in_user($fields = null) {

			// check if session data exists
			if ( !isset($_SESSION['user_id']) ) {
				return false;
			}

			// get salt from the database for password hashing
			$user_search = \Auth\User::search(
				[
					"where"  => [
						"sql"    => 'id = ?' ,
						"params" => [$_SESSION['user_id']]
					] ,
					"fields" => [
						"username" ,
						"salt" ,
						"password_hash"
					]
				]
			);

			// username is valid
			if ( count($user_search) === 1 ) {

				// get user
				$user = reset($user_search);

				// password hashes match
				if ( hash_equals($_SESSION['login_string'] , hash_pbkdf2('sha512' , $user->password_hash . $_SESSION['user_agent'] , $user->salt , 20)) ) {
					return \Auth\User::search(
						[
							"where"  => [
								"sql"    => 'id = ?' ,
								"params" => [$user->id]
							] ,
							"fields" => isset_or($fields , [
								"username"
							])
						]
					)[0];

				} else {

					// password hashes do not match -> i.e. supplied password is incorrect
					self::logout();

					return false;
				}

			} else {

				// username is not valid
				return false;

			}

		}

		public static function logout() {
			unset($_SESSION['user_id']);
			unset($_SESSION['login_string']);
		}

	}