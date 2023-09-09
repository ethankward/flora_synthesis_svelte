<script lang="ts">
    import TaxonLink from "../../../components/common/TaxonLink.svelte";

    import type {GroupedTaxa} from "../../../util/api_data_classes/taxon";
    import type {selectedFieldsOptions} from "../../../routes/types";

    export let grouped_checklist_taxa: GroupedTaxa;
    export let selectedFieldsOptions: selectedFieldsOptions;

</script>


<table>
    <thead>
        <tr>
            <th scope="col">Taxon Name</th>
            <th scope="col">Family</th>
            {#if selectedFieldsOptions.synonyms}
            <th scope="col">Synonyms</th>
            {/if}
            {#if selectedFieldsOptions.lifecycle}
            <th scope="col">Life cycle</th>
            {/if}
            {#if selectedFieldsOptions.introduced}
            <th scope="col">Introduced status</th>
            {/if}
            {#if selectedFieldsOptions.endemic}
            <th scope="col">Endemic status</th>
            {/if}
            {#if selectedFieldsOptions.first_observation_date}
            <th scope="col">First observed on</th>
            {/if}
            {#if selectedFieldsOptions.last_observation_date}
            <th scope="col">Last observed on</th>
            {/if}
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(grouped_checklist_taxa).sort() as [group_title, group_taxa]}
        {#each group_taxa as taxon}
        <tr>
            <td><TaxonLink taxon={taxon} /></td>
            <td>{taxon.family}</td>
            {#if selectedFieldsOptions.synonyms}
            <td>{#each taxon.synonyms as taxon_synonym, i}{#if i > 0},&nbsp;{/if}{taxon_synonym.display}{/each}</td>
            {/if}
            {#if selectedFieldsOptions.lifecycle}
            <td>{taxon.life_cycle_display}</td>
            {/if}
            {#if selectedFieldsOptions.introduced}
            <td>{taxon.introduced_display}</td>
            {/if}
            {#if selectedFieldsOptions.endemic}
            <td>{taxon.endemic_display}</td>
            {/if}
            {#if selectedFieldsOptions.first_observation_date}
            <td>{#if taxon.first_observation_date}{taxon.first_observation_date.date}{/if}</td>
            {/if}
            {#if selectedFieldsOptions.last_observation_date}
            <td>{#if taxon.last_observation_date}{taxon.last_observation_date.date}{/if}</td>
            {/if}
        </tr>
        {/each}
        {/each}
    </tbody>
</table>
