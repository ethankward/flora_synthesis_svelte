<script lang="ts">
    import { ChecklistList } from "../../data_classes/checklist";
    import type { GroupedTaxa } from "../../data_classes/taxon";
    import {
        GroupBy,
        TaxonList,
        loadTaxaFromAPIData,
    } from "../../data_classes/taxon";

    import { onMount } from "svelte";
    import { GetChecklistTaxa } from "../../data_classes/taxon";
    import type { ChecklistType } from "../../data_classes/types";
    import { all_field_types } from "../../routes/checklists/types";

    import TaxaListOrTable from "../../routes/checklists/components/TaxaListOrTable.svelte";

    export let data;

    let get_checklist_taxa_endpoint = new GetChecklistTaxa();

    type checklistTaxaType = { [key: number]: TaxonList };
    let checklists: ChecklistList = new ChecklistList(data.checklist_data);
    let primary_checklist_id = data.primary_checklist_id;

    let formProperties = {
        selectedChecklistID: -1 as number,
        comparisonChecklistID: -1 as number,
        selectedChecklist: undefined as ChecklistType | undefined,
        comparisonChecklist: undefined as ChecklistType | undefined,
        taxonNameFilter: undefined as string | undefined,
        taxonFamilyFilter: undefined as string | undefined,
        hasCollectionsFilter: undefined as boolean | undefined,
        useCanonicalTaxa: true as boolean,
        all_fields: all_field_types.map((field_type) => new field_type()),
        taxaGroupedBy: 0 as number,
        hideChecklistTaxa: true,
        hideComparisonTaxa: true,
        displayAsList: false,
        grouped_checklist_taxa: {} as GroupedTaxa,
        common_taxa: {} as GroupedTaxa,
        taxa_diff_1: {} as GroupedTaxa,
        taxa_diff_2: {} as GroupedTaxa,
        displayAllRanks: true,
    };

    onMount(async () => {
        if (primary_checklist_id !== null) {
            formProperties.selectedChecklistID = parseInt(primary_checklist_id);
            primary_checklist_id = null;
            await handleChecklistChange();
        }
    });

    class TaxonManager {
        canonical_taxa: checklistTaxaType;
        checklist_taxa: checklistTaxaType;

        constructor() {
            this.canonical_taxa = {};
            this.checklist_taxa = {};
        }
        async loadTaxonData(checklist_id: number) {
            return get_checklist_taxa_endpoint
                .callExternal({ checklist: checklist_id.toString() })
                .then((response) => {
                    let [loaded_canonical_taxa, loaded_checklist_taxa] =
                        loadTaxaFromAPIData(response.data);
                    this.canonical_taxa[checklist_id] = loaded_canonical_taxa;
                    this.checklist_taxa[checklist_id] = loaded_checklist_taxa;
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

    let taxonManager = new TaxonManager();

    async function getVisibleTaxa(checklist_id: number) {
        let result: TaxonList;

        if (formProperties.useCanonicalTaxa) {
            result = await taxonManager.getCanonicalTaxa(checklist_id);
        } else {
            result = await taxonManager.getChecklistTaxa(checklist_id);
        }
        result = result.filterByTaxonNameContains(
            formProperties.taxonNameFilter
        );
        result = result.filterByTaxonFamilyContains(
            formProperties.taxonFamilyFilter
        );
        result = result.filterByHasCollections(formProperties.hasCollectionsFilter);
        if (!formProperties.displayAllRanks) {
            result = result.filterByIsSpecies();
        }
        console.log("here");
        console.log(result);
        return result;
    }

    function setSelectedChecklist() {
        if (formProperties.selectedChecklistID !== -1) {
            formProperties.selectedChecklist =
                checklists.checklists[formProperties.selectedChecklistID];
        } else {
            formProperties.selectedChecklist = undefined;
        }
    }

    function setCompareToChecklist() {
        if (formProperties.comparisonChecklistID !== -1) {
            formProperties.comparisonChecklist =
                checklists.checklists[formProperties.comparisonChecklistID];
        } else {
            formProperties.comparisonChecklist = undefined;
        }
    }

    async function handleChecklistChange() {
        formProperties.hideChecklistTaxa = true;
        formProperties.hideComparisonTaxa = true;

        let visible_taxa = await getVisibleTaxa(
            formProperties.selectedChecklistID
        );

        setSelectedChecklist();
        setCompareToChecklist();

        if (
            formProperties.selectedChecklistID !== -1 &&
            formProperties.comparisonChecklistID !== -1
        ) {
            let other_taxa = await getVisibleTaxa(
                formProperties.comparisonChecklistID
            );
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
            formProperties.grouped_checklist_taxa = visible_taxa.getGrouped(
                formProperties.taxaGroupedBy
            );
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
                    bind:value={formProperties.selectedChecklistID}
                    on:change={handleChecklistChange}
                >
                    <option value={-1} />
                    {#each Object.values(checklists.checklists) as checklist}
                        <option value={checklist.id}
                            >{checklist.checklist_name}</option
                        >
                    {/each}
                </select>
            </label>

            <label for="compare_checklist_selection">
                Compare with
                <select
                    id="compare_checklist_selection"
                    bind:value={formProperties.comparisonChecklistID}
                    on:change={handleChecklistChange}
                >
                    <option value={-1} />
                    {#each Object.values(checklists.checklists) as checklist}
                        <option value={checklist.id}
                            >{checklist.checklist_name}</option
                        >
                    {/each}
                </select>
            </label>
        </div>

        <hr />
        <details>
            <summary>More options</summary>

            <hr />
            <div class="grid">
                <label>
                    Primary taxa
                    <select
                        bind:value={formProperties.useCanonicalTaxa}
                        on:change={handleChecklistChange}
                    >
                        <option value={true}>Mapped taxa</option>
                        <option value={false}>Checklist taxa</option>
                    </select>
                </label>
                <label>
                    Display as
                    <select
                        bind:value={formProperties.displayAsList}
                        on:change={handleChecklistChange}
                    >
                        <option value={true}>List</option>
                        <option value={false}>Table</option>
                    </select>
                </label>
                <label>
                    Taxon ranks
                    <select
                        bind:value={formProperties.displayAllRanks}
                        on:change={handleChecklistChange}
                    >
                        <option value={true}>All ranks</option>
                        <option value={false}>Species only</option>
                    </select>
                </label>
                <label for="group_taxa_selection">
                    Group by
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
                <label>
                    Has collections
                    <select
                        bind:value={formProperties.hasCollectionsFilter}
                        on:change={handleChecklistChange}
                    >
                        <option value={undefined} />
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </label>
            </div>
            <hr />
            <div class="grid">
                <label>
                    Filter taxon name
                    <input
                        type="text"
                        bind:value={formProperties.taxonNameFilter}
                        on:keyup={handleChecklistChange}
                    />
                </label>
                <label>
                    Filter taxon family
                    <input
                        type="text"
                        bind:value={formProperties.taxonFamilyFilter}
                        on:keyup={handleChecklistChange}
                    />
                </label>
            </div>
            <hr />

            <h6>Display fields</h6>
            <div class="container-fluid">
                {#each formProperties.all_fields as field}
                    {#if field.is_toggleable}
                        <span>
                            <input
                                type="checkbox"
                                bind:checked={field.visible}
                            />
                            {field.title}
                        </span> &nbsp;&nbsp;
                    {/if}
                {/each}
            </div>
        </details>
    </form>
</article>

<article
    aria-busy="true"
    class:hide={!(
        formProperties.hideChecklistTaxa && formProperties.hideComparisonTaxa
    ) || formProperties.selectedChecklistID === -1}
/>
<article
    class:hide={(formProperties.hideChecklistTaxa &&
        formProperties.hideComparisonTaxa) ||
        formProperties.selectedChecklistID === -1}
>
    <div
        id="single_checklist_div"
        class:hide={formProperties.hideChecklistTaxa}
    >
        <details open>
            <summary
                >Checklist Taxa: <mark
                    >{#if formProperties.selectedChecklist}{formProperties
                            .selectedChecklist.checklist_name}{/if}</mark
                ></summary
            >
            <TaxaListOrTable
                bind:list={formProperties.displayAsList}
                bind:grouped_checklist_taxa={formProperties.grouped_checklist_taxa}
                bind:all_fields={formProperties.all_fields}
            />
        </details>
    </div>
    <div
        id="compare_checklist_div"
        class:hide={formProperties.hideComparisonTaxa}
    >
        <details>
            <summary>Common Taxa</summary>
            <TaxaListOrTable
                bind:list={formProperties.displayAsList}
                bind:grouped_checklist_taxa={formProperties.common_taxa}
                bind:all_fields={formProperties.all_fields}
            />
        </details>
        <details>
            {#if formProperties.selectedChecklist && formProperties.comparisonChecklist}
                <summary
                    >In <mark
                        >{formProperties.selectedChecklist.checklist_name}</mark
                    >
                    but not in
                    <mark
                        >{formProperties.comparisonChecklist
                            .checklist_name}</mark
                    ></summary
                >
            {/if}
            <TaxaListOrTable
                bind:list={formProperties.displayAsList}
                bind:grouped_checklist_taxa={formProperties.taxa_diff_1}
                bind:all_fields={formProperties.all_fields}
            />
        </details>
        <details>
            {#if formProperties.selectedChecklist && formProperties.comparisonChecklist}
                <summary
                    >In <mark
                        >{formProperties.comparisonChecklist
                            .checklist_name}</mark
                    >
                    but not in
                    <mark
                        >{formProperties.selectedChecklist.checklist_name}</mark
                    ></summary
                >
            {/if}
            <TaxaListOrTable
                bind:list={formProperties.displayAsList}
                bind:grouped_checklist_taxa={formProperties.taxa_diff_2}
                bind:all_fields={formProperties.all_fields}
            />
        </details>
    </div>
</article>
