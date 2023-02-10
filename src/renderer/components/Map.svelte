<script>
  import './Map.scss'
  import * as ol from 'ol'
  import { OSM } from 'ol/source'
  import { Tile as TileLayer } from 'ol/layer'
  import { onMount, onDestroy, getContext } from 'svelte'

  let map
  let services = getContext('services')
  const { sessionValue } = services
  let component

  onMount(async () => {

    // --- SNIP --- 8><--------- => map.view
    const zoom = 14
    const center = [1737884.370211603, 6146136.723228034]
    const defaultViewport = { zoom, center }
    const viewport = sessionValue('viewport', defaultViewport)
    const view = new ol.View(await viewport.get())

    view.on('change', () => viewport.set({
      center: view.getCenter(),
      resolution: view.getResolution(),
      zoom: view.getZoom(),
      rotation: view.getRotation()
    }))
    // --- SNIP --- 8><--------- <= map.view


    const source = new OSM()
    source.on('tileloadstart', () => console.log('tileloadstart'))
    source.on(['tileloadend', 'tileloaderror'], () => console.log('tileloadend'))
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
</script>

<div bind:this={component} id='map' class='map' tabIndex='0'/>
