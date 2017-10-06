<?php

	namespace Website\MailtoObfuscator\Controllers;

	use Axe\Controller;
	use Website\MailtoObfuscator;

	class __Main extends Controller {

		public function mailto_link($email_address , $label = 'same-as-email') {

			$obfuscator = new MailtoObfuscator($email_address , $label);

			return $this->get_view('mailto_link' , array(
				"coded"                  => $obfuscator->coded ,
				"cipher"                 => $obfuscator->cipher ,
				"label"                  => $label ,
				"is_label_same_as_email" => ($label == $email_address || $label === 'same-as-email')
			));
		}

	}