<?php

	namespace Axe;

	use Cake\Utility\Inflector;

	class ORM {

		public static function allowed_fields() {
			return [];
		}

		public static function get_allowed_fields() {
			return function() {
				$class_name = get_called_class();

				return [
					"__CLASS__"      => $class_name ,
					"allowed_fields" => $class_name::allowed_fields()
				];
			};
		}

		private static function generate_create_new_query($data) {

			// build sql
			$sql = '
				INSERT INTO `' . self::get_table_name() . '` (`' . (

				is_array(reset($data)) ?

					// multiple inserts
					implode('` , `' , array_keys(reset($data)))
					:

					// single insert
					implode('` , `' , array_keys($data))

				) . '`) VALUES (' .

			       (is_array(reset($data)) ?

				       // multiple inserts
				       implode(') , (' , array_map(function($row) {
					       return implode(' , ' , array_map(function() {
						       return '?';
					       } , $row));
				       } , $data))

				       :

				       // single insert
				       implode(' , ' , array_map(function() { return '?'; } , $data))

			       ) . '
				);
			';

			// build params
			$params = [];
			array_walk_recursive($data , function($child , $key , $params) {
				if ( $key === 'id' ) {
					throw new \Exception('You cannot use "id" for inserting! -> it is done automatically (auto-increment)');
				}
				$params[0][] = $child;
			} , [&$params]);

			// return
			return [
				"sql"    => $sql ,
				"params" => $params
			];
		}

		public static function create_new($data , $fields_to_get_after_creation = null) {

			// build mysql query
			$query = self::generate_create_new_query($data);

			// run query
			$result = new DBQuery($query["sql"] , $query["params"]);

			// return newly created objects if necessary
			if ( isset($fields_to_get_after_creation) ) {

				return self::search([
					"where"  => [
						"sql"    => "id >= ?" ,
						"params" => [$result->last_insert_id()]
					] ,
					"fields" => $fields_to_get_after_creation
				]);
			}
		}

		public function delete() {
			new DBQuery("DELETE FROM `" . self::get_table_name() . "` WHERE id = ? ;" , [$this->id]);

			// reset properties (since we can't self-destruct object)
			foreach ( $this as $property => $value ) {
				$this->$property = null;
			}
			$this->id = -1;
		}

		public static function search($settings , $debug_show_query = false) {

			// default search settings
			$settings = [
				"where"              => isset_or($settings["where"] , "all") ,
				"fields"             => isset_or($settings["fields"] , "none") ,
				"sort"               => isset_or($settings["sort"] , "default") ,
				"results_per_page"   => isset_or($settings["results_per_page"] , "all") ,
				"page"               => isset_or($settings["page"] , 0) ,
				"use_field_as_index" => isset_or($settings["use_field_as_index"] , false) ,
				"return_first"       => isset_or($settings["return_first"] , false)
			];

			// init
			$child_class_name = get_called_class();
			$select_query = '';
			$joins = [];
			$children = [];

			// allowed fields
			$allowed_fields = $child_class_name::get_allowed_fields();

			// get all records
			if ( $settings['where'] == 'all' ) {
				$settings['where'] = [
					"sql"    => "1=1" ,
					"params" => null
				];
			}

			// don't retrieve any fields
			if ( $settings['fields'] == 'none' ) {
				$settings['fields'] = [];
			}

			// process fields according to class rules
			$processed_fields = [];
			$field_not_requrining_validation = [];
			foreach ( $settings['fields'] as $key => $field ) {
				if ( ($return_val = $child_class_name::process_field($field)) === true ) {
					$processed_fields[$key] = $field;

				} else if ( is_array($return_val) ) {
					$processed_fields[$field] = $return_val;

				} else if ( is_string($return_val) ) {
					$field_not_requrining_validation[] = $return_val;
				}
			}

			// process fields - general rules which apply to all classes
			foreach ( $processed_fields as $key => $field ) {

				if ( empty($field) ) {
					continue;
				}

				// dont allow adding of 'id' field -> since it already is called on all queries
				if ( $field == 'id' ) {
					throw new \Exception($child_class_name . '::search -> field "id" is already included in results. please do not add to list of fields' ,
						400);

					return false;

				} else if ( is_array($field) && isset($allowed_fields()['allowed_fields'][$key_no_vars = preg_replace('/\$[^-]+/' , '$' , $key)]) ) {

					// if field is function, it means it is referencing a child class
					$field['class_name'] = $allowed_fields()['allowed_fields'][$key_no_vars]()['__CLASS__'];
					$children[str_replace('$' , '' , $key)] = $field;
					continue;

				} else if ( ($search_index = array_search(preg_replace('/\$[^-]+/' , '$' , $field) , $allowed_fields()['allowed_fields'])) !== false &&
				            $search_index !== '__CLASS__' ) {
					// allowed field, so do nothing

				} else {

					// field does not in the allowed list, so give error
					throw new \Exception(
						$child_class_name .
						'::search -> invalid field: "' .
						(is_array($field) ? $key : $field) .
						'"' .
						PHP_EOL .
						PHP_EOL .
						'<br /><br />' .
						'Allowed fields are: ' .
						PHP_EOL .
						'<br /> - <pre style="font-size:12px ; color:#FFF ;">' .
						print_r($allowed_fields()['allowed_fields'] , true) .
						'</pre>' ,
						400
					);

					return false;
				}

				$select_query .= ' , `' . $processed_fields[$key] . '`';
			}

			// process fields which do not require validation
			foreach ( $field_not_requrining_validation as $field ) {
				$select_query .= ' , ' . $field;
			}

			// build sort query
			if ( $settings['sort'] == 'default' ) {
				$settings['sort'] = [];
			}
			$sort_query = implode(' , ' , $settings['sort']);
			if ( $sort_query != '' ) {
				$sort_query = ' ORDER BY ' . $sort_query;
			}

			// build LIMIT query
			$limit_query = '';
			if ( $settings['results_per_page'] != "all" ) {
				$limit_query = 'LIMIT ' . $settings['results_per_page'] * $settings['page'] . ',' . $settings['results_per_page'];
			}

			// run query
			$query = $child_class_name::query_constructor($select_query , $settings['where'] , $joins) . ' ' . $sort_query . ' ' . $limit_query;
			if ( $debug_show_query ) {
				html_dump($query);
				html_dump($settings['where']['params']);
			}
			$query = new DBQuery(preg_replace('@\s+@' , ' ' , $query) , $settings['where']['params'] , $child_class_name);
			$db_results = $query->results();

			// create array of objects, with object's id as the key
			$objects = [];
			foreach ( $db_results as $key => $obj ) {
				if ( $settings['use_field_as_index'] !== false ) {
					$index_field_name = $settings['use_field_as_index'];
					$key = $obj->$index_field_name;
				}

				$objects[$key] = $obj;

				foreach ( $children as $index => $query_settings ) {

					// build params
					$new_params = [];
					foreach ( $query_settings['where']['params'] as $param ) {
						if ( substr($param , 0 , 1) === '$' ) {
							$param = ltrim($param , '$');
							$new_params[] = $objects[$key]->$param;

						} else {
							$new_params[] = $param;
						}
					}

					// run query
					$objects[$key]->$index = $query_settings['class_name']::search(
						[
							"where"              => [
								"sql"    => $query_settings['where']['sql'] ,
								"params" => $new_params
							] ,
							"fields"             => isset($query_settings['fields']) ? $query_settings['fields'] : null ,
							"sort"               => isset($query_settings['sort']) ? $query_settings['sort'] : null ,
							"results_per_page"   => isset($query_settings['results_per_page']) ? $query_settings['results_per_page'] : null ,
							"page"               => isset($query_settings['page']) ? $query_settings['page'] : null ,
							"use_field_as_index" => isset($query_settings['use_field_as_index']) ? $query_settings['use_field_as_index'] : false ,
							"return_first"       => isset($query_settings['return_first']) ? $query_settings['return_first'] : false
						] ,
						$debug_show_query
					);
				}

			}

			// check if only the first result must be returned
			if ( $settings['return_first'] ) return !empty($objects) ? array_shift($objects) : null;

			// return
			return $objects;
		}

		private static function process_field($field) {
			return true;
		}

		public static function query_constructor($select_query , &$where , $joins) {

			$table_name = self::get_table_name();

			return '
				SELECT
					*
					
				FROM (
					SELECT
						id
						' . $select_query . '
						
					FROM `' . $table_name . '`
						
				) AS `' . $table_name . '`
					
				WHERE ' . $where['sql'] . '
			';
		}

		public static function get_table_name() {

			$child_class_name_fully_qualified = get_called_class();

			$class_name_parts = explode('\\' , $child_class_name_fully_qualified);
			$child_class_name = end($class_name_parts);

			if ( defined($child_class_name_fully_qualified . '::TABLE_NAME') ) {
				$table_name = $child_class_name_fully_qualified::TABLE_NAME;
			} else {
				$table_name = Inflector::pluralize(Inflector::underscore($child_class_name));
			}

			return $table_name;
		}

	}