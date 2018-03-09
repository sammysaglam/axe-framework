<?php

	namespace Website\Controllers;

	use Axe\Controller;
	use Cake\Utility\Inflector;

	class Assets extends Controller {

		private static function allowed_file_extensions() {
			return [
				'png' ,
				'jpg' ,
				'jpeg' ,
				'gif' ,
				'svg' ,
				'css' ,
				'js' ,
				'ttf' ,
				'otf' ,
				'woff' ,
				'woff2'
			];
		}

		public function echo_asset() {
			$f_args = func_get_args();

			// all files with underscore at the start are private folders which shouldnt be accesible
			$filename = ltrim(array_pop($f_args) , '_');

			// get file extension
			$file_ext = file_ext($filename);

			if ( array_search($file_ext , self::allowed_file_extensions() , true) === false ) {
				Controller::get('mod-website/errors')->run('error_405');

				return false;
			}

			$path = '';
			foreach ( $f_args as $part ) {

				// all folders with underscore at the start are private folders which shouldnt be accesible
				$part = ltrim($part , '_');

				// make sure part does not go to parent
				if ( $part == '..' || $part == '.' ) {
					Controller::get('mod-website/errors')->run('error_405');

					return false;
				}

				// is a module
				if ( empty($enter_view_folder) && substr($part , 0 , 4) == 'mod_' ) {
					$path .= 'modules' . DIRECTORY_SEPARATOR . Inflector::camelize(substr($part , 4)) . DIRECTORY_SEPARATOR;

					// not a module
				} else {
					if ( empty($enter_view_folder) ) {
						$path .= 'views' . DIRECTORY_SEPARATOR;
					}
					$enter_view_folder = true;
					$path .= $part . DIRECTORY_SEPARATOR;
				}
			}
			if ( empty($enter_view_folder) ) {
				$path .= 'views' . DIRECTORY_SEPARATOR;
			}
			$path .= $filename;

			// check if user defined script exists
			if ( ($file_contents = @file_get_contents(WWW_PATH . '..' . DIRECTORY_SEPARATOR . 'application' . DIRECTORY_SEPARATOR . $path)) !== false ) {
				if ( $mime_type = mime_type($file_ext) ) {
					header('Content-Type: ' . $mime_type);
					echo $file_contents;
				}

			} else if ( ($file_contents = @file_get_contents(FRAMEWORK_PATH . $path)) !== false ) {
				if ( $mime_type = mime_type($file_ext) ) {
					header('Content-Type: ' . $mime_type);
					echo $file_contents;
				}

			} else {
				Controller::get('mod-website/errors')->run('error_404');

				return false;
			}

		}

	}