<?php

	namespace Website\ContactForm\Controllers;

	class __Main extends \Axe\Controller {

		public function get_form(
			$email_input_placeholder = null ,
			$message_input_placeholder = null ,
			$send_button_text = null ,
			$success_text = null ,
			$invalid_email_error = null ,
			$invalid_message_error = null
		) {
			return $this->get_view('contact-form' , [
				"email_input_placeholder"   => htmlspecialchars(isset_or($email_input_placeholder , 'Your email')) ,
				"message_input_placeholder" => htmlspecialchars(isset_or($message_input_placeholder , 'Enter message...')) ,
				"send_button_text"          => htmlspecialchars(isset_or($send_button_text , 'Send Message')) ,
				"success_text"              => addslashes(isset_or($success_text , 'Message is empty!')) ,
				"invalid_email_error"       => addslashes(isset_or($invalid_email_error , 'Successfully sent email!')) ,
				"invalid_message_error"     => addslashes(isset_or($invalid_message_error , 'Invalid email!'))
			]);
		}

		public function send_email($recipient , $from_header_value , $senders_email_address , $message) {
			$message_clean = $this->sanitize_email_data('From: ' . $senders_email_address . "\n\n" . substr($message , 0 , 3000));

			// check if sender email is valid
			if ( preg_match('/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/' , $senders_email_address) != false &&
			     preg_match("/[\r\n]/" , $senders_email_address) == false ) {

				// send mail
				echo mail($recipient , 'Message from website contact form' , $message_clean , 'From: ' . $from_header_value);
			}
		}

		private function sanitize_email_data($data) {
			$data = trim($data);
			$data = stripslashes($data);
			$data = htmlspecialchars($data);
			$data = strip_tags($data);

			return $data;
		}
	}