<script lang="ts">
    import type { TaxonOrChecklistTaxon } from "../../data_classes/taxon";

    export let taxon: TaxonOrChecklistTaxon;
    export let new_tab: boolean = true;
</script>

{#if !taxon.is_checklist_taxon}
    <a
        href={"/taxon_detail/" + taxon.id()}
        target={new_tab ? "_blank" : ""}
        rel="external">{taxon.taxon_name()}</a
    >
{:else}
    {taxon.taxon_name()}
{/if}
