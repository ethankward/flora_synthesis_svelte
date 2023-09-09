<script lang="ts">
    import {ChecklistList} from "../data_classes/checklist";
    import type {GroupedTaxa} from "../data_classes/taxon";
    import {
        GroupBy,
        TaxonList,
        loadTaxaFromAPIData,
    } from "../data_classes/taxon";


    import type { ChecklistType } from "../data_classes/types";
    import type {selectedFieldsOptions} from "../routes/types";
	import {callExternalEndpoint, APIEndpoints} from "../util/local_api_dispatch";

    import TaxaListOrTable from "../components/routes/index/TaxaListOrTable.svelte";

    export let data;


    let formProperties = {
        selectedChecklistID: -1 as number,
        comparisonChecklistID: -1 as number,
        selectedChecklist: undefined as ChecklistType | undefined,
        comparisonChecklist: undefined as ChecklistType | undefined,
        taxonNameFilter: undefined as string | undefined,
        useCanonicalTaxa: true as boolean,
        selectedFieldsOptions: {
            lifecycle: false,
            introduced: false,
            endemic: false,
            synonyms: true,
            first_observation_date: false,
            last_observation_date: false
            } as selectedFieldsOptions,
        taxaGroupedBy: 0 as number ,
        hideChecklistTaxa: true,
        hideComparisonTaxa: true,
        displayAsList: true,
        grouped_checklist_taxa: {} as GroupedTaxa,
        common_taxa: {} as GroupedTaxa,
        taxa_diff_1: {} as GroupedTaxa,
        taxa_diff_2: {} as GroupedTaxa
    };

    class TaxonManager {
        canonical_taxa: checklistTaxaType;
        checklist_taxa: checklistTaxaType;

        constructor() {
            this.canonical_taxa = {};
            this.checklist_taxa = {};

        }
        async loadTaxonData(checklist_id: number) {
            return callExternalEndpoint({checklist_id: checklist_id}, APIEndpoints.get_checklist_taxa).then((response) => {
                let [loaded_canonical_taxa, loaded_checklist_taxa] = loadTaxaFromAPIData(
                    response
                );
                this.canonical_taxa[checklist_id] = loaded_canonical_taxa.deduplicate();
                this.checklist_taxa[checklist_id] = loaded_checklist_taxa.filterByChecklist(checklist_id).deduplicate();
            });
        }
        
        async getCanonicalTaxa(checklistID: number) {
            if (!(checklistID in this.canonical_taxa)) {
                await this.loadTaxonData(checklistID);
            }
            return this.canonical_taxa[checklistID];
        }

        async getChecklistTaxa(checklistID: number) {
            if (!(checklistID in this.checklist_taxa)) {
                await this.loadTaxonData(checklistID);
            }
            return this.checklist_taxa[checklistID];
        }
    }

    async function getVisibleTaxa(checklist_id: number) {
        let result: TaxonList;

        if (formProperties.useCanonicalTaxa) {
            result = await taxonManager.getCanonicalTaxa(checklist_id);
        } else {
            result = await taxonManager.getChecklistTaxa(checklist_id);
        }
        result = result.filterByTaxonNameContains(formProperties.taxonNameFilter);
        return result;
    }

    function getSelectedChecklist() {
        if (formProperties.selectedChecklistID != -1) {
            return checklists.checklists[formProperties.selectedChecklistID];
        }
    }

    function getCompareToChecklist() {
        if (formProperties.comparisonChecklistID != -1) {
            return checklists.checklists[formProperties.comparisonChecklistID];
        }
    }

    async function handleChecklistChange() {    
        formProperties.hideChecklistTaxa = true;
        formProperties.hideComparisonTaxa = true;

        let visible_taxa = await getVisibleTaxa(
            formProperties.selectedChecklistID,
        );

        formProperties.selectedChecklist = getSelectedChecklist();
        formProperties.comparisonChecklist = getCompareToChecklist();

        if (formProperties.selectedChecklistID != -1 && formProperties.comparisonChecklistID != -1) {
            let other_taxa = await getVisibleTaxa(formProperties.comparisonChecklistID);
            formProperties.hideComparisonTaxa = false;
            formProperties.common_taxa = visible_taxa
                .commonTaxa(other_taxa)
                .getGrouped(formProperties.taxaGroupedBy);
            formProperties.taxa_diff_1 = visible_taxa
                .differingTaxa(other_taxa)
                .getGrouped(formProperties.taxaGroupedBy);
            formProperties.taxa_diff_2 = other_taxa
                .differingTaxa(visible_taxa)
                .getGrouped(formProperties.taxaGroupedBy);
        } else {
            formProperties.hideChecklistTaxa = false;
            formProperties.grouped_checklist_taxa = visible_taxa.getGrouped(formProperties.taxaGroupedBy);
        }
    }

    type checklistTaxaType = {[key: number]: TaxonList;};
    let taxonManager = new TaxonManager();
    let checklists: ChecklistList = new ChecklistList(data.checklist_data);
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
                    bind:value={formProperties.selectedChecklistID}
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
                    bind:value={formProperties.comparisonChecklistID}
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
                    bind:value={formProperties.taxaGroupedBy}
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
            <hr>
            <div class="grid">
                <label>
                    Filter taxon name:
                    <input
                        type="text"
                        bind:value={formProperties.taxonNameFilter}
                        on:keyup={handleChecklistChange}
                    />
                </label>
            </div>
            <hr>
            <div class="grid">
                <label>
                    <input
                        type="radio"
                        bind:group={formProperties.useCanonicalTaxa}
                        name="taxon_source"
                        value={true}
                        on:change={handleChecklistChange}
                    />
                    Display mapped taxa
                </label>
                <label>
                    <input
                        type="radio"
                        bind:group={formProperties.useCanonicalTaxa}
                        name="taxon_source"
                        value={false}
                        on:change={handleChecklistChange}
                    />
                    Display checklist taxa
                </label>
                <label>
                    <input
                        type="radio"
                        bind:group={formProperties.displayAsList}
                        name="list_display"
                        value={true}
                    />
                    Display as list
                </label>
                <label>
                    <input
                        type="radio"
                        bind:group={formProperties.displayAsList}
                        name="table_display"
                        value={false}
                    />
                    Display as table
                </label>
            </div>
            <hr>
            <h6>Show fields</h6>
            <div class="grid">
                <label>
                    <input type="checkbox" 
                    bind:checked={formProperties.selectedFieldsOptions.lifecycle}
                    />
                    Life cycle
                </label>
                <label>
                    <input type="checkbox" 
                    bind:checked={formProperties.selectedFieldsOptions.introduced}
                    />
                    Introduced
                </label>
                <label>
                    <input type="checkbox" 
                    bind:checked={formProperties.selectedFieldsOptions.endemic}
                    />
                    Endemic
                </label>
                <label>
                    <input type="checkbox" 
                    bind:checked={formProperties.selectedFieldsOptions.synonyms}/>
                    Synonyms
                </label>
                <label>
                    <input type="checkbox" 
                    bind:checked={formProperties.selectedFieldsOptions.first_observation_date}/>
                    First observation date
                </label>
                <label>
                    <input type="checkbox" 
                    bind:checked={formProperties.selectedFieldsOptions.last_observation_date}/>
                    Last observation date
                </label>
            </div>
    
        </details>

    </form>
