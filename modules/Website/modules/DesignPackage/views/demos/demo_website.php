<!DOCTYPE html>
<html>
	<head>
		<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
		<meta charset="utf-8"/>
		<title><?php echo $html_head->get_title(); ?></title>
		<?php
			foreach ( $html_head->get_stylesheets() as $stylesheet_url ) {
				echo '<link rel="stylesheet" href="' . $stylesheet_url . '">';
			}
		?>
	</head>
	<body>
		<?php echo $page; ?>
	</body>
</html>