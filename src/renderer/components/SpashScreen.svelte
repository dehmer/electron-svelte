<script>
</script>

<main>
  <h1>ODINv2</h1>
  <h2>Electron/Svelte Showcase</h2>
  <div class='address'>
    <span>Syncpoint GmbH</span>
    <span>Simmeringer Hauptstraße 48/2/48</span>
    <span>A-1110 Wien</span>  
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: 100;
	}

  h2 {
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
	}

  span {
		/* color: #ff3e00; */
		text-transform: uppercase;
		font-size: 1.5em;
		font-weight: 100;
	}

  .address {
    display: flex;
    flex-direction: column;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>