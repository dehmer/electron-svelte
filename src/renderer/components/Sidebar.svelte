<script>
  import { getContext } from 'svelte'
  import './Sidebar.scss'

  const { sessionMemento } = getContext('services')
  const filter = sessionMemento('filter', '')
</script>

<div class='sidebar'>
  <div class='filter-container'>
    <input class='filter' bind:value={$filter}>
  </div>
  <div class='sidebar__list'></div>
</div>