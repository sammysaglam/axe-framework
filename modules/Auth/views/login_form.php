<div class="login-form" style="width:250px ; background-color:#f1f1f1 ; padding:1px 20px 20px 20px ; box-shadow: 3px 5px 5px #CCC ;">
	<h3>Login</h3>
	<?php
		if ( ($logged_in_user = \Axe\Controller::get('mod-auth')->get_logged_in_user()) === false ) {
			?>
			<form action="/auth/authenticate" method="post">
				<?php \Axe\CSRF::get_form_value('login-form' , true) ?>
				<div style="display: flex ; justify-content:space-between ;">
					Username: <input type="text" name="username" placeholder="Username"/>
				</div>
				<div style="display: flex ; justify-content:space-between ; margin-bottom:10px ;">
					Password: <input type="password" name="password" placeholder="Password"/>
				</div>
				<input type="hidden" name="redirect-target" value="/" />
				<input type="submit" value="Login" style="width:100% ; padding:5px 0"/>
			</form>
		<?php } else { ?>
			Welcome <b><?php echo $logged_in_user->username; ?></b>! <?php echo \Axe\Controller::get('mod-auth/web')->logout_button(); ?>
		<?php } ?>
</div>