</article>

<article aria-busy="true" class:hide={!(formProperties.hideChecklistTaxa && formProperties.hideComparisonTaxa) || formProperties.selectedChecklistID == -1}>

</article>
<article class:hide={(formProperties.hideChecklistTaxa && formProperties.hideComparisonTaxa) || formProperties.selectedChecklistID == -1}>

    <div id="single_checklist_div" class:hide={formProperties.hideChecklistTaxa}>
        <details open>
            <summary>Checklist Taxa: <mark>{#if formProperties.selectedChecklist}{formProperties.selectedChecklist.checklist_name}{/if}</mark></summary>
            <TaxaListOrTable
                list={formProperties.displayAsList}
                grouped_checklist_taxa={formProperties.grouped_checklist_taxa}
                selectedFieldsOptions={formProperties.selectedFieldsOptions}
            />
        </details>
    </div>
    <div id="compare_checklist_div" class:hide={formProperties.hideComparisonTaxa}>
        <details>
            <summary>Common Taxa</summary>
            <TaxaListOrTable
                list={formProperties.displayAsList}
                grouped_checklist_taxa={formProperties.common_taxa}
                selectedFieldsOptions={formProperties.selectedFieldsOptions}
            />
        </details>
        <details>
            {#if formProperties.selectedChecklist && formProperties.comparisonChecklist}
            <summary
            >In <mark>{formProperties.selectedChecklist.checklist_name}</mark> but not
            in
            <mark>{formProperties.comparisonChecklist.checklist_name}</mark></summary
            >
            {/if}
            <TaxaListOrTable
                list={formProperties.displayAsList}
                grouped_checklist_taxa={formProperties.taxa_diff_1}
                selectedFieldsOptions={formProperties.selectedFieldsOptions}
            />
        </details>
        <details>
            {#if formProperties.selectedChecklist && formProperties.comparisonChecklist}
                <summary
                    >In <mark>{formProperties.comparisonChecklist.checklist_name}</mark> but
                    not in
                    <mark>{formProperties.selectedChecklist.checklist_name}</mark></summary
                >
            {/if}
            <TaxaListOrTable
                list={formProperties.displayAsList}
                grouped_checklist_taxa={formProperties.taxa_diff_2}
                selectedFieldsOptions={formProperties.selectedFieldsOptions}
            />
        </details>
    </div>
</article>

<style>
    .hide {
        display: none !important;
    }
</style>
