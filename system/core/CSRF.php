<?php

	namespace Axe;

	class CSRF {

		public static function generate_new_token() {

			// get max
			$csrf_history_max_tokens = isset_or($GLOBALS['axe_config']->csrf_history_max_tokens , 15);

			// genereate new token and add to the end of session array
			$_SESSION['CSRF_tokens'][] = bin2hex(random_bytes(128));

			// make sure there are no more historical CSRF tokens than allowed, if there are, remove them from beginning of array
			while ( count($_SESSION['CSRF_tokens']) > $csrf_history_max_tokens ) {
				array_shift($_SESSION['CSRF_tokens']);
			}

			// reindex array
			$_SESSION['CSRF_tokens'] = array_values($_SESSION['CSRF_tokens']);
		}

		// index = 0 --> most recent token
		private static function get_token($index = 0) {

			// check if token exists beforehand
			if ( !isset($_SESSION['CSRF_tokens']) ) {
				self::generate_new_token();
			}

			// since the most recent is at the end of the array, reverse the index
			$real_index = count($_SESSION['CSRF_tokens'])-1-$index;

			// make sure the real_index doesnt fall below 0
			if ( $real_index < 0 ) {
				return false;
			}

			return $_SESSION['CSRF_tokens'][$real_index];
		}

		public static function get_form_value($unique_secret_form_name = 'default-form-name' , $echo_form_input = true) {

			// get token
			$token = self::get_token();

			// create a per-form value
			$form_value = hash_hmac('sha512' , $unique_secret_form_name , $token);

			if ( $echo_form_input ) {
				echo '<input type="hidden" name="csrf_value" value="' . $form_value . '" />';
			} else {
				return $form_value;
			}
		}

		public static function verify_token($form_value , $unique_secret_form_name = 'default-form-name') {

			$index = 0;
			$result = false;
			while (

				// get next token (the obsolete one), if prev token in loop failed
				($token = self::get_token($index++))

				&&

				// check if csrf value submitted by form, matches the token hashed with the unique_form_name
				!($result = hash_equals(
					$form_value ,
					hash_hmac('sha512' , $unique_secret_form_name , $token)
				))

			) {
			}

			// if tokens are single-use regenerate CSRF token on each verification
			$single_use_tokens = isset_or($GLOBALS['axe_config']->single_use_tokens , false);
			if ( $single_use_tokens ) {
				self::generate_new_token();
			}

			return $result;
		}

	}