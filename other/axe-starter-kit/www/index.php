<?php

	if ( file_exists($filename = '../axe-framework/load.php') ) {
		require($filename);

	} else {
		echo 'error! could not find axe framework';
	}