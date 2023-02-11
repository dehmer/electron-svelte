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
  let dispose

  onMount(async () => (dispose = await initialize(x => (services = x))))
  onDestroy(async () => await dispose())

  const handleKeyDown = event => {
    if (event.ctrlKey && event.metaKey && event.key === 's') {
      sidebar.update(R.not)
    }
  }

  const handleReady = () => setTimeout(() => (splash = false), 750)

  $: {
	  if (services) {
      setContext('services', services)
      const { sessionMemento } = services
      sidebar = sessionMemento('sidebar', false)
    }
  }
</script>

{#if services}
  <div class='site' tabIndex=0 on:keydown={handleKeyDown}>
    <div class='content'>
      <Map on:ready={handleReady}/>
      <div class='overlay'>
        {#if $sidebar}
          <Sidebar/>
        {/if}
      </div>
      {#if splash}
        <SpashScreen/>
      {/if}
    </div>
  </div>
{/if}
