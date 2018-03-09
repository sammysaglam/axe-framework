<?php

	namespace Axe;

	class DB {

		public $connection;

		public function __construct($host , $dbname , $username , $password) {
			$this->connection = new \PDO('mysql:host=' . $host . ';dbname=' . $dbname , $username , $password);
		}

	}

	class DBQuery {

		private $last_insert_id;
		private $num_rows = 0;
		private $results  = [];

		public function __construct($query , $params = null , $class_name = null , DB $db = null) {

			if ( is_null($db) ) {

				if ( !isset($GLOBALS['default_db']) ) {
					throw new \Exception('Tried to use default DB, however default DB is not defined in "application/config/config.php"');
					exit();
				}

				$db = $GLOBALS['default_db'];
			}

			$statement = $db->connection->prepare($query);
			$statement->execute($params);

			$errors = $statement->errorInfo();
			if ( $errors[2] ) {
				throw new \Exception($errors[2]);
			}

			$this->last_insert_id = $db->connection->lastInsertId();

			$fetch_style = ($class_name ? \PDO::FETCH_CLASS : \PDO::FETCH_OBJ);
			$this->results = $class_name ? $statement->fetchAll($fetch_style , $class_name) : $statement->fetchAll($fetch_style);
			$this->num_rows += $statement->rowCount();

			while ( $statement->nextrowset() ) {
				$this->results =
					array_merge($this->results , $class_name ? $statement->fetchAll($fetch_style , $class_name) : $statement->fetchAll($fetch_style));
				$this->num_rows += $statement->rowCount();
			}
		}

		public function num_rows() {
			return $this->num_rows;
		}

		public function results() {
			return $this->results;
		}

		public function last_insert_id() {
			return $this->last_insert_id;
		}

	}