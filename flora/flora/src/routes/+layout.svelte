<script lang="ts">
    import "@picocss/pico";
</script>


<main class="container" data-theme="dark">

    <nav>
        <ul>
          <li><strong><a href="/">Checklists</a></strong></li>
          <li><strong>Ranges</strong></li>
          <li><strong><a href="/introduced">Introduced</a></strong></li>
          <li><strong><a href="/endemic">Endemic</a></strong></li>
          <li><strong><a href="/life_cycles">Life Cycles</a></strong></li>
          <li><strong>Dates</strong></li>
          <li><strong>Collectors</strong></li>
        </ul>

      </nav>
    
    <slot />
</main>
