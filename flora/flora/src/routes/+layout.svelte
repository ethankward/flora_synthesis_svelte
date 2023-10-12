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

  function randomBgImage() {
    var seconds = Math.floor(new Date().getTime() / 1000);
    let x = (seconds % 8) + 1;
    return `/src/lib/images/bg_${x}.JPG`;
  }
</script>

<div class="nav-container" data-theme="dark">
  <nav class="container-fluid">
    <ul>
      <li><strong><a href="/">Home</a></strong></li>
      <li>
        <small><strong><a href="/checklists">Checklists</a></strong></small>
      </li>
      <li>
        <small
          ><strong><a href="/population_ranges">Population ranges</a></strong
          ></small
        >
      </li>
      <li>
        <small><strong><a href="/introduced">Introduced</a></strong></small>
      </li>
      <li><small><strong><a href="/endemic">Endemic</a></strong></small></li>
      <li>
        <small><strong><a href="/life_cycles">Life cycles</a></strong></small>
      </li>
      <li>
        <small
          ><strong><a href="/observation_dates">Observation dates</a></strong
          ></small
        >
      </li>
      <li>
        <small><strong><a href="/collectors">Collectors</a></strong></small>
      </li>
      <li>
        <small
          ><strong
            ><a href="/personal_collection_records"
              >Personal collection records</a
            ></strong
          ></small
        >
      </li>
      <li>
        <small> <strong><a href="/dashboard">Dashboard</a></strong></small>
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

<main
  class="container-fluid"
  data-theme="dark"
  style="--image: url({randomBgImage()});"
>
  <div class="content-div">
    <slot />
  </div>
</main>

<style>
  main {
    border: 1px solid #20303f;
    background: var(--image) no-repeat center fixed;
    background-size: cover;
  }

  .content-div {
    margin: 50px;
    min-height: 100vh;
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
