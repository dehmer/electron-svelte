<script>
  import * as R from 'ramda'
  import { onMount, onDestroy, setContext } from 'svelte'
  import './App.scss'
  import initialize from '../services'
  import Sidebar from './Sidebar.svelte'
  import Map from './Map.svelte'
  import SpashScreen from './SpashScreen.svelte'

  let services
  let splash = true
  let sidebar

  onMount(async () => (services = await initialize()))
  onDestroy(() => console.log('destroying...'))
  setTimeout(() => (splash = false), 1000)

  const handleKeyDown = event => {
    if (event.ctrlKey && event.metaKey && event.key === 's') {
      sidebar.update(R.not)
    }
  }
  
  $: {
	  if (services) {
      setContext('services', services)
      const { sessionValue } = services
      sidebar = sessionValue('sidebar', false)
    }
  }
</script>

{#if splash}
  <SpashScreen/>
{:else if services}
  <div class='site' tabIndex=0 on:keydown={handleKeyDown}>
    <div class='content'>
      <Map/>
      <div class='overlay'>
        {#if $sidebar}
          <Sidebar/>
        {/if}
      </div>
    </div>
  </div>
{/if}
