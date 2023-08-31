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
    import GroupedTaxa from "../components/GroupedTaxa.svelte";
    import TaxaTable from "../components/TaxaTable.svelte";

    export let data;

    let checklists = new ChecklistList(data.checklist_data.data);
    let loaded_taxon_data = false;
    let canonical_taxa = new TaxonList([]);
    let checklist_taxa = new TaxonList([]);

    let visible_taxa: TaxonList;
    let common_taxa = {};
    let taxa_diff_1 = {};
    let taxa_diff_2 = {};
    let grouped_checklist_taxa = {};
    let selected_checklist_id: number;
    let selected_checklist: ChecklistAPIType;
    let compare_to_checklist_id: number;
    let compare_to_checklist: ChecklistAPIType;
    let grouped_by: number;
    let taxon_source = 1;
    let taxon_name_filter: string;

    function loadTaxonData() {
        let api_manager = new APIManager("http://127.0.0.1:8000/api/");
        return api_manager.getTaxa().then((response) => {
            [canonical_taxa, checklist_taxa] = loadTaxaFromAPIData(
                response.data
            );
        });
    }

    async function getVisibleTaxa(
        checklist_id: number,
        taxon_name_filter?: string
    ) {
        if (!loaded_taxon_data) {
            await loadTaxonData();
            loaded_taxon_data = true;
        }
        let result = new TaxonList([]);
        if (checklist_id != -1) {
            if (taxon_source == 0) {
                result = canonical_taxa.filterByChecklist(checklist_id);
            } else {
                result = checklist_taxa.filterByChecklist(checklist_id);
            }
        }
        result = result.filterByTaxonNameContains(taxon_name_filter);

        return result;
    }

    async function handleChecklistChange() {
        console.log("here 1");
        visible_taxa = await getVisibleTaxa(
            selected_checklist_id,
            taxon_name_filter
        );
        console.log("here 2");
        selected_checklist = checklists.getChecklist(selected_checklist_id);
        compare_to_checklist = checklists.getChecklist(compare_to_checklist_id);

        if (selected_checklist_id != -1 && compare_to_checklist_id != -1) {
            let other_taxa = await getVisibleTaxa(compare_to_checklist_id);
            common_taxa = visible_taxa
                .commonTaxa(other_taxa)
                .getGrouped(grouped_by);
            taxa_diff_1 = visible_taxa
                .differingTaxa(other_taxa)
                .getGrouped(grouped_by);
            taxa_diff_2 = other_taxa
                .differingTaxa(visible_taxa)
                .getGrouped(grouped_by);
        } else {
            grouped_checklist_taxa = visible_taxa.getGrouped(grouped_by);
        }
    }
</script>

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
                    bind:value={grouped_by}
                    on:change={handleChecklistChange}
                    id="group_taxa_selection"
                >
                    <option value={GroupBy.family}>Family</option>
                    <option value={GroupBy.genus}>Genus</option>
                    <option value={GroupBy.alphabetic}>Alphabetic</option>
                </select>
            </label>
        </div>

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

        <div class="grid">
            <label>
                <input
                    type="radio"
                    bind:group={taxon_source}
                    name="taxon_source"
                    value={0}
                    on:change={handleChecklistChange}
                />
                Display Mapped taxa
            </label>
            <label>
                <input
                    type="radio"
                    bind:group={taxon_source}
                    name="taxon_source"
                    value={1}
                    on:change={handleChecklistChange}
                />
                Display Checklist taxa
            </label>
        </div>
    </form>
</article>
<article class:hide={selected_checklist_id == -1}>
    <div id="single_checklist_div" class:hide={compare_to_checklist_id != -1}>
        <details open>
            <summary>Checklist Taxa</summary>
            <!--<TaxaTable bind:grouped_checklist_taxa/>-->
            <GroupedTaxa bind:grouped_checklist_taxa />
        </details>
    </div>
    <div id="compare_checklist_div" class:hide={compare_to_checklist_id == -1}>
        <details>
            <summary>Common Taxa</summary>
            <GroupedTaxa bind:grouped_checklist_taxa={common_taxa} />
        </details>
        <details>
            {#if selected_checklist && compare_to_checklist}
                <summary
                    >In <mark>{selected_checklist.checklist_name}</mark> but not
                    in
                    <mark>{compare_to_checklist.checklist_name}</mark></summary
                >
            {/if}
            <GroupedTaxa bind:grouped_checklist_taxa={taxa_diff_1} />
        </details>
        <details>
            {#if selected_checklist && compare_to_checklist}
                <summary
                    >In <mark>{compare_to_checklist.checklist_name}</mark> but
                    not in
                    <mark>{selected_checklist.checklist_name}</mark></summary
                >
            {/if}
            <GroupedTaxa bind:grouped_checklist_taxa={taxa_diff_2} />
        </details>
    </div>
</article>

<style>
    .hide {
        display: none !important;
    }
</style>
