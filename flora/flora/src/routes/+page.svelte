<script lang="ts">
    import { ChecklistList } from "../util/api_data_classes/checklist";
    import { onMount } from "svelte";
    import { APIManager } from "../util/api";
    import {
        GroupBy,
        TaxonList,
        loadTaxaFromAPIData,
    } from "../util/api_data_classes/taxon";
    import GroupedTaxa from "../components/GroupedTaxa.svelte";

    export let data;

    let checklists = new ChecklistList(data.checklist_data.data);
    let [canonical_taxa, checklist_taxa] = loadTaxaFromAPIData(data.taxon_data.data);

    let visible_taxa: TaxonList;
    let common_taxa = {};
    let taxa_diff_1 = {};
    let taxa_diff_2 = {};
    let grouped_checklist_taxa = {};
    let selected_checklist_id: number;
    let compare_to_checklist_id: number;
    let grouped_by: number;
    let taxon_source = 1;


    function getVisibleTaxa(checklist_id: number) {
        let result = new TaxonList([]);
        if (checklist_id != -1) {
            if (taxon_source == 0) {
                result = canonical_taxa.filterByChecklist(checklist_id);
            } else {
                result = checklist_taxa.filterByChecklist(checklist_id);
            }
        }

        return result;
    }

    async function handleChecklistChange() {
            visible_taxa = getVisibleTaxa(selected_checklist_id);
            if (selected_checklist_id != -1 && compare_to_checklist_id != -1) {
                let other_taxa = getVisibleTaxa(compare_to_checklist_id);
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
    <form>
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
            <GroupedTaxa bind:grouped_checklist_taxa />
        </details>
    </div>
    <div id="compare_checklist_div" class:hide={compare_to_checklist_id == -1}>
        <details>
            <summary>Common Taxa</summary>
            <GroupedTaxa bind:grouped_checklist_taxa={common_taxa} />
        </details>
        <details>
            <summary
                >In {selected_checklist_id} but not in checklist {compare_to_checklist_id}</summary
            >
            <GroupedTaxa bind:grouped_checklist_taxa={taxa_diff_1} />
        </details>
        <details>
            <summary
                >In checklist {compare_to_checklist_id} but not in checklist {selected_checklist_id}</summary
            >
            <GroupedTaxa bind:grouped_checklist_taxa={taxa_diff_2} />
        </details>
    </div>
</article>

<style>
    .hide {
        display: none !important;
    }
</style>
