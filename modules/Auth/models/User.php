<?php

	namespace Auth;

	use Axe\DBQuery;

	class User extends \Axe\ORM {

		const TABLE_NAME = 'axe-users';

		public static function allowed_fields() {
			return [
				"username" ,
				"email" ,
				"password_hash" ,
				"salt" ,
				"consecutive_invalid_logins" ,
				"user_groups" => UserGroup::get_allowed_fields()
			];
		}

		public static function process_field($field) {

			if ( $field == 'user_groups' ) {
				return [
					"where"  => [
						"sql"    => 'id IN (SELECT `group` FROM `axe-user_group_memberships` WHERE `user` = ?)' ,
						"params" => ['$id']
					] ,
					"fields" => [
						"name"
					]
				];

			}

			return true;
		}

		// TODO: subscribe to default user_groups after creation
		public static function create_new($data , $fields_to_get_after_creation = null) {

			$salt = bin2hex(random_bytes(64));
			$password_hashed = hash_pbkdf2('sha512' , $data['password'] , $salt , 250);

			$user_data = [
				"username"      => $data['username'] ,
				"password_hash" => $password_hashed ,
				"salt"          => $salt
			];

			if ( isset($data['name']) ) $user_data['name'] = $data['name'];
			if ( isset($data['email']) ) $user_data['email'] = $data['email'];
			if ( isset($data['telephone']) ) $user_data['telephone'] = $data['telephone'];

			return parent::create_new($user_data , $fields_to_get_after_creation);
		}

		public function inc_consecutive_invalid_logins() {
			new DBQuery('UPDATE `' . self::TABLE_NAME . '` SET consecutive_invalid_logins = consecutive_invalid_logins + 1 WHERE id = ? ;' , [$this->id]);
			$this->consecutive_invalid_logins++;
		}

		public function reset_consecutive_invalid_logins() {
			new DBQuery('UPDATE `' . self::TABLE_NAME . '` SET consecutive_invalid_logins = 0 WHERE id = ? ;' , [$this->id]);
			$this->consecutive_invalid_logins = 0;
		}

		public function is_groupmember_of($group) {

			if ( is_int($group) ) {
				$group_id = $group;

			} else if ( is_string($group) ) {
				$group_search = UserGroup::search([
					"where"  => [
						"sql"    => "name = ?" ,
						"params" => [$group]
					] ,
					"fields" => [
						"name"
					]
				]);

				if ( empty($group_search) ) {
					throw new \Exception('Group with name: "' . $group . '" does not exist');
				}

				$group = $group_search[0];
				$group_id = $group->id;

			} else if ( is_object($group_search) && $group instanceof UserGroup ) {
				$group_id = $group->id;
			}

			if ( !isset($this->user_groups) ) {
				throw new \Exception('On "User::search" call please add field "user_groups"');
			}

			$member_of = false;
			foreach ( $this->user_groups as $group ) {
				if ( $group->id == $group_id ) {
					return true;
				}
			}

			return false;
		}

	}