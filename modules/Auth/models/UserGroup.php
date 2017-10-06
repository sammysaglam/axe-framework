<?php

	namespace Auth ;

	class UserGroup extends \Axe\ORM {

		const TABLE_NAME = 'axe-user_groups';

		public static function allowed_fields() {
			return array(
				"name"
			);
		}

	}