<script lang="ts">
    import {
        ChecklistList,
    } from "../util/api_data_classes/checklist";
    import type { ChecklistAPIType } from "../util/api_data_classes/api_data_types";

    import { APIManager } from "../util/api";
    import {
        GroupBy,
        TaxonList,
        loadTaxaFromAPIData,
    } from "../util/api_data_classes/taxon";
    import type {GroupedTaxa} from "../util/api_data_classes/taxon";
    import DisplayGroupedTaxa from "../components/DisplayGroupedTaxa.svelte";
    import TaxaTable from "../components/TaxaTable.svelte";

    export let data;


    let checklists: ChecklistList = new ChecklistList(data.checklist_data);
    let selected_checklist_id: number = -1;
    let selected_checklist: ChecklistAPIType | undefined;
    let compare_to_checklist_id: number = -1;
    let compare_to_checklist: ChecklistAPIType | undefined;

    let canonical_taxa: {[key: number]: TaxonList;} = {};
    let checklist_taxa: {[key: number]: TaxonList;} = {};
    let api_manager: APIManager = new APIManager("http://127.0.0.1:8000/api/");

    let taxon_name_filter: string;

    let taxa_grouped_by: number = 0;

    let use_canonical_taxa: boolean = true;

    let grouped_checklist_taxa: GroupedTaxa = {};
    let common_taxa: GroupedTaxa = {};
    let taxa_diff_1: GroupedTaxa = {};
    let taxa_diff_2: GroupedTaxa = {};

    let hideChecklistTaxa = true;
    let hideComparisonTaxa = true;

    async function loadTaxonData(checklist_id: number) {
        return api_manager.getChecklistTaxa(checklist_id).then((response) => {
            let [loaded_canonical_taxa, loaded_checklist_taxa] = loadTaxaFromAPIData(
                response.data
            );
            canonical_taxa[checklist_id] = loaded_canonical_taxa.deduplicate();
            checklist_taxa[checklist_id] = loaded_checklist_taxa.filterByChecklist(checklist_id).deduplicate();
        });
    }

    async function getCanonicalTaxa(checklist_id: number) {
        if (!(checklist_id in canonical_taxa)) {
            grouped_checklist_taxa = {};
            await loadTaxonData(checklist_id);
        }
        return canonical_taxa[checklist_id];
    }

    async function getChecklistTaxa(checklist_id: number) {
        if (!(checklist_id in checklist_taxa)) {
            await loadTaxonData(checklist_id);
        }
        return checklist_taxa[checklist_id];
    }

    async function getVisibleTaxa(checklist_id: number) {
        let result: TaxonList;

        if (use_canonical_taxa) {
            result = await getCanonicalTaxa(checklist_id);
        } else {
            result = await getChecklistTaxa(checklist_id);
        }
        result = result.filterByTaxonNameContains(taxon_name_filter);
        return result;
    }

    function getSelectedChecklist() {
        if (selected_checklist_id != -1) {
            return checklists.checklists[selected_checklist_id];
        }
    }

    function getCompareToChecklist() {
        if (compare_to_checklist_id != -1) {
            return checklists.checklists[compare_to_checklist_id];
        }
    }

    async function handleChecklistChange() {    
        hideChecklistTaxa = true;
        hideComparisonTaxa = true;

        let visible_taxa = await getVisibleTaxa(
            selected_checklist_id,
        );

        selected_checklist = getSelectedChecklist();
        compare_to_checklist = getCompareToChecklist();

        if (selected_checklist_id != -1 && compare_to_checklist_id != -1) {
            let other_taxa = await getVisibleTaxa(compare_to_checklist_id);
            hideComparisonTaxa = false;
            common_taxa = visible_taxa
                .commonTaxa(other_taxa)
                .getGrouped(taxa_grouped_by);
            taxa_diff_1 = visible_taxa
                .differingTaxa(other_taxa)
                .getGrouped(taxa_grouped_by);
            taxa_diff_2 = other_taxa
                .differingTaxa(visible_taxa)
                .getGrouped(taxa_grouped_by);
        } else {
            hideChecklistTaxa = false;
            grouped_checklist_taxa = visible_taxa.getGrouped(taxa_grouped_by);
        }
    }

    

