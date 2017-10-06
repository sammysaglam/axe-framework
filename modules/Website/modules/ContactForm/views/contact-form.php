<div class="contact-form">
	<div>
		<input type="text" placeholder="<?php echo $email_input_placeholder; ?>" class="email"/>
		<textarea class="message" placeholder="<?php echo $message_input_placeholder; ?>"></textarea>
		<button class="send"><?php echo $send_button_text; ?></button>
	</div>
</div>
<script>
	$(document).ready(function() {

		var showErrors = false;

		var validateEmail = function(emailElement) {
			if ( $(emailElement).val().match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) ) {
				if ( showErrors ) $(emailElement).addClass('valid');
				$(emailElement).removeClass('invalid');
				return true;

			} else {
				$(emailElement).removeClass('valid');
				if ( showErrors ) $(emailElement).addClass('invalid');
				return false;
			}
		}
		$(".email").each(function(index , emailElement) {
			$(emailElement).bind("input propertychange" , function() {
				validateEmail(emailElement)
			});
			if ( $(emailElement).val() != '' ) validateEmail(emailElement);
		});

		$(".send").click(function() {
			var contactForm = $(this).parents(".contact-form:first");

			// check if valid email
			if ( validateEmail($(contactForm).find(".email")) ) {

				// check if message is not empty
				var message = $(contactForm).find(".message").val();
				if ( message.replace(/\s/g) === '' ) {
					alert('<?php echo $invalid_message_error; ?>');
					$(contactForm).find(".message").focus().select();
					return false;
				}

				// disable all inputs
				$(contactForm).find("input , button , textarea").prop('disabled' , true);
				$(contactForm).find(".send").html('Sending...');

				// send email
				$.ajax({
					url    :'/contact-form/send' ,
					type   :'POST' ,
					data   :{sender:$(contactForm).find(".email").val() , message:message} ,
					success:function(success) {
						if ( success ) {
							$(contactForm).html('<strong class="success"><?php echo $success_text; ?></strong>')
						} else {
							alert('Failed to send email! Please try again!');
							$(contactForm).find("input , button , textarea").prop('disabled' , false);
							$(contactForm).find(".send").html('Failed! Click to try again');
						}
					}
				});

			} else {
				showErrors = true;
				validateEmail($(contactForm).find(".email"))
				alert('<?php echo $invalid_email_error; ?>');
				$(contactForm).find(".email").focus().select();
				return false;
			}

		});

	});
</script>