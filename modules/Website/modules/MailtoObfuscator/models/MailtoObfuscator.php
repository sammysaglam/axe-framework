<?php

	namespace Website;

	class MailtoObfuscator {

		public $coded  = '';
		public $cipher = '';

		public function __construct($email_address , $label) {

			$address = strtolower($email_address);
			$coded = "";
			$unmixedkey = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.@";
			$inprogresskey = $unmixedkey;
			$mixedkey = "";
			$unshuffled = strlen($unmixedkey);
			for ( $i = 0 ; $i <= strlen($unmixedkey) ; $i++ ) {
				$ranpos = rand(0 , $unshuffled-1);
				$nextchar = @$inprogresskey{$ranpos};
				$mixedkey .= $nextchar;
				$before = substr($inprogresskey , 0 , $ranpos);
				$after = substr($inprogresskey , $ranpos+1 , $unshuffled-($ranpos+1));
				$inprogresskey = $before . '' . $after;
				$unshuffled -= 1;
			}
			$cipher = $mixedkey;

			$shift = strlen($address);

			for ( $j = 0 ; $j < strlen($address) ; $j++ ) {
				if ( strpos($cipher , $address{$j}) == -1 ) {
					$chr = $address{$j};
					$coded .= $address{$j};
				} else {
					$chr = (strpos($cipher , $address{$j})+$shift) % strlen($cipher);
					$coded .= $cipher{$chr};
				}
			}

			$this->coded = $coded;
			$this->cipher = $cipher;
		}
	}