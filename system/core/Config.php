<?php

	namespace Axe;

	class Config {

		private $built = false;

		public function __construct($config_array) {

			foreach ( $config_array as $key => $val ) {
				$this->$key = $val;
			}

			$this->built = true;
		}

		public function &__get($key) {
			$val = isset_or($this->$key , null);

			return $val;
		}

		public function __set($key , $val) {
			if ( !$this->built ) {
				$this->$key = $val;
			} else {
				throw new \Exception('Cannot change config at runtime!');
			}
		}

	}