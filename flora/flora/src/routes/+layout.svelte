<script lang="ts">
  import "@picocss/pico";
  import TaxonNameAutocompletion from "../components/common/TaxonNameAutocompletion.svelte";
  import type { TaxonNameType } from "../data_classes/types";

  let selectedTaxon: TaxonNameType | undefined;

  async function goToTaxon() {
    if (selectedTaxon !== undefined) {
      window.location.href = "/taxon_detail/" + selectedTaxon.id;
    }
  }
</script>

<div class="nav-container" data-theme="dark">
  <nav class="container-fluid">
    <ul>
      <li><strong><a href="/">Home</a></strong></li>
      <li><strong><a href="/checklists">Checklists</a></strong></li>
      <li>
        <strong><a href="/population_ranges">Population ranges</a></strong>
      </li>
      <li><strong><a href="/introduced">Introduced</a></strong></li>
      <li><strong><a href="/endemic">Endemic</a></strong></li>
      <li><strong><a href="/life_cycles">Life cycles</a></strong></li>
      <li>
        <strong><a href="/observation_dates">Observation dates</a></strong>
      </li>
      <li><strong><a href="/collectors">Collectors</a></strong></li>
      <li>
        <strong
          ><a href="/personal_collection_records">Personal collection records</a
          ></strong
        >
      </li>
      <li>
        <strong><a href="/herbarium_reports">Herbarium reports</a></strong>
      </li>
    </ul>
    <ul>
      <li>
        <div>
          <TaxonNameAutocompletion
            bind:selectedItem={selectedTaxon}
            onChangeFunction={goToTaxon}
            placeholder_text={"Search taxa"}
          />
        </div>
      </li>
    </ul>
  </nav>
</div>

<main class="container-fluid" data-theme="dark">
  <div class="content-div">
    <slot />
  </div>
</main>

<style>
  main {
    background-color: rgb(246, 246, 246);
    border: 1px solid rgb(207, 221, 228);
  }

  .content-div {
    margin: 50px;
  }

  .nav-container {
    background-color: #20303f;
  }

  :global(.error) {
    background-color: rgb(185, 59, 59);
  }
  :global(.success) {
    background-color: rgb(87, 177, 87);
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
