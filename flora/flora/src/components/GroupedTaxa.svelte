<script lang="ts">
    import TaxonLink from "../components/TaxonLink.svelte";

    export let grouped_checklist_taxa: any;
</script>


{#each Object.entries(grouped_checklist_taxa).sort() as [group_title, group_taxa]}
<h6>{group_title}</h6>

    {#each group_taxa as taxon}
    <ul>
        <li>
            <TaxonLink taxon={taxon} />
            {#if taxon.mapped_to.length > 0}

            → {#each taxon.mapped_to as mapped_taxon, i}{#if i > 0},&nbsp;{/if}<TaxonLink taxon={mapped_taxon} />{/each}

            {/if}

            {#if taxon.synonyms.length > 0}
                <ul>
                    <li>
                        Synonyms: {#each taxon.synonyms as taxon_synonym, i}{#if i > 0},&nbsp;{/if}{taxon_synonym.synonym}{/each}
                    </li>
                </ul>
            {/if}

        </li>
    </ul>
    {/each}
{/each}
