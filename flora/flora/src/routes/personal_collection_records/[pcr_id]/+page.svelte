<script lang="ts">
    import CreateOrEditForm from "../components/CreateOrEditForm.svelte";
    import type { PersonalCollectionRecordType } from "../../../data_classes/types";

    export let data;

    let personal_collection_record: PersonalCollectionRecordType =
        data.personal_collection_record;
</script>

<svelte:head>
    <title>Edit record data</title>
</svelte:head>

<article>
    <header>Edit record data</header>
    <CreateOrEditForm
        data={personal_collection_record}
        create_or_edit="edit"
        record_id={data.record_id}
        selectedSpecificTaxon={data.specific_taxon}
    />
</article>
