<script lang="ts">
  import { goto } from "$app/navigation";
  import "@picocss/pico";
  import type { TaxonNameType } from "../data_classes/types";
  import TaxonNameAutocompletion from "../components/common/TaxonNameAutocompletion.svelte";

  let selectedTaxon: TaxonNameType;

  async function goToTaxon() {
    if (selectedTaxon) {
      await goto("/empty_page");
      goto("/taxon_detail/" + selectedTaxon.id);
    }
  }
</script>

<div class="nav-container" data-theme="dark">
  <nav class="container-fluid">
    <ul>
      <li><strong><a href="/">Home</a></strong></li>
      <li><strong><a href="/checklists">Checklists</a></strong></li>
      <li><strong>Ranges</strong></li>
      <li><strong><a href="/introduced">Introduced</a></strong></li>
      <li><strong><a href="/endemic">Endemic</a></strong></li>
      <li><strong><a href="/life_cycles">Life cycles</a></strong></li>
      <li>
        <strong><a href="/observation_dates">Observation dates</a></strong>
      </li>
      <li><strong>Collectors</strong></li>
    </ul>
    <ul>
      <li>
        <div>
          <TaxonNameAutocompletion
            bind:selectedItem={selectedTaxon}
            onChangeFunction={goToTaxon}
          />
        </div>
      </li>
    </ul>
  </nav>
</div>

<main class="container-fluid" data-theme="dark">
  <slot />
</main>

<style>
  .nav-container {
    background-color: #20303f;
  }

  :global(.error) {
    background-color: red;
  }
  :global(.success) {
    background-color: green;
  }
  :global(.fake-link) {
    color: #1095c1;
    cursor: pointer;
  }
  :global(.fake-link:hover) {
    text-decoration: underline;
  }
  :global(.hide) {
    display: none !important;
  }
</style>
