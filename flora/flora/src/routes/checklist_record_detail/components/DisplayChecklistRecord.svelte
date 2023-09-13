<script lang="ts">
    import type { ChecklistRecordType } from "../../../data_classes/types";

    export let checklist_record: ChecklistRecordType;
</script>

<ul>
    <li>Checklist taxon name: {checklist_record.checklist_taxon.taxon_name}</li>
    <li>
        Currently mapped to:
        <a
            href="/taxon_detail/{checklist_record.mapped_taxon.id}"
            target="_blank"
            >{checklist_record.mapped_taxon.taxon_name}
        </a>
    </li>
    {#if checklist_record.date}
        <li>Observation date: {checklist_record.date}</li>
    {/if}
    {#if checklist_record.observer}
        <li>Observer: {checklist_record.observer}</li>
    {/if}
    {#if checklist_record.observation_type}
        <li>Observation type: {checklist_record.observation_type}</li>
    {/if}
    {#if checklist_record.last_refreshed}
        <li>Last refreshed: {checklist_record.last_refreshed}</li>
    {/if}
</ul>
