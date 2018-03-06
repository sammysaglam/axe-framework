<?php

	namespace Auth\Controllers;

	class Web extends \Axe\Controller {

		public function authenticate($csrf_value , $username , $password , $redirect_target = null) {

			if ( \Axe\CSRF::verify_token($csrf_value , 'login-form') === false ) {
				throw new \Exception('CSRF validation error');
			}

			$are_login_credentials_correct = \Auth::authenticate_creds($username , $password);

			if ( $are_login_credentials_correct ) {
				if ( $redirect_target ) {
					header('Location:' . $redirect_target);
				} else {
					echo 1;
				}

			}

		}

		public function logout() {
			\Auth::logout();
			header('Location:/');
		}

		public function register($csrf_value , $username , $password) {
			if ( \Axe\CSRF::verify_token($csrf_value , 'signup-form') === false ) {
				throw new \Exception('CSRF validation error');
			}

			\Auth\User::create_new(array(
				"username" => $username ,
				"password" => $password
			));
		}

	}