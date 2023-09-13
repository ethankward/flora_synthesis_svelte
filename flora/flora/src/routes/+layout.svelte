<script lang="ts">
    import { goto } from '$app/navigation';
  	import AutoComplete from "simple-svelte-autocomplete";
    import "@picocss/pico";
    import {callExternalEndpoint} from "../util/local_api_dispatch";
    import type {TaxonNameType} from "../data_classes/types";

    let selectedTaxon: TaxonNameType | undefined;

    async function getTaxonAutocompletion(search_term: string) {
      return await callExternalEndpoint({search_term: search_term}, "get_taxa_autocompletion");
    }

    async function goToTaxon() {
      if (selectedTaxon) {
        await goto("/");
        goto('/taxon_detail/' + selectedTaxon.id);
      }
    }

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
          <li>Go to taxon:
            <form>
            <AutoComplete
            
            searchFunction="{getTaxonAutocompletion}"
            delay="200"
            localFiltering={false}
            labelFieldName="taxon_name"
            valueFieldName="pk"
            hideArrow={true}
            required={true}
            bind:selectedItem={selectedTaxon}
            onChange={goToTaxon}
            />
          </form>
          </li>
        </ul>

      </nav>
    <hr>

      <slot />

</main>


<style>
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
