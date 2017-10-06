<div data-editable-content-id="<?php echo $id; ?>" class="axe-editable_content<?php echo $is_user_allowed_to_edit ? ' allow_edit' : '' ?>">
	<?php if ( !$is_user_allowed_to_edit ) {
		echo $html_content;
	} else { ?>
		<div style="display:none ;" class="raw-content"><?php echo htmlspecialchars($raw_content); ?></div>
		<script src="<?php echo $this->get_js_path('editable_content.min.js'); ?>"></script>
	<?php } ?>
</div>