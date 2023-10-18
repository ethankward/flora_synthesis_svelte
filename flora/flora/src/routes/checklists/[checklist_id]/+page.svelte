<script lang="ts">
    export let data;
    import type {
        ChecklistType,
        ChecklistStaleRecordType,
    } from "../../../data_classes/types";

    let checklist: ChecklistType = data.checklist_data;
    let stale_records: ChecklistStaleRecordType = data.stale_records_data;
</script>

<svelte:head>
    <title>Checklist: {checklist.checklist_name}</title>
</svelte:head>

<article>
    <header>Stale records: {checklist.checklist_name}</header>

    <ul>
        {#each stale_records.stale_records as checklist_record}
            <li>
                <a
                    href={"/checklist_record_detail/" +
                        checklist_record.checklist.checklist_type +
                        "/" +
                        checklist_record.id}
                    target="_blank"
                    >{checklist_record.checklist_taxon.taxon_name}</a
                >
                {#if checklist_record.date}
                    <li>
                        <small>{checklist_record.date}</small>
                    </li>
                {/if}
                {#if checklist_record.external_url}
                    <a href={checklist_record.external_url} target="_blank">→</a
                    >
                {/if}
            </li>
        {/each}
    </ul>
</article>
