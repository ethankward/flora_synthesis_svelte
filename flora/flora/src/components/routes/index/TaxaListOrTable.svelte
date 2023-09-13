<script lang="ts">
    import TaxaList from "../../../components/routes/index/TaxaList.svelte";
    import TaxaTable from "../../../components/routes/index/TaxaTable.svelte";

    import type {GroupedTaxa} from "../../../data_classes/taxon";
    import type {selectedFieldsOptions} from "../../../routes/types";

    export let grouped_checklist_taxa: GroupedTaxa;
    export let list: boolean;
    export let selectedFieldsOptions: selectedFieldsOptions;

</script>

<div class:hide={!list}>
    <TaxaList grouped_checklist_taxa={grouped_checklist_taxa} selectedFieldsOptions={selectedFieldsOptions} />
</div>
<div class:hide={list}>
    <TaxaTable grouped_checklist_taxa={grouped_checklist_taxa} selectedFieldsOptions={selectedFieldsOptions}/>
</div>
