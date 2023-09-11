<script lang="ts">
    import type { ChecklistType, ChecklistStaleRecordCountType } from "../../data_classes/types";

	import {callExternalEndpoint} from "../../util/local_api_dispatch";
    import ChecklistController from "../../routes/dashboard/components/ChecklistController.svelte";
    import ObservationDatesController from "../../routes/dashboard/components/ObservationDatesController.svelte";

    export let data;
    export let checklist_data: ChecklistType[] = data.checklist_data;
    export let stale_record_counts: ChecklistStaleRecordCountType[] = data.stale_record_counts;

    let update_loading = new Array(data.checklist_data.length).fill(false);
    let update_invalid = new Array(data.checklist_data.length).fill(false);

    let retrieval_loading = new Array(data.checklist_data.length).fill(false);

    async function submitUpdateRequest(checklist_index: number) {
        let checklist = data.checklist_data[checklist_index];

        update_invalid = new Array(data.checklist_data.length).fill(false);
        update_loading[checklist_index] = true;

		callExternalEndpoint({checklist_id: checklist.id}, "update_checklist").then((result) => {
            update_loading[checklist_index] = false;
        }).catch((error) => {
            update_invalid[checklist_index] = true;
            update_loading[checklist_index] = false;
        });
    }

    function submitRetrievalRequest(checklist_index: number, n_records: number) {
        let checklist = data.checklist_data[checklist_index];

        retrieval_loading[checklist_index] = true;

		callExternalEndpoint({checklist_id: checklist.id, n_records: n_records}, "retrieve_checklist").then((result) => {
            retrieval_loading[checklist_index] = false;
        });
    }

</script>

<article>
    <header>SEINet checklists</header>
    <ChecklistController stale_record_counts={stale_record_counts} checklists={checklist_data.filter((checklist) => checklist.checklist_type == "s")}/>
</article>

<article>
    <header>Inat checklists</header>
    <ChecklistController stale_record_counts={stale_record_counts} checklists={checklist_data.filter((checklist) => checklist.checklist_type == "i")}/>
</article>

<article>
    <header>Observation dates</header>
    <ObservationDatesController />
</article>
