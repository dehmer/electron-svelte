<script>
  import { onMount, setContext } from 'svelte'
  import './App.scss'
  import initialize from '../services'
  import Sidebar from './Sidebar.svelte'
  import Map from './Map.svelte'

  let services
  onMount(async () => (services = await initialize()))

  $: {
	  if (services) {
		  setContext('services', services)
	  }
  }
</script>

<div class='site'>
  {#if services}
    <div class='content'>
      <Map/>
      <div class='overlay'>
        <Sidebar/>
      </div>
    </div>
  {:else}
    <div/>
  {/if}
</div>
