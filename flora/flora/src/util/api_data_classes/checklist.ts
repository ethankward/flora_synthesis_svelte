import axios from "axios";


class Checklist {
    id: number;
    checklist_name: string;

    constructor(id: number, checklist_name: string) {
        this.id = id;
        this.checklist_name = checklist_name;
    }
}


class ChecklistList {
    checklists: {[key: number]: Checklist;};

    constructor(api_data: any) {
        this.checklists = Object.fromEntries(api_data.map((ch: any) => [ch.pk, new Checklist(ch.pk, ch.checklist_name)]));
    }

    getChecklist(id: number) {
        return this.checklists[id];
    }
}


export {Checklist, ChecklistList}
