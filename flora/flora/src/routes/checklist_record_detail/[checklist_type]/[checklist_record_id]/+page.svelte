<script lang="ts">
    import { ChecklistRecordList } from "../../../../util/api_data_classes/checklist_records";
    import type {ChecklistRecordAPIType} from "../../../../util/api_data_classes/api_data_types";
    import InlineFormEditor from "../../../../components/InlineFormEditor.svelte";
	import { APIManager } from "../../../../util/api";
	import AutoComplete from "simple-svelte-autocomplete";
	import DisplayChecklistRecord from "../../../../components/DisplayChecklistRecord.svelte";

	export let data;
    console.log(data);
    let api_manager = new APIManager("http://127.0.0.1:8000/api/");

	let checklist_record: ChecklistRecordAPIType = data.checklist_record_data.data;
    let mapped_to_choice: object;

	async function getTaxonNameAutocompletion(search_term: string) {
		const response = await api_manager.getTaxaAutocompletion(search_term);
		const json = await response.data;
		return json;
	}

	
	function submitUpdateMapping() {
		let mapped_to_id: number = mapped_to_choice.id;

		api_manager.updateChecklistRecordMappedTo(data.checklist_type, checklist_record.id, mapped_to_id).then((result) => {
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
        <input type="submit" value="Update">

    </form>

</article>