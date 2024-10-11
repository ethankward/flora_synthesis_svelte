<script lang="ts">
    import type { ChecklistRecordType } from "../../../../data_classes/types";
    import TaxonNameAutocompletion from "../../../../components/common/TaxonNameAutocompletion.svelte";
    import type { TaxonNameType } from "../../../../data_classes/types";

    import InlineTextarea from "../../../../components/crud/InlineTextarea.svelte";
    import DisplayChecklistRecord from "../../components/DisplayChecklistRecord.svelte";
    import { UpdateChecklistRecord, RetrieveChecklistRecord } from "../../../../data_classes/checklist_record";
    import {
        CreateNewChecklistRecordNote,
        UpdateChecklistRecordNote,
        DeleteChecklistRecordNote,
    } from "../../../../data_classes/checklist_record_note";
    export let data;

    let checklist_record: ChecklistRecordType = data.checklist_record_data;
    let mapped_to_choice: TaxonNameType;
    let update_record_endpoint = new UpdateChecklistRecord();
    let create_crn_endpoint = new CreateNewChecklistRecordNote();
    let update_crn_endpoint = new UpdateChecklistRecordNote();
    let delete_crn_endpoint = new DeleteChecklistRecordNote();
    let retrieve_record_endpoint = new RetrieveChecklistRecord();

    function submitUpdateMapping() {
        update_record_endpoint
            .callExternal({
                checklist_type: data.checklist_type,
                checklist_record_id: checklist_record.id,
                mapped_to_id: mapped_to_choice.id,
            })
            .then(() => {
                window.location.href =
                    "/checklist_record_detail/" +
                    data.checklist_type +
                    "/" +
                    checklist_record.id;
            });
    }

    function submitRetrieveRecord() {
        retrieve_record_endpoint
            .callExternal({
                record_id: checklist_record.id,
                checklist_type: data.checklist_type,
            })
            .then(() => {
                window.location.href =
                    "/checklist_record_detail/" +
                    data.checklist_type +
                    "/" +
                    checklist_record.id;
            });
    }
</script>

<svelte:head>
    <title
        >{checklist_record.checklist.checklist_name}
        {checklist_record.external_id}</title
    >
</svelte:head>

<article>
    <header>
        Checklist record: {checklist_record.checklist.checklist_name}
        {checklist_record.id}
        {#if checklist_record.external_url}
            <a href={checklist_record.external_url} target="_blank">→</a>
        {/if}
    </header>

    <DisplayChecklistRecord {checklist_record} />
</article>

<article>
    <header>Notes for this record</header>

    <InlineTextarea
        existing_values={checklist_record.notes.map((note) => ({
            value: note.id.toString(),
            display: note.note,
        }))}
        createAPIMethod={(value) =>
            create_crn_endpoint.callExternal({
                checklist_record_id: checklist_record.id,
                checklist_record_type: data.checklist_type,
                note: value,
            })}
        deleteAPIMethod={(note_id) =>
            delete_crn_endpoint.callExternal({
                id: parseInt(note_id),
            })}
        updateAPIMethod={(note_id, value) =>
            update_crn_endpoint.callExternal({
                id: parseInt(note_id),
                note: value,
            })}
    />
</article>

<article>
    <header>Update mapped taxon</header>
    <form on:submit={submitUpdateMapping}>
        <div class="grid">
            <TaxonNameAutocompletion bind:selectedItem={mapped_to_choice} />
        </div>
        <hr />
        <input type="submit" value="Update" />
    </form>
</article>

<article>
    <header>Refresh record</header>
    <button on:click={submitRetrieveRecord}>Update</button>
</article>