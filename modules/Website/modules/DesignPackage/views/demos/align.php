<style>

	.wrapper {
		border : solid 3px #AE2;
		height:<?php echo rand(100,160) ; ?>px ;
		margin-bottom:30px ;
	}

	.wrapper div {
		border : solid 1px #926dee;
	}

</style>
<div class="wrapper vertical-align-children-middle">
	<div style="padding:25px ;">hello!</div>
	<div style="padding:20px ;">we</div>
	<div>are</div>
	<div>middle</div>
	<div style="padding:10px ;">aligned</div>
</div>

<div class="wrapper vertical-align-children-baseline">
	<div style="height:60px ;">hello!</div>
	<div style="height:40px ; padding:10px ;">we</div>
	<div>are</div>
	<div>baseline</div>
	<div style="height:30px ; padding-top:30px ;">aligned</div>
</div>

<div class="wrapper vertical-align-children-top">
	<div style="height:60px ;">hello!</div>
	<div style="height:40px ; padding:10px ;">we</div>
	<div>are</div>
	<div>top</div>
	<div style="height:30px ; padding-top:30px ;">aligned!</div>
	<div style="height:30px ; padding-top:30px ;" class="vertical-align-bottom">but i'm individually aligned at the bottom</div>
	<div style="height:30px ; padding-top:30px ;">while, i am still top</div>
</div>