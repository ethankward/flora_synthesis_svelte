<script lang="ts">
    import type {Taxon} from "../../data_classes/taxon";

    export let taxon: Taxon;
    export let new_tab: boolean = true;

</script>

{#if taxon.primary}
<a href={"/taxon_detail/" + taxon.id} target={new_tab ? "_blank" : ""} rel="external">{taxon.taxon_name}</a>
{:else}
{taxon.taxon_name}
{/if}
