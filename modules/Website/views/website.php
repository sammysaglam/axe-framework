<!DOCTYPE html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
		<meta charset="UTF-8">
		<meta name="description" content="axe framework - A PHP & React based framework for building web applications"/>
		<title>Axe Framework Documentation</title></head>
		<style>
			<?php
				echo file_get_contents(FRAMEWORK_PATH . "/docs/build/bundle.css");
			?>
		</style>
	<body>
		<div id="app">
			<?php
				echo $ssr;
			?>
		</div>
		<script>
			<?php
				echo file_get_contents(FRAMEWORK_PATH . "/docs/build/bundle.js");
			?>
		</script>
	</body>
</html>