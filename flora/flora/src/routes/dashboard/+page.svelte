<script lang="ts">
    import type {
        ChecklistStaleRecordCountType,
        ChecklistType,
    } from "../../data_classes/types";

    import ChecklistController from "../../routes/dashboard/components/ChecklistController.svelte";
    import ObservationDatesController from "../../routes/dashboard/components/ObservationDatesController.svelte";

    export let data;
    export let checklist_data: ChecklistType[] = data.checklist_data;
    export let stale_record_counts: ChecklistStaleRecordCountType[] =
        data.stale_record_counts;
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<article>
    <header>SEINet checklists</header>
    <ChecklistController
        {stale_record_counts}
        checklists={checklist_data.filter(
            (checklist) => checklist.checklist_type === "s"
        )}
    />
</article>

<article>
    <header>Inat checklists</header>
    <ChecklistController
        {stale_record_counts}
        checklists={checklist_data.filter(
            (checklist) => checklist.checklist_type === "i"
        )}
    />
</article>

<article>
    <header>Observation dates</header>
    <ObservationDatesController />
</article>
