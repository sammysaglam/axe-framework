<?php

	$routes = array();

	class Route {

		public $uri_regex;
		public $http_vebs;
		public $override_function;

		public function __construct($uri_regex , $http_vebs , $override_function) {
			$this->uri_regex = $uri_regex;
			$this->http_vebs = $http_vebs;

			if ( !$override_function ) {
				$this->override_function = function() { };
			} else {
				$this->override_function = $override_function;
			}
		}

		public static function override($uri_regex , $http_verbs = "all" , $override_function = null) {

			global $routes;

			$routes[self::uri_regex_rules_processor($uri_regex)] = new Route($uri_regex , $http_verbs , $override_function);

		}

		public static function create_default_routes() {

			// CSS stylesheets
			Route::override(
				[
					'^css\/' ,
					'^js\/' ,
					'^img\/' ,
					'^fonts\/'
				] ,
				'get' ,
				function($parts) {
					array_shift($parts);
					\Axe\Controller::get('mod-website/assets')->run('echo_asset' , $parts);
				}
			);

			// axe manager module
			Route::override(
				'^axe_manager' ,
				'get' ,
				function($uri_parts) {

					$module_name = array_shift($uri_parts);
					\Axe\Controller::get('mod-axe-manager')->run(($method = array_shift($uri_parts)) ? $method : 'index' , array_merge($uri_parts , $_POST));
				}
			);

			// DesignPackage demos
			Route::override(
				'^design_package' ,
				'get' ,
				function($uri_parts) {

					$module_name = array_shift($uri_parts);
					\Axe\Controller::get('mod-website/mod-design-package/demos')->run(($demo = array_shift($uri_parts)) ? 'demo' : 'index' , array_merge(array($demo) , $uri_parts , $_POST));
				}
			);

			// authentication module
			Route::override(
				'^auth' ,
				'get' ,
				function($uri_parts) {

					$module_name = array_shift($uri_parts);
					$method = array_shift($uri_parts);
					$method_args = array_merge($uri_parts , $_POST);

					\Axe\Controller::get('mod-auth/web')->run($method , $method_args);
				}
			);

			// editable content module
			Route::override(
				'^save_content' ,
				'get' ,
				function($uri_parts) {

					$method = array_shift($uri_parts);
					$id = array_shift($uri_parts);
					$method_args = array_merge(array($id) , $_POST);

					\Axe\Controller::get('mod-website/mod-editable-content')->run($method , $method_args);
				}
			);

			// website
			Route::override(
				'.*' ,
				'get' ,
				function($uri_parts) {
					\Axe\Controller::get('mod-' . $GLOBALS['axe_config']->default_module)->run(($method = array_shift($uri_parts)) ? $method : 'index' , $uri_parts);
				}
			);
		}

		public static function run_routes() {

			global $routes;

			if ( $routes ) {
				foreach ( $routes as $route ) {
					preg_match('@' . self::uri_regex_rules_processor($route->uri_regex) . '@' , CURRENT_URI , $matches);
					if ( !empty($matches) ) {

						// get URI parts and get the query string as well
						$uri_parts = explode('/' , CURRENT_URI);
						$get_args = $_SERVER['QUERY_STRING'];

						// run override function
						($route->override_function)($uri_parts , CURRENT_URI , $get_args);

						// return
						return true;
					}
				}
			}

			return false;
		}

		private static function uri_regex_rules_processor($regex) {
			return is_array($regex) ? implode('|' , $regex) : $regex;
		}

	}