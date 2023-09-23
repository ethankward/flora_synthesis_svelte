import { createNewEndpoint } from "../util/api_util";



const CreateNewChecklistRecordNote = createNewEndpoint<{ checklist_record_id: number, checklist_record_type: string, note: string }>(
    "PUT", "create_new_checklist_record_note", "create_new_checklist_record_note"
)

const UpdateChecklistRecordNote = createNewEndpoint<{ id: number, note: string }>(
    "POST", "update_checklist_record_note", "update_checklist_record_note"
);

const DeleteChecklistRecordNote = createNewEndpoint<{ id: number }>(
    "POST", "delete_checklist_record_note", "delete_checklist_record_note"
);


const checklist_record_note_exported_endpoints = [
    new CreateNewChecklistRecordNote(),
    new UpdateChecklistRecordNote(),
    new DeleteChecklistRecordNote()
]

export { CreateNewChecklistRecordNote, DeleteChecklistRecordNote, UpdateChecklistRecordNote, checklist_record_note_exported_endpoints };

