<?php

	namespace Axe;

	class View {

		private $view_name;
		private $view_path;
		private $params;

		const REMOVE    = 0;
		const OVERWRITE = 1;

		public function __construct($view_name , $view_path , $controller_raw_name , $params = null) {
			$this->view_name = $view_name;
			$this->view_path = $view_path;
			$this->controller_raw_name = $controller_raw_name ;
			$this->params = !empty($params) ? $params : array();

			if ( !file_exists($this->view_path) ) {
				throw new \Exception('View "' . $view_name . '" could not be found @' . "\n" . $this->view_path);
			}
		}

		public function update_params($new_params , $method = self::OVERWRITE) {

			if ( $method == self::REMOVE ) {

				// replace existing params completely with new_params
				$this->params = $new_params;

			} else if ( $method == self::OVERWRITE ) {

				// if values exist on merge, then overwrite
				$this->params = array_replace_recursive($this->params , $new_params);

			} else {
				throw new \Exception('View::update_params error! Method param is illegal.');
			}

			// for chained commands
			return $this;
		}

		public function get_params() {
			return $this->params;
		}

		public function get_view_name() {
			return $this->view_name;
		}

		public function get_view_path() {
			return $this->view_path;
		}

		public function get_css_path($filename) {
			return '/css/' . $this->controller_raw_name . '/' . $filename ;
		}

		public function get_js_path($filename) {
			return '/js/' . $this->controller_raw_name . '/' . $filename ;
		}

		public function get_img_path($filename) {
			return '/img/' . $this->controller_raw_name . '/' . $filename ;
		}

		public function get_font_path($filename) {
			return '/fonts/' . $this->controller_raw_name . '/' . $filename ;
		}

		public function __toString() {
			ob_start();
			extract($this->params);
			require $this->view_path;

			return ob_get_clean();
		}

	}