<script lang="ts">
    import type { ChecklistType, ChecklistStaleRecordCountType } from "../../../data_classes/types";
    import UpdateButton from "../../../routes/dashboard/components/UpdateButton.svelte";
    import RetrievalButton from "../../../routes/dashboard/components/RetrievalButton.svelte";
	import {callExternalEndpoint} from "../../../util/local_api_dispatch";

    export let checklists: ChecklistType[];
    export let stale_record_counts: ChecklistStaleRecordCountType[];

    let update_loading = new Array(checklists.length);
    let update_invalid = new Array(checklists.length);

    let retrieval_loading = new Array(checklists.length);
    let retrieval_invalid = new Array(checklists.length);

    let n_records = 10;

    async function submitUpdateRequest(checklist_index: number) {
        let checklist = checklists[checklist_index];

        update_invalid = new Array(checklists.length).fill(undefined);
        update_loading[checklist_index] = true;

		callExternalEndpoint({checklist_id: checklist.id}, "update_checklist").then((result) => {
            update_invalid[checklist_index] = false;
            update_loading[checklist_index] = false;
        }).catch((error) => {
            update_invalid[checklist_index] = true;
            update_loading[checklist_index] = false;
        });
    }

    function submitRetrievalRequest(checklist_index: number, n_records: number) {
        let checklist = checklists[checklist_index];

        retrieval_invalid = new Array(checklists.length).fill(undefined);
        retrieval_loading[checklist_index] = true;

		callExternalEndpoint({checklist_id: checklist.id, n_records: n_records}, "retrieve_checklist").then((result) => {
            retrieval_invalid[checklist_index] = false;
            retrieval_loading[checklist_index] = false;
        }).catch((error) => {
            retrieval_invalid[checklist_index] = true;
            retrieval_loading[checklist_index] = false;            
        });
    }

</script>

{#each checklists as checklist, i}
<hr>
<h3>{checklist.checklist_name}</h3>
<p>Last updated on: {checklist.latest_date_retrieved}</p>
<div class="grid">
    <UpdateButton update_invalid={update_invalid} update_loading={update_loading} index={i} submitUpdateRequest={submitUpdateRequest}/>
</div>
<p>{stale_record_counts.filter((src) => src.id == checklist.id)[0].stale_record_count} records without metadata or older than 60 days</p>
<div class="grid">
    <RetrievalButton retrieval_invalid={retrieval_invalid} retrieval_loading={retrieval_loading} index={i} submitRetrievalRequest={submitRetrievalRequest} n_records={n_records}/>
    <select bind:value={n_records}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
    </select>
</div>
{/each}