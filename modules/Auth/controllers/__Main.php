<?php

	namespace Auth\Controllers;

	use \Axe\Controller;

	class __Main extends Controller {

		public function get_logged_in_user($fields = null) {
			return \Auth::get_logged_in_user($fields);
		}
	}