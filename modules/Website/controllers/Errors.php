<?php

	namespace Website\Controllers;

	use Axe\Controller;

	class Errors extends Controller {

		public function error_404() {
			header("HTTP/1.0 404 Not Found");

			return $this->get_view('error_pages/404');
		}

		public function error_405() {
			header("HTTP/1.0 405 Method Not Allowed");

			return $this->get_view('error_pages/405');
		}

	}