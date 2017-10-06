<?php

	// var_dump HTML friendly
	function html_dump($var , $h1 = '') {
		if ( DEV_MODE ) {
			echo "<pre style=\"border: 1px dotted #AAA; overflow: auto; margin: 0.5em; padding:10px ; background-color:#FFFFFF ; color:#000 ;\">";
			if ( !empty($h1) ) {
				echo '<h1 style="margin-top:0 ; display:block ; color:#5b82ff ;">' . $h1 . '</h1>';
			}
			var_dump($var);
			echo "</pre>\n";
		}
	}

	// code highlighting settings
	ini_set('highlight.default' , '"class="aw_default');
	ini_set('highlight.keyword' , '"class="aw_keyword');
	ini_set('highlight.string' , '"class="aw_string');
	ini_set('highlight.html' , '"class="aw_htmlsrc');
	ini_set('highlight.comment' , '"class="aw_comment');

	// get all the declared classes inside a php file
	function file_get_php_classes($filepath) {
		$php_code = file_get_contents($filepath);
		$classes = get_php_classes($php_code);

		return $classes;
	}

	// get the classes defined inside a block of php code
	function get_php_classes($php_code) {
		$classes = array();
		$tokens = token_get_all($php_code);
		$count = count($tokens);
		for ( $i = 2 ; $i < $count ; $i++ ) {
			if ( $tokens[$i-2][0] === T_CLASS
			     && $tokens[$i-1][0] === T_WHITESPACE
			     && $tokens[$i][0] === T_STRING
			) {

				$class_name = $tokens[$i][1];
				$classes[] = $class_name;
			}
		}

		return $classes;
	}

	// get file_ext from a string filename
	function file_ext($filename) {
		return substr(strrchr($filename , '.') , 1);
	}

	// get mimetype based on file extension
	function mime_type($file_ext) {

		$mime_types = array(
			"pdf"   => "application/pdf" ,
			"exe"   => "application/octet-stream" ,
			"zip"   => "application/zip" ,
			"docx"  => "application/msword" ,
			"doc"   => "application/msword" ,
			"xls"   => "application/vnd.ms-excel" ,
			"ppt"   => "application/vnd.ms-powerpoint" ,
			"gif"   => "image/gif" ,
			"png"   => "image/png" ,
			"jpeg"  => "image/jpg" ,
			"jpg"   => "image/jpg" ,
			"svg"   => "image/svg+xml" ,
			"mp3"   => "audio/mpeg" ,
			"wav"   => "audio/x-wav" ,
			"mpeg"  => "video/mpeg" ,
			"mpg"   => "video/mpeg" ,
			"mpe"   => "video/mpeg" ,
			"mov"   => "video/quicktime" ,
			"avi"   => "video/x-msvideo" ,
			"3gp"   => "video/3gpp" ,
			"css"   => "text/css" ,
			"jsc"   => "application/javascript" ,
			"js"    => "application/javascript" ,
			"php"   => "text/html" ,
			"htm"   => "text/html" ,
			"html"  => "text/html" ,
			"ttf"   => "application/font-sfnt" ,
			"otf"   => "application/font-sfnt" ,
			"woff"  => "application/font-woff" ,
			"woff2" => "font/woff2"
		);

		return isset_or($mime_types[$file_ext] , false);
	}

	// if isset, return $var, else return $else_value
	function isset_or(&$var , $else_value) {
		if ( isset($var) ) {
			return $var;
		} else {
			return $else_value;
		}
	}

	// if empty, return $var, else return $else_value
	function empty_or(&$var , $else_value) {
		if ( !empty($var) ) {
			return $var;
		} else {
			return $else_value;
		}
	}

	// file_get_contents_curl
	function file_get_contents_curl($url , $use_proxy = false , $post_data = array() , $cookies_file = null , $debug_data = false) {

		if ( $debug_data ) echo 'Attempting to open URL ' . $url . "\n\n";

		$html = '';
		$tries = 0;
		while ( empty($html) && $tries < 20 ) {

			$ch = curl_init($url);
			$headers = array(
				'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' ,
				'Accept-Encoding: gzip, deflate' ,
				'Accept-Language: en-US,en;q=0.5' ,
				'User-Agent: Mozilla/5.0 (Windows NT 6.3; WOW64; rv:37.0) Gecko/20100101 Firefox/37.0'
			);

			if ( $use_proxy ) {
				$proxy = get_proxy();
				if ( $debug_data ) echo 'trying proxy ' . $proxy;
			}

			curl_setopt($ch , CURLOPT_SSL_VERIFYPEER , false);
			curl_setopt($ch , CURLOPT_SSL_VERIFYHOST , false);
			curl_setopt($ch , CURLOPT_FOLLOWLOCATION , 1);
			curl_setopt($ch , CURLOPT_RETURNTRANSFER , true);
			curl_setopt($ch , CURLOPT_HTTPHEADER , $headers);
			curl_setopt($ch , CURLOPT_ENCODING , "gzip");
			curl_setopt($ch , CURLOPT_AUTOREFERER , 1);
			curl_setopt($ch , CURLOPT_CONNECTTIMEOUT , 20);
			curl_setopt($ch , CURLOPT_TIMEOUT , 20);
			curl_setopt($ch , CURLOPT_HEADERFUNCTION , function($ch , $string) {
				return strlen($string);
			});

			if ( $use_proxy ) curl_setopt($ch , CURLOPT_PROXY , $proxy);

			if ( !empty($post_data) ) {
				curl_setopt($ch , CURLOPT_POST , true);
				curl_setopt($ch , CURLOPT_POSTFIELDS , $post_data);
				if ( $debug_data ) echo 'post data:' . "\n";
				if ( $debug_data ) var_dump($post_data);
			}

			if ( !empty($cookies_file) ) {
				curl_setopt($ch , CURLOPT_COOKIESESSION , true);
				curl_setopt($ch , CURLOPT_COOKIEJAR , $cookies_file);
				curl_setopt($ch , CURLOPT_COOKIEFILE , $cookies_file);
				if ( $debug_data ) echo "\n" . 'using cookies' . "\n" . "\n";
			}

			$html = curl_exec($ch);
			if ( $debug_data ) {
				if ( empty($html) ) {
					echo ' -> failed' . "\n";
				} else echo ' -> success' . "\n";
			}
			curl_close($ch);

			$tries++;
		}

		if ( $debug_data ) {
			if ( empty($html) ) {
				echo "\n" . "Could not connect to URL > file_get_contents_curl('" . $url . "') --> " . curl_error($ch) . "\n";
			} else echo "\n" . "Successfully opened " . $url . "\n\n";
		}

		return $html;
	}

	function get_proxy() {

		// json file
		$json_file_path = APPLICATION_PATH . 'cache' . DIRECTORY_SEPARATOR . 'proxies.json';

		// load proxies file
		if ( !file_exists($json_file_path) ) file_put_contents($json_file_path , '{}');
		$proxies_file = json_decode(file_get_contents($json_file_path));

		// we need to re-download proxies file
		$redownload = false;
		if ( !isset($proxies_file->last_downloaded) ) {
			$redownload = true;
		} else {
			$date_diff = date_diff(date_create($proxies_file->last_downloaded) , date_create());
			if ( ($date_diff->i > 10) || ($date_diff->h > 0) || ($date_diff->d > 0) || ($date_diff->m > 0) || ($date_diff->y > 0) ) $redownload = true;
		}
		if ( $redownload ) {
			$downloaded_proxies = explode("\n" , file_get_contents('https://kingproxies.com/api/v2/proxies.txt?key=04774f9825b7bfd0fb84a109a64320&type=anonymous&protocols=http&alive=true'));
			$proxies_file = array("proxies" => $downloaded_proxies);
			$proxies_file["last_downloaded"] = date_format(date_create() , 'Y-m-d H:i:s');
			$proxies_file["index_to_use"] = 0;
			$proxies_file = json_encode($proxies_file);
			file_put_contents($json_file_path , $proxies_file);
			$proxies_file = json_decode($proxies_file);
		}

		// proxy to use
		if ( empty($proxies_file->proxies[$proxies_file->index_to_use]) ) $proxies_file->index_to_use = 0;
		$ip_port = $proxies_file->proxies[$proxies_file->index_to_use];

		// on next load, use the next proxy
		$proxies_file->index_to_use++;

		// save new index
		file_put_contents($json_file_path , json_encode($proxies_file));

		// return
		return $ip_port;
	}