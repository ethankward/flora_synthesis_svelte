import { createNewEndpoint } from "../util/api_util";



const CreateNewChecklistRecordNote = createNewEndpoint<{ checklist_record_id: number, checklist_record_type: string, note: string }>(
    "POST", "checklist_record_notes", "create_new_checklist_record_note"
)

const UpdateChecklistRecordNote = createNewEndpoint<{ id: number, note: string }>(
    "PATCH", "checklist_record_notes", "update_checklist_record_note", (crn) => [crn.id.toString()]
);

const DeleteChecklistRecordNote = createNewEndpoint<{ id: number }>(
    "DELETE", "checklist_record_notes", "delete_checklist_record_note", (crn) => [crn.id.toString()]
);


const checklist_record_note_exported_endpoints = [
    new CreateNewChecklistRecordNote(),
    new UpdateChecklistRecordNote(),
    new DeleteChecklistRecordNote()
]

export { CreateNewChecklistRecordNote, DeleteChecklistRecordNote, UpdateChecklistRecordNote, checklist_record_note_exported_endpoints };

