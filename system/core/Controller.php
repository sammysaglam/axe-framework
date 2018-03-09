<?php

	namespace Axe;

	use Cake\Utility\Inflector;

	class Controller {

		final public function __construct() { }

		public function _construct() { }

		private function handle_db_migrations() {

			// first, check if migration applies to this module (in which a folder must exist)
			if ( !file_exists($this->controller_info->migrations_path) ) {
				return false;
			}

			// current migrations info
			$current_migration_file = $this->controller_info->migrations_path . DIRECTORY_SEPARATOR . 'current-migration.json';

			// get current migration version
			if ( file_exists($current_migration_file) ) {
				$current_migration_info = json_decode(file_get_contents($current_migration_file));
				$current_version = $current_migration_info->current_version;

			} else {

				$current_version = 0;

				// migration not found so create new
				$current_migration_info = (object)array(
					"current_version" => 0
				);
			}

			// get all migration files above the current version
			$migrations_to_run = array();
			foreach ( glob($this->controller_info->migrations_path . DIRECTORY_SEPARATOR . "*.php") as $filename ) {

				// match the required filename format for a migration
				if ( preg_match('@.+(?:' . preg_quote(DIRECTORY_SEPARATOR) . '|' . preg_quote('/') . '|' . preg_quote('\\') . ')master-([0-9]+)\.php@' , $filename , $matches) ) {

					// check if the version number is above current
					if ( ($version = floatval($matches[1])) > $current_migration_info->current_version ) {
						$migrations_to_run[] = array(
							"filename" => $filename ,
							"version"  => $version
						);
					}
				}
			}

			// run required migrations
			foreach ( $migrations_to_run as $migration ) {
				$class = file_get_php_classes($migration['filename'])[0];
				include $migration['filename'];

				$fully_qualified_migration_classname = '\\' . $this->controller_info->migrations_namespace . '\\' . $class;
				$fully_qualified_migration_classname::up();

				// save migration info
				$current_migration_info->current_version = $migration['version'];
				file_put_contents($current_migration_file , json_encode($current_migration_info));
			}

		}

		public function run($method , $args = array()) {
			echo call_user_func_array(array($this , $method) , $args);
		}

		protected function get_view($view_name , $params = null) {

			$view_path = $this->controller_info->module_path . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . $view_name . '.php';

			return new View($view_name , $view_path , $this->controller_info->controller_raw_name , $params);

		}

		public function get_js_path($filename) {
			return '/js/' . $this->controller_info->controller_raw_name . '/' . $filename;
		}

		public function get_css_path($filename) {
			return '/css/' . $this->controller_info->controller_raw_name . '/' . $filename;
		}

		public function get_img_path($filename) {
			return '/img/' . $this->controller_info->controller_raw_name . '/' . $filename;
		}

		public function get_font_path($filename) {
			return '/fonts/' . $this->controller_info->controller_raw_name . '/' . $filename;
		}

		public static function get($raw_name) {

			if ( isset($GLOBALS['cache']['controllers'][$raw_name]) ) {
				return $GLOBALS['cache']['controllers'][$raw_name];
			}

			if ( isset($_SERVER) ) {

				// load controller file
				$controller_info = self::raw_name_to_controller_data($raw_name);
				require_once($controller_info->controller_filepath);

				// return controller
				$controller_class_name = $controller_info->fully_qual_class_name;
				try {
					$new_controller = new $controller_class_name();

				} catch( \Exception $e ) {
					?>
					<h1>Axe PHP Framework</h1>
					<h2>Controller load Error!</h2>
					<div>
						Unable to find class "<?php echo $controller_class_name; ?>"
					</div>
					<h2>Hint:</h2>
					<div>
						Controller file was found @ "<?php echo $controller_info->controller_filepath; ?>"
					</div>
					<h3>is it possible you forgot to define the namespace in controller file as "<?php echo $controller_info->controller_namespace; ?>"</h3>
					<?php
					exit();
				}

				// controller info
				$new_controller->controller_info = $controller_info;

				// handle migrations
				if ( DEV_MODE ) {
					$new_controller->handle_db_migrations();
				}

				// run 2nd construction function
				$new_controller->_construct();

				// save to cache
				$GLOBALS['cache']['controllers'][$raw_name] = $new_controller;

				return $new_controller;
			}

		}

		final public function __call($name , $arguments) {
			$this->not_found($name , $arguments);
		}

		public function not_found() {
			self::get('mod-website/errors')->run('error_404');
		}

		private static function raw_name_to_controller_data($raw_name) {

			$raw_name = str_replace('\\' , '/' , $raw_name);
			$raw_name = trim($raw_name , '/');
			$uri_parts = explode('/' , $raw_name);
			$controller_name = end($uri_parts);
			$controller_name = Inflector::camelize((substr($controller_name , 0 , 4) == 'mod-') ? substr($controller_name , 4) : str_replace('-','_',
				$controller_name));

			// get controller's dir path & namespace
			$controller_path = '';
			$controller_namespace = '';
			$first_iteration = true;
			foreach ( $uri_parts as $part ) {

				if ( $first_iteration ) {
					if ( substr($part , 0 , 4) != 'mod-' ) {
						throw new \Exception(
							'"' .
							$raw_name .
							'" => please append "mod-" to beginning of Controller call -> i.e.' .
							"\n" .
							'Axe\Controller::get("' .
							$raw_name .
							'") -> must become: ' .
							"\n" .
							'Axe\Controller::get("mod-' .
							$raw_name .
							'")'
						);
					}
					$first_iteration = false;
					$prev_was_module = true;
				}

				if ( substr($part , 0 , 4) == 'mod-' ) {
					if ( !empty($prev_was_module) ) {

						$module_name = Inflector::camelize(
							str_replace(
								'-' ,
								'_' ,
								(substr($part , 0 , 4) == 'mod-') ?
									substr($part , 4)
									:
									$part
							)
						);

						$controller_path .= 'modules' . DIRECTORY_SEPARATOR . Inflector::camelize($module_name) . DIRECTORY_SEPARATOR;
						$controller_namespace .= $module_name . '\\';
						$prev_was_module = true;

					} else {
						throw new \Exception(
							'Modules can only be children of other modules!' .
							"\n" .
							'<span style="font-size:16px ; font-weight:normal ;">"<u>' .
							$raw_name .
							'</u>" is not a valid controller path</span>'
						);
					}
				} else {
					if ( !empty($prev_was_module) ) {
						$controller_path .= 'controllers' . DIRECTORY_SEPARATOR;
					}
					$controller_path .= Inflector::camelize(str_replace('-','_',$part)) . DIRECTORY_SEPARATOR;
					$prev_was_module = false;
				}
			}
			$controller_path = rtrim($controller_path , DIRECTORY_SEPARATOR);
			$migrations_namespace = trim($controller_namespace , '\\') . '\\' . 'Migrations';
			$controller_namespace = trim($controller_namespace , '\\') . '\\' . 'Controllers';

			// check if modules file exists, or else take the "__Main.php" in the folder
			if ( file_exists(
				$filepath =
					APPLICATION_PATH .
					$controller_path .
					'.php'
			)
			) {

			} else if ( substr(end($uri_parts) , 0 , 4) == 'mod-' && file_exists(
					$filepath =
						APPLICATION_PATH .
						$controller_path .
						DIRECTORY_SEPARATOR .
						'controllers' .
						DIRECTORY_SEPARATOR .
						'__Main.php'
				)
			) {
				$controller_name = '__Main';

			} else if ( file_exists($filepath = FRAMEWORK_PATH . $controller_path . '.php') ) {

			} else if ( substr(end($uri_parts) , 0 , 4) == 'mod-' && file_exists(
					$filepath =
						FRAMEWORK_PATH .
						$controller_path .
						DIRECTORY_SEPARATOR .
						'controllers' .
						DIRECTORY_SEPARATOR .
						'__Main.php'
				)
			) {
				$controller_name = '__Main';

			} else {
				throw new \Exception('Controller\'s file "' . $filepath . '" does not exist');
			}

			// determine module path
			$last_modules_pos = strrpos($filepath , 'modules')+8;
			$module_end_pos = strpos($filepath , DIRECTORY_SEPARATOR , $last_modules_pos);
			$module_path = substr($filepath , 0 , $module_end_pos);

			// return controller info
			return (object)array(
				"controller_raw_name"   => $raw_name ,
				"controller_name"       => $controller_name ,
				"controller_namespace"  => $controller_namespace ,
				"migrations_namespace"  => $migrations_namespace ,
				"fully_qual_class_name" => '\\' . $controller_namespace . '\\' . $controller_name ,
				"controller_filepath"   => $filepath ,
				"migrations_path"       => $module_path . DIRECTORY_SEPARATOR . 'migrations' ,
				"module_path"           => $module_path
			);
		}

	}