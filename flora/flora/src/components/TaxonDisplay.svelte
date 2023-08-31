<script lang="ts">
    import TaxonLink from "../components/TaxonLink.svelte";

    export let taxon;
</script>

<TaxonLink taxon={taxon} />
{#if taxon.mapped_to.length > 0}

→ {#each taxon.mapped_to as mapped_taxon, i}{#if i > 0},&nbsp;{/if}<TaxonLink taxon={mapped_taxon} />{/each}

{/if}
