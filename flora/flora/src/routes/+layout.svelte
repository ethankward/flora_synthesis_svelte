<script lang="ts">
    import "@picocss/pico";
</script>


<main class="container" data-theme="dark" >

    <nav>
        <ul>
          <li><strong><a href="/">Home</a></strong></li>
          <li><strong><a href="/checklists">Checklists</a></strong></li>
          <li><strong>Ranges</strong></li>
          <li><strong><a href="/introduced">Introduced</a></strong></li>
          <li><strong><a href="/endemic">Endemic</a></strong></li>
          <li><strong><a href="/life_cycles">Life cycles</a></strong></li>
          <li><strong><a href="/observation_dates">Observation dates</a></strong></li>
          <li><strong>Collectors</strong></li>
        </ul>

      </nav>
    <hr>

      <slot />

</main>
