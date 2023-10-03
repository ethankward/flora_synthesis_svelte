<script lang="ts">
    import {
        RetrieveChecklist,
        LoadChecklist,
    } from "../../../data_classes/checklist";
    import type {
        ChecklistStaleRecordCountType,
        ChecklistType,
    } from "../../../data_classes/types";
    import RetrievalButton from "../../../routes/dashboard/components/RetrievalButton.svelte";
    import UpdateButton from "../../../routes/dashboard/components/UpdateButton.svelte";

    export let checklists: ChecklistType[];
    export let stale_record_counts: ChecklistStaleRecordCountType[];

    let update_loading = new Array(checklists.length);
    let update_invalid = new Array(checklists.length);

    let retrieval_loading = new Array(checklists.length);
    let retrieval_invalid = new Array(checklists.length);

    let n_records = 10;

    let loadChecklistEndpoint = new LoadChecklist();
    let retrievechecklistEndpoint = new RetrieveChecklist();

    async function submitUpdateRequest(checklist_index: number) {
        let checklist = checklists[checklist_index];

        update_invalid = new Array(checklists.length).fill(undefined);
        update_loading[checklist_index] = true;

        loadChecklistEndpoint
            .callExternal({ checklist_id: checklist.id })
            .then(() => {
                update_invalid[checklist_index] = false;
                update_loading[checklist_index] = false;
            })
            .catch(() => {
                update_invalid[checklist_index] = true;
                update_loading[checklist_index] = false;
            });
    }

    function submitRetrievalRequest(
        checklist_index: number,
        n_records: number
    ) {
        let checklist = checklists[checklist_index];

        retrieval_invalid = new Array(checklists.length).fill(undefined);
        retrieval_loading[checklist_index] = true;

        retrievechecklistEndpoint
            .callExternal({
                checklist_id: checklist.id,
                n_records: n_records,
            })
            .then(() => {
                retrieval_invalid[checklist_index] = false;
                retrieval_loading[checklist_index] = false;
            })
            .catch(() => {
                retrieval_invalid[checklist_index] = true;
                retrieval_loading[checklist_index] = false;
            });
    }
</script>

{#each checklists as checklist, i}
    <hr />
    <h3>{checklist.checklist_name}</h3>
    <p>Last updated on: {checklist.latest_date_retrieved}</p>
    <div class="grid">
        <UpdateButton
            {update_invalid}
            {update_loading}
            index={i}
            {submitUpdateRequest}
        />
    </div>
    <p>
        {stale_record_counts.filter((src) => src.id === checklist.id)[0]
            .stale_record_count} records without metadata or older than 60 days
    </p>
    <div class="grid">
        <RetrievalButton
            {retrieval_invalid}
            {retrieval_loading}
            index={i}
            {submitRetrievalRequest}
            {n_records}
        />
        <select bind:value={n_records}>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
        </select>
    </div>
{/each}
