<?php

	namespace Website\EditableContent\Controllers;

	use Axe\Controller;
	use Website\EditableContent;

	class __Main extends Controller {

		public function index($content_unique_name) {

			$content_search = EditableContent::search(
				[
					"where"  => [
						"sql"    => "unique_name = ?" ,
						"params" => [$content_unique_name]
					] ,
					"fields" => [
						"unique_name" ,
						"html" ,
						"raw" ,
						"allowed_user_groups"
					]
				]
			);

			if ( empty($content_search) ) {
				return false;
			} else {
				$content = $content_search[0];
			}

			return $this->get_view(
				'editable_content' ,
				[
					"id"                      => $content->id ,
					"html_content"            => $content->html ,
					"raw_content"             => $content->raw ,
					"is_user_allowed_to_edit" => ($user = \Auth::get_logged_in_user(["user_groups"])) && $content->is_user_allowed_to_edit($user)
				]
			);
		}

		public function save_content($id , $html_content , $raw_content) {

			$content_search = EditableContent::search(
				[
					"where"  => [
						"sql"    => "id = ?" ,
						"params" => [$id]
					] ,
					"fields" => [
						"allowed_user_groups"
					]
				]
			);

			if ( empty($content_search) ) {
				return false;
			} else {
				$content = $content_search[0];
			}

			if ( ($user = \Auth::get_logged_in_user(["user_groups"])) && $content->is_user_allowed_to_edit($user) ) {

				// purify HTML content from XSS & injection attacks
				$config = \HTMLPurifier_Config::createDefault();
				$config->set('Attr.AllowedFrameTargets' , ["_blank"]);
				$config->set('HTML.Nofollow' , true);
				$purifier = new \HTMLPurifier($config);
				$clean_html = $purifier->purify($html_content);

				// update
				$content->update_content($clean_html , $raw_content);
			}
		}

	}