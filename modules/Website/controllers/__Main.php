<?php

	namespace Website\Controllers;

	use \Axe\Controller;
	use Website\HtmlHead;

	class __Main extends Controller {

		private $html_head_model;
		private $html_head;
		private $html_close;
		private $header;
		private $website;

		public function _construct() {

			$this->js_bundle = Controller::get('mod-website/react-renderer')->load_bundle(FRAMEWORK_PATH . 'docs/build/bundle.js');

			$this->website = $this->get_view(
				'website'
			);

		}

		public function index($location) {

			$locationWithUnderscoresReplaced = str_replace('_' , '-' , $location);

			$this->website->update_params([
				"ssr" => $this->generate_website_ssr('/' . $locationWithUnderscoresReplaced)
			]);

			// return website
			return $this->website;
		}

		private function generate_website_ssr($location) {
			return $this->js_bundle->generate_markup(
				'Website' , [
					"location" => $location ,
					"context"  => (object)[]
				]
			);
		}
	}