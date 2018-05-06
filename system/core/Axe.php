<?php

	/**
	 * Axe Framework
	 *
	 * An open source website development framework for PHP
	 *
	 * This content is released under the MIT License (MIT)
	 *
	 * Copyright (c) 2017, Sammy Saglam
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 *
	 * @author       Sammy Saglam
	 * @copyright    Copyright (c) 2017, Sammy Saglam (https://www.saglam.tk/)
	 * @license      http://opensource.org/licenses/MIT	MIT License
	 * @link         https://www.axe.cc
	 * @since        Version 0.1
	 * @filesource
	 */

	Axe::init();

	class Axe {

		public static function init() {

			self::start_session();
			self::define_constants();
			self::load_required_files();
			self::load_config();
			self::determine_dev_mode();
			self::setup_libs_autoload();
			self::define_autloader();
			self::set_exception_handler();
			self::load_db();
			self::load_routes();

		}

		private static function start_session() {

			session_name('sid');
			session_set_cookie_params(
				0 ,
				'/' ,
				null ,
				!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ,
				true
			);

			session_start(
				[
					"sid_length" => 128
				]
			);

			// some additional security by checking that the user agent hasn't changed
			if ( isset($_SESSION['user_agent']) && $_SESSION['user_agent'] != md5($_SERVER['HTTP_USER_AGENT']) ) {
				session_destroy();
				throw new Exception('Session error!');
			}
			$_SESSION['user_agent'] = md5($_SERVER['HTTP_USER_AGENT']);

		}

		private static function define_constants() {

			// path constants
			define(
				"FRAMEWORK_PATH" ,
				realpath(__DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . '..') . DIRECTORY_SEPARATOR
			);
			define(
				"WWW_PATH" ,
				$_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR
			);
			define(
				"APPLICATION_PATH" ,
				realpath(WWW_PATH . '..' . DIRECTORY_SEPARATOR . 'application') . DIRECTORY_SEPARATOR
			);

			// get current uri
			$current_uri = strtok(trim(str_replace('-' , '_' , $_SERVER['REQUEST_URI']) , '/') , '?');

			// check language
			$current_language = null;
			if ( strpos($current_uri , '/') === 2 ) {
				if ( $first_two_chars = substr($current_uri , 0 , 2) ) {
					if ( $first_two_chars !== 'js' ) {
						define('LANG' , $first_two_chars);
						$current_uri = substr($current_uri , 3);
					}
				}
			}

			// more constants
			define('CURRENT_URI' , $current_uri);

		}

		private static function load_config() {

			// load configuration
			if ( file_exists($config_file = APPLICATION_PATH . 'config' . DIRECTORY_SEPARATOR . 'config.php') ) {
				require($config_file);
			}
			$GLOBALS['axe_config'] = new \Axe\Config(isset_or($config , []));

		}

		private static function determine_dev_mode() {

			// check if in development mode
			if ( !defined('DEV_MODE') ) {
				define("DEV_MODE" , isset_or($GLOBALS['axe_config']->dev_mode , false));
			}

			// error reporting
			if ( DEV_MODE ) {
				ini_set('display_errors' , true);
				error_reporting(E_ALL);
			} else {
				ini_set('display_errors' , false);
				error_reporting(0);
			}

		}

		private static function setup_libs_autoload() {
			require(FRAMEWORK_PATH . 'system/libs/autoload.php');
		}

		private static function define_autloader() {

			// autoloading
			spl_autoload_register(
				function($class_name_fully_qualified) {

					// get parts
					$parts = explode('\\' , $class_name_fully_qualified);
					$class_name = array_pop($parts);

					$path = '';
					foreach ( $parts as $part ) {
						$path .= 'modules' . DIRECTORY_SEPARATOR . $part . DIRECTORY_SEPARATOR;
					}

					// first check if a model exists - e.g. 'application/modules/ParentModule/modules/ChildModule/models/ExampleModel.php'
					if ( file_exists(
						$filename = ($filename_for_throw_exception_1 =
							APPLICATION_PATH .
							$path .
							'modules' .
							DIRECTORY_SEPARATOR .
							$class_name .
							DIRECTORY_SEPARATOR .
							'models' .
							DIRECTORY_SEPARATOR .
							$class_name .
							'.php')
					)
					) {

						// dev mode - alert if the module exists, but also a model under the module exists
						if ( DEV_MODE &&
						     file_exists(
							     $filename_for_debug_error =
								     APPLICATION_PATH . $path . 'models' . DIRECTORY_SEPARATOR . $class_name . '.php'
						     )
						) {
							throw new Exception(
								'
								<div style="font-size:12px ; margin-top:-20px">
								Because "' .
								$class_name_fully_qualified .
								'" module exists @' .
								"\n" .
								'"' .
								realpath($filename) .
								'"' .
								"\n\n" .
								'and the model located at:' .
								"\n" .
								'"' .
								realpath($filename_for_debug_error) .
								'"' .
								"\n\n" .
								'has the same class name, the module will be given priority, and the 2nd model will never load. Please either rename or delete one the files: ' .
								'"' .
								$class_name .
								'.php"' .
								"\n\n" .
								'</div>'
							);
						}

					} else if ( file_exists(

					// next, check if a model, under the module exists - e.g. 'application/modules/ParentModule/models/ExampleModel.php'
						$filename =
							($filename_for_throw_exception_2 =
								APPLICATION_PATH . $path . 'models' . DIRECTORY_SEPARATOR . $class_name . '.php')
					)
					) {

						// next, check if a module exists under axe modules - e.g. 'axe-framework/modules/ParentModule/modules/ChildModule/models/ExampleModule.php'
					} else if ( file_exists(
						$filename = ($filename_for_throw_exception_3 =
							FRAMEWORK_PATH .
							$path .
							'modules' .
							DIRECTORY_SEPARATOR .
							$class_name .
							DIRECTORY_SEPARATOR .
							'models' .
							DIRECTORY_SEPARATOR .
							$class_name .
							'.php')
					)
					) {

						// next, check if a module exists under axe modules - e.g. 'axe-framework/modules/ParentModule/modules/ChildModule/models/ExampleModule.php'
					} else if ( file_exists(
						$filename = ($filename_for_throw_exception_4 =
							FRAMEWORK_PATH . $path . 'models' . DIRECTORY_SEPARATOR . $class_name . '.php'
						)
					) ) {

					} else {

						// next check in system libraries
						throw new Exception(
							'
									Unable to load class: "' . $class_name_fully_qualified . '"
									autoloader tried to load files:' . "\n\n" .
							'1 = "' . $filename_for_throw_exception_1 . '"' . "\n\n" .
							'2 = "' . $filename_for_throw_exception_2 . '"' . "\n\n" .
							'3 = "' . $filename_for_throw_exception_3 . '"' . "\n\n" .
							'4 = "' . $filename_for_throw_exception_4 . '"' . "\n\n" .
							'5 = "' . $filename . '"' . "\n\n"
						);
					}

					include $filename;
				}
			);
		}

		private static function set_exception_handler() {

			// exception handler
			set_exception_handler(
				function($exception) {
					echo '
						<div style="font-family:\'Courier New\' ; border:solid 1px #000 ; padding:30px ; max-width:800px ; font-size:12px ; background-color:#400035 ; color:#FF0000 ; border: solid 15px #FF0000 ;">
							<h1 style="margin:0 ; font-size:30px ;">Fatal Error: Uncaught Exception</h1>
							<strong style="font-size:20px ; color:#FFFFFF ;">' . str_replace("\n" , "<br />\n" , $exception->getMessage()) . '</strong>
							<p style="margin:0 ; font-size:16px ; color:#9aceff ;">File: ' . $exception->getFile() . '</p>
							<p style="margin:0 ; font-size:16px ; color:#9aceff ;">Line: ' . $exception->getLine() . '</p>
					
					';

					if ( $exception->getTrace() ) {

						echo '<h2 style="margin:25px 0 15px 0">Trace:</h2>';
						foreach ( $exception->getTrace() as $trace ) {
							echo '
								<div style="margin:0 0 35px 0;">
								<p style="margin:0 0 3px 0;">' .
							     (!empty($trace["line"]) ? '<strong style="text-decoration: underline ;">' .
							                               $trace["file"] .
							                               '</strong>' .
							                               (!empty($trace["line"]) ? ' - <u>line:' .
							                                                         $trace["line"] .
							                                                         '</u>' : ''
							                               ) .
							                               ' => ' : ''
							     ) .
							     '"' . $trace["function"] . '"
							';

							if ( isset($trace["args"][0]) ) {
								echo ' --> params below:';
								echo '</p>';
								html_dump($trace["args"][0]);
							};

							echo '</div>';
						}
					}

					echo '</div>';
				}
			);

		}

		private static function load_required_files() {

			// load requirements
			require(FRAMEWORK_PATH . 'system/core/Utils.php');
			require(FRAMEWORK_PATH . 'system/core/Config.php');
			require(FRAMEWORK_PATH . 'system/core/Route.php');
			require(FRAMEWORK_PATH . 'system/core/ORM.php');
			require(FRAMEWORK_PATH . 'system/core/View.php');
			require(FRAMEWORK_PATH . 'system/core/Controller.php');
			require(FRAMEWORK_PATH . 'system/core/CSRF.php');

		}

		private static function load_db() {

			require('DB.php');

			// load & create DB connection
			if ( !empty($GLOBALS['axe_config']->db_host) ) {
				$GLOBALS['default_db'] =
					new \Axe\DB($GLOBALS['axe_config']->db_host , $GLOBALS['axe_config']->db_name , $GLOBALS['axe_config']->db_user ,
						$GLOBALS['axe_config']->db_pass);
			}

		}

		private static function load_routes() {

			// load routes
			if ( file_exists($filepath = APPLICATION_PATH . 'config' . DIRECTORY_SEPARATOR . 'routes.php') ) {
				include $filepath;
			}
			if ( !Route::run_routes() ) {
				if ( isset($GLOBALS['axe_config']->default_module) ) {

					// create default route
					Route::create_default_routes();
					Route::run_routes();

				}
			}

		}

		public static function load_library($library_name) {

			$library_name = str_replace(['/' , '\\'] , DIRECTORY_SEPARATOR , $library_name);

			if ( file_exists(
				$filename_1 = realpath(FRAMEWORK_PATH . 'system' . DIRECTORY_SEPARATOR . 'libs') . DIRECTORY_SEPARATOR . $library_name . '.php') ) {
				require_once($filename_1);

			} else if ( file_exists($filename_2 = APPLICATION_PATH . 'libs' . DIRECTORY_SEPARATOR . $library_name . '.php') ) {
				require_once($filename_2);

			} else {
				throw new Exception('Could not find library in:' . "\n\n" . $filename_1 . "\n\n" . ' or in: ' . "\n\n" . $filename_2);
			}

		}
	}
