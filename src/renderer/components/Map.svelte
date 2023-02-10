<script>
  import './Map.scss'
  import * as ol from 'ol'
  import { OSM } from 'ol/source'
  import { Tile as TileLayer } from 'ol/layer'
  import { onMount, onDestroy, getContext } from 'svelte'

  let map
  let services = getContext('services')

  onMount(() => {
    const center = [1737884.370211603, 6146136.723228034]
    const zoom = 14
    const view = new ol.View({ center, zoom })
    const tileLayer = new TileLayer({ source: new OSM() })

    map = new ol.Map({
      target: 'map',
      layers: [tileLayer],
      view,
      interactions: []
    })
  })

  onDestroy(() => {
    map.setTarget(null)
    map = null
  })

</script>

<div id='map' class='map' tabIndex='0'/>
