<?php

	namespace Website\Controllers;

	use Axe\Controller;

	class ReactRenderer extends Controller {

		private $rjs;

		public function load_bundle($bundle_path) {

			// paths
			$react_php_path = __DIR__ . '/../libs/react-php-v8js/ReactJS.php';

			// react-php-v8js include
			require_once($react_php_path);

			// generate server-side markup
			$this->rjs = new \ReactJS('console.log = function() {};' . file_get_contents($bundle_path) , '');

			return $this;
		}

		public function generate_markup($component , $props = array()) {

			$rjs = $this->rjs;

			$rjs->setComponent($component , $props);

			return $rjs->getMarkup();
		}

	}