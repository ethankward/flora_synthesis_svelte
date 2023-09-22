<script lang="ts">
    import TaxonLink from "../../../components/common/TaxonLink.svelte";

    import type { GroupedTaxa } from "../../../data_classes/taxon";
    import type { selectedFieldsOptions } from "../types";

    export let grouped_checklist_taxa: GroupedTaxa;
    export let selectedFieldsOptionsValues: selectedFieldsOptions;
</script>

<table>
    <thead>
        <tr>
            <th scope="col">Taxon Name</th>
            <th scope="col">Family</th>
            {#if selectedFieldsOptionsValues.synonyms}
                <th scope="col">Synonyms</th>
            {/if}
            {#if selectedFieldsOptionsValues.lifecycle}
                <th scope="col">Life cycle</th>
            {/if}
            {#if selectedFieldsOptionsValues.introduced}
                <th scope="col">Introduced status</th>
            {/if}
            {#if selectedFieldsOptionsValues.endemic}
                <th scope="col">Endemic status</th>
            {/if}
            {#if selectedFieldsOptionsValues.first_observation_date}
                <th scope="col">First observed on</th>
            {/if}
            {#if selectedFieldsOptionsValues.last_observation_date}
                <th scope="col">Last observed on</th>
            {/if}
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(grouped_checklist_taxa).sort() as [group_title, group_taxa]}
            {#each group_taxa as taxon}
                <tr>
                    <td><TaxonLink {taxon} /></td>
                    <td>{taxon.family()}</td>
                    {#if selectedFieldsOptionsValues.synonyms}
                        <td
                            >{#each taxon.synonyms() as taxon_synonym, i}{#if i > 0},&nbsp;{/if}{taxon_synonym.display}{/each}</td
                        >
                    {/if}
                    {#if selectedFieldsOptionsValues.lifecycle}
                        <td>{taxon.life_cycle_display()}</td>
                    {/if}
                    {#if selectedFieldsOptionsValues.introduced}
                        <td>{taxon.introduced_display()}</td>
                    {/if}
                    {#if selectedFieldsOptionsValues.endemic}
                        <td>{taxon.endemic_display()}</td>
                    {/if}
                    {#if selectedFieldsOptionsValues.first_observation_date}
                        <td
                            >{#if taxon.first_observation_date()}{taxon.first_observation_date()}{/if}</td
                        >
                    {/if}
                    {#if selectedFieldsOptionsValues.last_observation_date}
                        <td
                            >{#if taxon.last_observation_date()}{taxon.last_observation_date()}{/if}</td
                        >
                    {/if}
                </tr>
            {/each}
        {/each}
    </tbody>
</table>
