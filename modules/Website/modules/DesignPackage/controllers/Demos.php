<?php

	namespace Website\DesignPackage\Controllers;

	use Axe\Controller;
	use Website\HtmlHead;

	class Demos extends Controller {

		private $html_head;

		public function _construct() {
			if ( !DEV_MODE ) {
				exit('DesignPackage demos are only available in Dev Mode');
			}

			// create html head model
			$this->html_head = new HtmlHead();

			// design package controller
			$design_package_controller = Controller::get('mod-website/mod-design-package');

			// add design package
			$this->html_head->add_stylesheet($design_package_controller->css_path());
		}

		public function index() {
			return $this->get_view("demos/demo_website" , array(
				"html_head" => $this->html_head ,
				"page"      => $this->get_view('demos/index')
			));
		}

		public function demo($demo_name) {
			return $this->get_view("demos/demo_website" , array(
				"html_head" => $this->html_head ,
				"page"      => $this->get_view('demos/' . $demo_name)
			));
		}

	}