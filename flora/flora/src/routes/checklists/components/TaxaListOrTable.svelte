<script lang="ts">
    import TaxaList from "../components/TaxaList.svelte";
    import TaxaTable from "../components/TaxaTable.svelte";

    import type { GroupedTaxa } from "../../../data_classes/taxon";
    import type { DisplayedField } from "../types";

    export let grouped_checklist_taxa: GroupedTaxa;
    export let list: boolean;
    export let all_fields: DisplayedField[];
</script>

<div class:hide={!list}>
    <TaxaList
        bind:grouped_checklist_taxa
        bind:all_fields
    />
</div>
<div class:hide={list}>
    <TaxaTable
        bind:grouped_checklist_taxa
        bind:all_fields
    />
</div>
