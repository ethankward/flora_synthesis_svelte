<script lang="ts">
    import TaxaList from "../components/TaxaList.svelte";
    import TaxaTable from "../components/TaxaTable.svelte";

    import type { GroupedTaxa } from "../../../data_classes/taxon";
    import type { selectedFieldsOptions } from "../types";

    export let grouped_checklist_taxa: GroupedTaxa;
    export let list: boolean;
    export let selectedFieldsOptionsValues: selectedFieldsOptions;
</script>

<div class:hide={!list}>
    <TaxaList {grouped_checklist_taxa} {selectedFieldsOptionsValues} />
</div>
<div class:hide={list}>
    <TaxaTable {grouped_checklist_taxa} {selectedFieldsOptionsValues} />
</div>
