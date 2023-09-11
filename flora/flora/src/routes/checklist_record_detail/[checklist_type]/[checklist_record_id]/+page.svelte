<script lang="ts">
    import type {ChecklistRecordType} from "../../../../data_classes/types";

	import AutoComplete from "simple-svelte-autocomplete";
	import DisplayChecklistRecord from "../../../../components/routes/checklist_record_detail/DisplayChecklistRecord.svelte";
	import {callExternalEndpoint} from "../../../../util/local_api_dispatch";
	import InlineList from "../../../../components/crud/InlineList.svelte";

	export let data;

	let checklist_record: ChecklistRecordType = data.checklist_record_data;
    let mapped_to_choice: {id: number};

	async function getTaxonNameAutocompletion(search_term: string) {
		return await callExternalEndpoint({search_term: search_term}, "taxa_autocompletion");
	}
	
	function submitUpdateMapping() {
        callExternalEndpoint(
            {
                checklist_type: data.checklist_type, 
                checklist_record_id: checklist_record.id, 
                mapped_to_id: mapped_to_choice.id
            }, "update_checklist_record_mapping").then((result) => {
			window.location.href = '/checklist_record_detail/' + data.checklist_type + "/" + checklist_record.id;
		}).catch(function (error) {

        });

	}
    
</script>

<svelte:head>
    <title>{checklist_record.checklist.checklist_name} {checklist_record.external_id}</title> 
</svelte:head>

<article>
    <header>Checklist record: {checklist_record.checklist.checklist_name} {checklist_record.external_id}
        {#if checklist_record.external_url}
        <a href={checklist_record.external_url} target="_blank">→</a>
        {/if}
    </header>

    <DisplayChecklistRecord checklist_record={checklist_record}/>

</article>

<article>
    <header>Notes for this record</header>

    <InlineList 
    existing_values={checklist_record.notes.map((note) => ({value: note.id.toString(), display: note.note}))}
    createAPIMethod={(value) => callExternalEndpoint({checklist_record_id: checklist_record.id, checklist_record_type: data.checklist_type, note: value}, "create_new_checklist_record_note")}
    deleteAPIMethod={(note_id) => callExternalEndpoint({note_id: parseInt(note_id)}, "delete_checklist_record_note")}
    updateAPIMethod={(note_id, value) => callExternalEndpoint({note_id: parseInt(note_id), note: value}, "update_checklist_record_note")}
    />

</article>

<article>
    <header>Update mapped taxon</header>
    <form  on:submit={submitUpdateMapping}>
        <div class="grid">
            <AutoComplete
            searchFunction="{getTaxonNameAutocompletion}"
            delay="200"
            localFiltering={false}
            labelFieldName="taxon_name"
            valueFieldName="pk"
            hideArrow={true}
            required={true}
            bind:selectedItem="{mapped_to_choice}"
            />
        </div>
        <hr>
        <input type="submit" value="Update">

    </form>

</article>