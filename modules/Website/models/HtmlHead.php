<?php

	namespace Website;

	class HtmlHead {

		private $title       = '';
		private $description = array();
		private $keywords    = array();
		private $stylesheets = array();
		private $scripts     = array();

		public function set_title($new_title) {
			$this->title = $new_title;
		}

		public function get_title() {
			return $this->title;
		}

		public function set_description($description) {
			$this->description = $description;
		}

		public function get_description() {
			return $this->description;
		}

		public function add_keywords($keyword) {
			if ( is_array($keyword) ) {
				$this->keywords = array_merge($this->keywords , $keyword);

			} else {
				$this->keywords[] = $keyword;
			}
		}

		public function get_keywords() {
			return array_unique($this->keywords);
		}

		public function add_stylesheet($stylesheet) {
			$this->stylesheets[] = $stylesheet;
		}

		public function get_stylesheets() {
			return $this->stylesheets;
		}

		public function add_script($script) {
			$this->scripts[] = $script;
		}

		public function get_scripts() {
			return $this->scripts;
		}

	}