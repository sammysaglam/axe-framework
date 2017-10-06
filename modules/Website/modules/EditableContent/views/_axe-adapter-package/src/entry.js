import React from 'react';
import ReactDOM from 'react-dom';
import EditableContent from 'editable-content';
import $ from 'jquery';

$(document).ready(function() {

	$(".axe-editable_content.allow_edit:not(.js_added)").each(function(index , element) {
		$(element).addClass('js_added');

		const id         = $(element).data('editable-content-id');
		const rawContent = (function() {
			try {
				return JSON.parse($(element).find(".raw-content").html())
			} catch(e) {
				return false;
			}
		})();

		let ajaxOps;
		const ajaxSaveFn = (htmlContent , rawContent) => {
			if ( ajaxOps ) ajaxOps.abort();
			ajaxOps = $.ajax({
				url: '/save-content/' + id ,
				type:'POST' ,
				data:{
					htmlContent:htmlContent ,
					rawContent: rawContent
				}
			});
		};

		ReactDOM.render(
			<EditableContent rawContent={rawContent} saveFn={ajaxSaveFn}/> ,
			$(element).get(0)
		)
	});
});