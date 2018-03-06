<?php

	namespace Auth\Controllers;

	class Web extends \Axe\Controller {

		public function authenticate($csrf_value , $username , $password , $redirect_target = null) {

			if ( \Axe\CSRF::verify_token($csrf_value , 'login-form') === false ) {
				throw new \Exception('CSRF validation error');
			}

			$are_login_credentials_correct = \Auth::authenticate_creds($username , $password);

			if ( $are_login_credentials_correct ) {

				// regenerate CSRF token
				\Axe\CSRF::generate_new_token();

				// redirect or not
				if ( $redirect_target ) {
					header('Location:' . $redirect_target);
				} else {
					echo 1;
				}

			}

		}

		public function logout() {

			// logout user
			\Auth::logout();

			// regenerate CSRF token
			\Axe\CSRF::generate_new_token();

			// redirect
			header('Location:/');
		}

		public function register($csrf_value , $username , $password) {
			if ( \Axe\CSRF::verify_token($csrf_value , 'signup-form') === false ) {
				throw new \Exception('CSRF validation error');
			}

			// regenerate CSRF token
			\Axe\CSRF::generate_new_token();

			// create user
			\Auth\User::create_new(array(
				"username" => $username ,
				"password" => $password
			));
		}

	}