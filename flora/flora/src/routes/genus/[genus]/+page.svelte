<script lang="ts">
    import type { TaxonType } from "../../../data_classes/types";

    export let data;

    let taxa: TaxonType[] = data.taxon_data;

    let families = [... new Set(taxa.map((taxon) => taxon.family))];

</script>
<h3>Genus: <mark>{data.genus}</mark>
    {#if families.length > 0}
    ({#if families.length == 1}
        family
    {:else}
        families
    {/if} 
    {#each families as family, i}
        {#if i > 0},&nbsp;{/if}
        <a href="/family/{family}">{family}</a>{/each})
    {/if}
</h3>
<article>
    
    <ul>
        {#each taxa as taxon}
        <li><a href={"/taxon_detail/" + taxon.id} rel="external">{taxon.taxon_name}</a></li>
        {/each}
    </ul>
    
</article>
