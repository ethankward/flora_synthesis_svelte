<script lang="ts">
    import type { TaxonType } from "../../../data_classes/types";
    import FNALink from "../../../components/common/FNALink.svelte";

    export let data;

    let taxa: TaxonType[] = data.taxon_data;

    let families = [...new Set(taxa.map((taxon) => taxon.family))];
</script>

<svelte:head>
    <title>{data.genus}</title>
</svelte:head>

<article>
    <header>
        Genus <mark>{data.genus}</mark>
        {#if families.length > 0}
            ({#if families.length === 1}
                family
            {:else}
                families
            {/if}
            {#each families as family, i}
                {#if i > 0},&nbsp;{/if}
                <a href="/family/{family}">{family}</a>{/each})
        {/if}
        <FNALink target={data.genus} />
    </header>

    <ul>
        {#each taxa as taxon}
            <li>
                {#if !taxon.taxon_checklist_taxa.some((checklist_taxon) => checklist_taxon.primary_checklist)}
                    <del
                        ><a href={"/taxon_detail/" + taxon.id}
                            >{taxon.taxon_name}</a
                        ></del
                    >
                {:else}
                    <a href={"/taxon_detail/" + taxon.id}>{taxon.taxon_name}</a>
                {/if}
            </li>
        {/each}
    </ul>
</article>