</script>
<svelte:head>
    <title>Checklists</title> 
</svelte:head>

<article>
    <form autocomplete="off">
        <div class="grid">
            <label for="primary_checklist_selection">
                Checklist
                <select
                    id="primary_checklist_selection"
                    bind:value={selected_checklist_id}
                    on:change={handleChecklistChange}
                >
                    <option value="-1" />
                    {#each Object.entries(checklists.checklists) as [checklist_id, checklist]}
                        <option value={checklist.id}
                            >{checklist.checklist_name}</option
                        >
                    {/each}
                </select>
            </label>

            <label for="compare_checklist_selection">
                Compare With
                <select
                    id="compare_checklist_selection"
                    bind:value={compare_to_checklist_id}
                    on:change={handleChecklistChange}
                >
                    <option value="-1" />
                    {#each Object.entries(checklists.checklists) as [checklist_id, checklist]}
                        <option value={checklist.id}
                            >{checklist.checklist_name}</option
                        >
                    {/each}
                </select>
            </label>

            <label for="group_taxa_selection">
                Group Taxa By
                <select
                    bind:value={taxa_grouped_by}
                    on:change={handleChecklistChange}
                    id="group_taxa_selection"
                >
                    <option value={GroupBy.family}>Family</option>
                    <option value={GroupBy.genus}>Genus</option>
                    <option value={GroupBy.alphabetic}>Alphabetic</option>
                </select>
            </label>
            
        </div>

        <hr>
        <details>
            <summary>More options</summary>

            <div class="grid">
                <label>
                    <input
                        type="radio"
                        bind:group={use_canonical_taxa}
                        name="taxon_source"
                        value={true}
                        on:change={handleChecklistChange}
                    />
                    Display Mapped taxa
                </label>
                <label>
                    <input
                        type="radio"
                        bind:group={use_canonical_taxa}
                        name="taxon_source"
                        value={false}
                        on:change={handleChecklistChange}
                    />
                    Display Checklist taxa
                </label>
            </div>
            <hr>
            <div class="grid">
                <label>
                    Filter taxon name:
                    <input
                        type="text"
                        bind:value={taxon_name_filter}
                        on:keyup={handleChecklistChange}
                    />
                </label>
            </div>
    
        </details>

    </form>
</article>

<article aria-busy="true" class:hide={!(hideChecklistTaxa && hideComparisonTaxa) || selected_checklist_id == -1}>

</article>
<article class:hide={(hideChecklistTaxa && hideComparisonTaxa) || selected_checklist_id == -1}>

    <div id="single_checklist_div" class:hide={hideChecklistTaxa}>
        <details open>
            <summary>Checklist Taxa: <mark>{#if selected_checklist}{selected_checklist.checklist_name}{/if}</mark></summary>
            <!--<TaxaTable bind:grouped_checklist_taxa/>-->
            <DisplayGroupedTaxa bind:grouped_checklist_taxa={grouped_checklist_taxa} />
        </details>
    </div>
    <div id="compare_checklist_div" class:hide={hideComparisonTaxa}>
        <details>
            <summary>Common Taxa</summary>
            <DisplayGroupedTaxa bind:grouped_checklist_taxa={common_taxa} />
        </details>
        <details>
            {#if selected_checklist && compare_to_checklist}
            <summary
            >In <mark>{selected_checklist.checklist_name}</mark> but not
            in
            <mark>{compare_to_checklist.checklist_name}</mark></summary
            >
            {/if}
            <DisplayGroupedTaxa bind:grouped_checklist_taxa={taxa_diff_1} />
        </details>
        <details>
            {#if selected_checklist && compare_to_checklist}
                <summary
                    >In <mark>{compare_to_checklist.checklist_name}</mark> but
                    not in
                    <mark>{selected_checklist.checklist_name}</mark></summary
                >
            {/if}
            <DisplayGroupedTaxa bind:grouped_checklist_taxa={taxa_diff_2} />
        </details>
    </div>
</article>

<style>
    .hide {
        display: none !important;
    }
</style>
