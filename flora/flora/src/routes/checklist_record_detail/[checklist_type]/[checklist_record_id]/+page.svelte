<script lang="ts">
    import { ChecklistRecordList } from "../../../../util/api_data_classes/checklist_records";
    import type {ChecklistRecordAPIType} from "../../../../util/api_data_classes/api_data_types";
    
	export let data;
	let checklist_record: ChecklistRecordAPIType = data.checklist_record_data.data;

</script>

<article>
    <header>Checklist record: {checklist_record.checklist.checklist_name} {checklist_record.id}</header>

    <ul>
        <li>Checklist taxon name: {checklist_record.checklist_taxon.taxon_name}</li>
        <li>Currently mapped to: 
            <a href="/taxon_detail/{checklist_record.mapped_taxon.id}" target="_blank">{checklist_record.mapped_taxon.taxon_name}
            </a>
        </li>
    </ul>
</article>