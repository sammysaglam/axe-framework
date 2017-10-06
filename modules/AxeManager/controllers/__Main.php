<?php

	namespace AxeManager\Controllers;

	use Axe\Controller;
	use Website\HtmlHead;

	class __Main extends Controller {

		public function _construct() {
			if ( !DEV_MODE ) exit('Dev Mode must be active') ;
		}

		public function index() {

			$website_controller = Controller::get('mod-website');

			$html_head = new HtmlHead();
			$html_head->add_script($website_controller->get_js_path('libs/angular_bundle.js'));

			return $this->get_view('angular_app',array(
				"html_head" => $html_head
			));
		}

	}