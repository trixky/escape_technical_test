<!-- ****************************************************** SCRIPT -->
<script lang="ts">
	import LogoReddit from 'virtual:icons/mdi/reddit';
	import LogoTwitter from 'virtual:icons/mdi/twitter';
	import LogoInstagram from 'virtual:icons/mdi/instagram';

	const LOGO_WIDTH = 30;
	const AOS_OFFSET = -1000;
</script>

<!-- ****************************************************** CONTENT -->
<footer>
	<h3 data-aos="fade-up" data-aos-offset={AOS_OFFSET}>Follow us</h3>
	<ul class="logo-container">
		<li>
			<a href="https://www.reddit.com/" target="_blank">
				<LogoReddit
					data-aos="fade-up"
					data-aos-delay="50"
					data-aos-offset={AOS_OFFSET}
					width={LOGO_WIDTH}
					height={LOGO_WIDTH}
					color="black"
				/>
			</a>
		</li>
		<li>
			<a href="https://x.com/" target="_blank">
				<LogoTwitter
					data-aos="fade-up"
					data-aos-delay="100"
					data-aos-offset={AOS_OFFSET}
					width={LOGO_WIDTH}
					height={LOGO_WIDTH}
					color="black"
				/>
			</a>
		</li>
		<li>
			<a href="https://www.instagram.com/" target="_blank">
				<LogoInstagram
					data-aos="fade-up"
					data-aos-delay="150"
					data-aos-offset={AOS_OFFSET}
					width={LOGO_WIDTH}
					height={LOGO_WIDTH}
					color="black"
				/>
			</a>
		</li>
	</ul>
</footer>

<!-- ****************************************************** STYLE -->
<style>
	footer {
		margin: auto;
		display: flex;
		flex-direction: column;
		gap: 20px;
		justify-content: center;
		align-items: center;
		padding: 40px;
		margin-top: auto;
	}

	.logo-container {
		display: flex;
		gap: 20px;
	}

	li {
		opacity: 0.2;
		transition: opacity 200ms;
	}

	li:hover {
		opacity: 1;
	}
</style>
