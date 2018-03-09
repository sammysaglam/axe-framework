<?php

	namespace Website;

	use Axe\DBQuery;
	use Axe\ORM;

	class Comment extends ORM {

		const TABLE_NAME = 'axe-comments';

		public static function allowed_fields() {
			return [
				"search_key" ,
				"date" ,
				"author_uid" ,
				"author" => \Auth\User::get_allowed_fields() ,
				"guest_author_name" ,
				"reply_to" ,
				"text" ,
				"rating" ,
				'user-$-vote'
			];
		}

		public static function process_field($field) {

			if ( $field == 'author' ) {
				return [
					"where"        => [
						"sql"    => 'id = ?' ,
						"params" => ['$author_uid']
					] ,
					"fields"       => [
						"username"
					] ,
					"return_first" => true
				];

			} else if ( preg_match('/user-\$([0-9]+)-vote/' , $field , $matches) ) {

				return 'IFNULL((SELECT vote FROM `axe-comment-votes` WHERE comment_id = `axe-comments`.id AND user_id = "' .
				       $matches[1] .
				       '"),0) AS `user-' .
				       $matches[1] .
				       '-vote`';

			} else if ( preg_match('/\$current_user-vote/' , $field , $matches) ) {

				if ( $currently_logged_in_user = \Auth::get_logged_in_user() ) {
					return 'IFNULL((SELECT vote FROM `axe-comment-votes` WHERE comment_id = `axe-comments`.id AND user_id = "' .
					       $currently_logged_in_user->id .
					       '"),0) AS `current_user-vote`';

				} else {
					return '0 AS `current_user-vote`';
				}

			}

			return true;
		}

		public function like_comment($user_id) {

			$query = new DBQuery("

				DELETE FROM `axe-comment-votes` WHERE
					comment_id = ?     # (1)
						AND
					user_id = ?        # (2)
				  ;

				INSERT INTO `axe-comment-votes` (
					comment_id ,
					user_id    ,
					vote
					
				) VALUES (
					? ,                # (3)
					? ,                # (4)
					1
				);
				
				UPDATE `axe-comments` SET rating = (
					SELECT SUM(vote) FROM `axe-comment-votes` WHERE
						comment_id = ? # (5)
					)	
				WHERE id = ? ;         # (6)
				
				SELECT rating FROM `axe-comments` WHERE
					id = ?             # (7)
				;
				
			" , [
				$this->id , // (1)
				$user_id ,  // (2)
				$this->id , // (3)
				$user_id ,  // (4)
				$this->id , // (5)
				$this->id , // (6)
				$this->id   // (7)
			]);

			$this->rating = intval($query->results()[0]->rating);
		}

		public function unlike_comment($user_id) {

			$query = new DBQuery("

				DELETE FROM `axe-comment-votes` WHERE
					comment_id = ?     # (1)
						AND
					user_id = ?        # (2)
						AND
					vote = 1
				;
				
				UPDATE `axe-comments` SET rating = (
					SELECT SUM(vote) FROM `axe-comment-votes` WHERE
						comment_id = ? # (3)
					)	
				WHERE id = ? ;         # (4)
				
				SELECT rating FROM `axe-comments` WHERE
					id = ?             # (5)
				;
				
			" , [
				$this->id , // (1)
				$user_id ,  // (2)
				$this->id , // (3)
				$this->id , // (4)
				$this->id   // (5)
			]);

			$this->rating = intval($query->results()[0]->rating);
		}

		public function dislike_comment($user_id) {

			$query = new DBQuery("

				DELETE FROM `axe-comment-votes` WHERE
					comment_id = ?     # (1)
						AND
					user_id = ?        # (2)
				  ;

				INSERT INTO `axe-comment-votes` (
					comment_id ,
					user_id    ,
					vote
					
				) VALUES (
					? ,                # (3)
					? ,                # (4)
					-1
				);
				
				UPDATE `axe-comments` SET rating = (
					SELECT SUM(vote) FROM `axe-comment-votes` WHERE
						comment_id = ? # (5)
					)	
				WHERE id = ? ;         # (6)
				
				SELECT rating FROM `axe-comments` WHERE
					id = ?             # (7)
				;
				
			" , [
				$this->id , // (1)
				$user_id ,  // (2)
				$this->id , // (3)
				$user_id ,  // (4)
				$this->id , // (5)
				$this->id , // (6)
				$this->id   // (7)
			]);

			$this->rating = intval($query->results()[0]->rating);
		}

		public function undislike_comment($user_id) {

			$query = new DBQuery("

				DELETE FROM `axe-comment-votes` WHERE
					comment_id = ?     # (1)
						AND
					user_id = ?        # (2)
						AND
					vote = -1
				;
				
				UPDATE `axe-comments` SET rating = (
					SELECT SUM(vote) FROM `axe-comment-votes` WHERE
						comment_id = ? # (3)
					)	
				WHERE id = ? ;         # (4)
				
				SELECT rating FROM `axe-comments` WHERE
					id = ?             # (5)
				;
				
			" , [
				$this->id , // (1)
				$user_id ,  // (2)
				$this->id , // (3)
				$this->id , // (4)
				$this->id   // (5)
			]);

			$this->rating = intval($query->results()[0]->rating);
		}

	}