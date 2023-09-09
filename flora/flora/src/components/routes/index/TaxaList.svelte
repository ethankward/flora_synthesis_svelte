<script lang="ts">
    import TaxonLink from "../../../components/common/TaxonLink.svelte";
    import TaxonNameLink from "../../../components/common/TaxonNameLink.svelte";
    import TaxonExternalLinks from "../../../components/common/TaxonExternalLinks.svelte";

    import type {GroupedTaxa} from "../../../data_classes/taxon";
    import type {selectedFieldsOptions} from "../../../routes/types";

    export let grouped_checklist_taxa: GroupedTaxa;
    export let selectedFieldsOptions: selectedFieldsOptions;

</script>


{#each Object.entries(grouped_checklist_taxa).sort() as [group_title, group_taxa]}
<h6>{group_title}</h6>

    {#each group_taxa as taxon}
    <ul>
        <li>
            <TaxonLink taxon={taxon} /> <TaxonExternalLinks taxon={taxon} />
            {#if taxon.all_mapped_taxa.length > 0}

            → {#each taxon.all_mapped_taxa as mapped_taxon, i}{#if i > 0},&nbsp;{/if}<TaxonNameLink taxon={mapped_taxon} />{/each}

            {/if}

            {#if selectedFieldsOptions.lifecycle}
            <ul>
                <li>
                    <small>Life cycle: {taxon.life_cycle_display}</small>
                </li>
            </ul>
            {/if}

            {#if selectedFieldsOptions.introduced}
            <ul>
                <li>
                    <small>Introduced status: {taxon.introduced_display}</small>
                </li>
            </ul>
            {/if}

            {#if selectedFieldsOptions.endemic}
            <ul>
                <li>
                    <small>Endemic status: {taxon.endemic_display}</small>
                </li>
            </ul>
            {/if}

            {#if taxon.synonyms.length > 0 && selectedFieldsOptions.synonyms}
                <ul>
                    <li>
                        <small>Synonyms: {#each taxon.synonyms as taxon_synonym, i}{#if i > 0},&nbsp;{/if}{taxon_synonym.display}{/each}</small>
                    </li>
                </ul>
            {/if}

            {#if selectedFieldsOptions.first_observation_date && taxon.first_observation_date}
            <ul>
                <li>
                    <small>First observation date: {taxon.first_observation_date.date}</small>
                </li>
            </ul>
            {/if}
            
            {#if selectedFieldsOptions.last_observation_date && taxon.last_observation_date}
            <ul>
                <li>
                    <small>Last observation date: {taxon.last_observation_date.date}</small>
                </li>
            </ul>
            {/if}
            
        </li>
    </ul>
    {/each}
{/each}
