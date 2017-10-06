<?php

	namespace Auth\Controllers;

	use \Auth\User;
	use \Axe\Controller;
	use \Axe\CSRF;

	class Web extends Controller {

		public function login_form() {
			return $this->get_view('login_form');
		}

		public function signup_form() {
			return $this->get_view('signup_form');
		}

		public function logout_button() {
			return $this->get_view('logout_button');
		}

		public function authenticate($csrf_value , $username , $password , $redirect_target = null) {

			if ( CSRF::verify_token($csrf_value , 'login-form') === false ) {
				throw new \Exception('CSRF validation error');
			}
			$is_correct = \Auth::authenticate_creds($username , $password);

			if ( $is_correct ) {
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
			if ( CSRF::verify_token($csrf_value , 'signup-form') === false ) {
				throw new \Exception('CSRF validation error');
			}

			User::create_new(array(
				"username" => $username ,
				"password" => $password
			));
		}

	}