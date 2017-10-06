<?php

	namespace Website\Controllers;

	use \Axe\Controller;
	use Website\HtmlHead;

	class __Main extends Controller {

		private $html_head_model;
		private $html_head;
		private $html_close;
		private $header;
		private $website;

		public function _construct() {

			$this->html_head_model = new HtmlHead();
			$this->html_head_model->set_title('Axe');
			$this->html_head_model->add_stylesheet($this->get_css_path('style.css'));
			if ( \Axe\Controller::get('mod-auth')->get_logged_in_user() ) $this->html_head_model->add_script($this->get_js_path('libs/react-draft-jquery-bundle.js'));

			$this->html_head = $this->get_view('html_head' ,
				array(
					"model" => $this->html_head_model
				));
			$this->html_close = $this->get_view('html_close');
			$this->header = $this->get_view('header');

			$this->website = $this->get_view(
				'website' ,
				array(
					"html_head"  => $this->html_head ,
					"html_close" => $this->html_close ,
					"header"     => $this->header
				)
			);

		}

		public function index() {

			$curr_page = 'home';

			// get views
			$login_form = Controller::get('mod-auth')->login_form();
			$signup_form = Controller::get('mod-auth')->signup_form();
			$editable_content_controller = Controller::get('mod-website/mod-editable-content');

			// add stylesheet to html head section
			$this->html_head_model->set_title($this->html_head_model->get_title() . ' - Home');
			if ( \Axe\Controller::get('mod-auth')->get_logged_in_user() ) $this->html_head_model->add_stylesheet($editable_content_controller->get_css_path('editable-content.css')) ;
			$this->html_head_model->add_stylesheet($editable_content_controller->get_css_path('themes/theme-1.css')) ;

			// add editable page to website
			$this->website->update_params(
				array(
					"login_form"       => $login_form ,
					"signup_form"      => $signup_form ,
					"editable_content" => $editable_content_controller->index($curr_page)
				)
			);

			// return website
			return $this->website;
		}
	}