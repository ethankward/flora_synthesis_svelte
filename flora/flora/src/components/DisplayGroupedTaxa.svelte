<script lang="ts">
    import TaxonLink from "./TaxonLink.svelte";
    import TaxonNameLink from "./TaxonNameLink.svelte";

    import type {GroupedTaxa} from "../util/api_data_classes/taxon";

    export let grouped_checklist_taxa: GroupedTaxa;
</script>


{#each Object.entries(grouped_checklist_taxa).sort() as [group_title, group_taxa]}
<h6>{group_title}</h6>

    {#each group_taxa as taxon}
    <ul>
        <li>
            <TaxonLink taxon={taxon} />
            {#if taxon.all_mapped_taxa.length > 0}

            → {#each taxon.all_mapped_taxa as mapped_taxon, i}{#if i > 0},&nbsp;{/if}<TaxonNameLink taxon={mapped_taxon} />{/each}

            {/if}

            {#if taxon.synonyms.length > 0}
                <ul>
                    <li>
                        <small>Synonyms: {#each taxon.synonyms as taxon_synonym, i}{#if i > 0},&nbsp;{/if}{taxon_synonym.display}{/each}</small>
                    </li>
                </ul>
            {/if}

        </li>
    </ul>
    {/each}
{/each}
