<?php

	namespace Website\EditablePage\Migrations ;

	use Axe\DBQuery;

	class CreateDB {

		public static function up() {

			$query = new DBQuery("
				
				CREATE TABLE IF NOT EXISTS `axe-editable_content` (
				  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
				  `unique_name` char(50) COLLATE utf8_general_mysql500_ci NOT NULL DEFAULT '',
				  `html` longtext COLLATE utf8_general_mysql500_ci NOT NULL,
				  `raw` longtext COLLATE utf8_general_mysql500_ci NOT NULL,
				  PRIMARY KEY (`id`),
				  UNIQUE KEY `unique_name` (`unique_name`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;
			
			") ;

		}

		public static function down() {

			$query = new DBQuery($query = "
			
				DROP TABLE `axe-editable_content`;
			
			") ;

		}

	}