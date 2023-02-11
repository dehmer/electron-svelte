<script>
  import './Map.scss'
  import * as ol from 'ol'
  import { OSM } from 'ol/source'
  import { Tile as TileLayer } from 'ol/layer'
  import { onMount, onDestroy, getContext } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  let map
  let services = getContext('services')
  const { sessionMemento } = services
  let component
  let loading = 0

  const dispatch = createEventDispatcher()

  onMount(async () => {

    // --- SNIP --- 8><--------- => map.view
    const zoom = 14
    const center = [1737884.370211603, 6146136.723228034]
    const defaultViewport = { zoom, center }
    const viewport = sessionMemento('viewport', defaultViewport)
    const view = new ol.View(await viewport.get())

    view.on('change', () => viewport.set({
      center: view.getCenter(),
      resolution: view.getResolution(),
      zoom: view.getZoom(),
      rotation: view.getRotation()
    }))
    // --- SNIP --- 8><--------- <= map.view

    const loadstart = () => (loading += 1)
    const loadend = () => (loading -= 1)

    const source = new OSM()
    source.on('tileloadstart', loadstart)
    source.on(['tileloadend', 'tileloaderror'], loadend)
    const tileLayer = new TileLayer({ source })

    map = new ol.Map({
      target: 'map',
      layers: [tileLayer],
      view,
      controls: []
    })

    component.focus()
  })

  onDestroy(() => {
    map.setTarget(null)
    map = null
  })

  $: {
    if (loading === 0) dispatch('ready')
  }
</script>

<div bind:this={component} id='map' class='map' tabIndex='0'/>
