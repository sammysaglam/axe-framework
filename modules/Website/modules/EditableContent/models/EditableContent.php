<?php

	namespace Website;

	use Auth\User;
	use Auth\UserGroup;

	class EditableContent extends \Axe\ORM {

		const TABLE_NAME = 'axe-editable_content';

		public static function allowed_fields() {
			return array(
				"unique_name" ,
				"html" ,
				"raw" ,
				"allowed_user_groups" => UserGroup::get_allowed_fields()
			);
		}

		public static function process_field($field) {

			if ( $field == 'allowed_user_groups' ) {
				return array(
					"where"  => array(
						"sql"    => 'id IN (SELECT `user_group` FROM `axe-editable_content-allowed_user_groups` WHERE `editable_content` = ?)' ,
						"params" => array('$id')
					) ,
					"fields" => array(
						"name"
					)
				);
			}

			return true;
		}

		public function is_user_allowed_to_edit(User $user) {

			if ( !isset($this->allowed_user_groups) ) {
				throw new \Exception('EditableContent::search must include field "allowed_user_groups"');
			}

			return (bool)array_intersect(
				array_map(
					function($user_group) {
						return $user_group->id;
					} ,
					$user->user_groups
				) ,
				array_map(
					function($user_group) {
						return $user_group->id;
					} ,
					$this->allowed_user_groups
				)
			);
		}

		public function update_content($html , $raw) {
			new \Axe\DBQuery('UPDATE `' . self::TABLE_NAME . '` SET html = ? , raw = ? WHERE id = ? ;' , array($html , json_encode($raw) , $this->id));
			$this->html = $html;
			$this->raw = $raw;
		}

	}