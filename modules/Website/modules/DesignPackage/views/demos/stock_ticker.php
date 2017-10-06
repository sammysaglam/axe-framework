<style>
	.stock-ticker {
		width:500px ;
	}

	.ticker-wrap {
		background-color : #000;
	}

	.ticker {
		height      : 4rem;
		line-height : 4rem;
	}

	.ticker-item {
		font-family  : Helvetica, Arial, sans-serif;
		font-weight  : bold;
		color        : #FFFFFF;
		margin-right : 50px;
	}

	.ticker-item .label {
		display      : inline-block;
		margin-right : 5px;
	}

	.ticker-item .price {
		color : #F60;
	}

	.ticker-item .up {
		color : #0F0;
	}

	.ticker-item .down {
		color : #F00;
	}
</style>
<div class="stock-ticker">
	<div class="ticker-wrap">
		<?php for ( $i = 0 ; $i < 3 ; $i++ ) { ?>
			<div class="ticker">
				<div class="ticker-item">
					<span class="label">Land Securities</span>
					<span class="price">739.50</span>
					<span class="direction-arrow up">▲</span>
					<span class="percentage-change">23.5%</span>
				</div>
				<div class="ticker-item">
					<span class="label">EUR/USD</span>
					<span class="price">739.50</span>
					<span class="direction-arrow up">▲</span>
					<span class="percentage-change">23.5%</span>
				</div>
				<div class="ticker-item">
					<span class="label">GOLD</span>
					<span class="price">739.50</span>
					<span class="direction-arrow down">▼</span>
					<span class="percentage-change">23.5%</span>
				</div>
				<div class="ticker-item">
					<span class="label">Silver</span>
					<span class="price">739.50</span>
					<span class="direction-arrow up">▲</span>
					<span class="percentage-change">23.5%</span>
				</div>
				<div class="ticker-item">
					<span class="label">USD/TRY</span>
					<span class="price">739.50</span>
					<span class="direction-arrow down">▼</span>
					<span class="percentage-change">23.5%</span>
				</div>
			</div>
		<?php } ?>
	</div>
</div>