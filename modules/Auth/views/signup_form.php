<div class="registration-form">
	<h3>Register</h3>
	<form action="/auth/register" method="post">
		<?php \Axe\CSRF::get_form_value('signup-form',true) ?>
		<input type="text" name="username" placeholder="Username" />
		<input type="password" name="password" placeholder="Password" />
		<input type="submit" value="Sign Up" />
	</form>
</div>