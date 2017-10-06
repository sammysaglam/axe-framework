<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title><?php echo $model->get_title(); ?></title>
		<?php
			foreach ( $model->get_stylesheets() as $stylesheet_url ) {
				echo '<link rel="stylesheet" href="' . $stylesheet_url . '">';
			}
		?>
		<?php
			foreach ( $model->get_scripts() as $script_url ) {
				echo '<script src="' . $script_url . '"></script>';
			}
		?>
	</head>
	<body>