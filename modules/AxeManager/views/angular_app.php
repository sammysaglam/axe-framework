<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $html_head->get_title(); ?></title>
		<?php
			foreach ( $html_head->get_stylesheets() as $stylesheet_url ) {
				echo '<link rel="stylesheet" href="' . $stylesheet_url . '">';
			}
		?>
		<?php
			foreach ( $html_head->get_scripts() as $script_url ) {
				echo '<script src="' . $script_url . '"></script>';
			}
		?>
	</head>
	<body>
		<axe-manager></axe-manager>
		<script src="<?php echo $this->get_js_path('angular_app.js'); ?>"></script>
	</body>
</html>