import axios from "axios";
import { env } from '$env/dynamic/private';


axios.defaults.headers.common['Authorization'] = `Token ${env.API_AUTH_TOKEN}`;


class APIManager {
    api_url: URL;

    constructor(api_url: string) {
        this.api_url = new URL(api_url);
    }

    getUrl(path: string[], params?: { [key: string]: string;}) {
        let url = new URL(path.join('/'), this.api_url);
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                url.searchParams.set(key, value);
            }
            return url.toString();
        } else {
            let result = url.toString();
            if (!result.endsWith('/')) {
                result = result + '/';
            }
            return result;
        }


    }

    get(path: string[], params?: { [key: string]: string;}) {
        return axios.get(this.getUrl(path, params));
    }

    patch(data: any, path: string[], params?: { [key: string]: string;}) {
        return axios.patch(this.getUrl(path, params), data);
    }

    post(data: any, path: string[]) {
        return axios.post(this.getUrl(path), data);
    }

    put(data: any, path: string[]) {
        return axios.put(this.getUrl(path), data);
    }

    getChecklists() {
        return this.get(["checklists"]);
    }
    
    getTaxa() {
        return this.get(["taxa"]);
    }
    
    getPrimaryChecklistTaxa() {
        return this.get(["primary_taxa"]);
    }

    getChecklistTaxa(checklist_id: number) {
        return this.get(["taxa"], {"checklist": checklist_id.toString()});
    }

    getGenusTaxa(genus: string) {
        return this.get(["taxa"], {"genus": genus});
    }

    getFamilyTaxa(family: string) {
        return this.get(["taxa"], {"family": family});
    }
    
    getTaxon(taxon_id: number) {
        return this.get(["taxa", taxon_id.toString()]);
    }
    
    getObservationTypes() {
        return this.get(["observation_types"]);
    }
    
    updateTaxon(taxon_id: number, data: any) {
        return this.patch(data, ["taxa", taxon_id.toString()])
    }
    
    updateSynonym(synonym_id: number, data: any) {
        return this.patch(data, ["taxon_synonyms", synonym_id.toString()]);
    }

    createNewSynonym(data: any) {
        return this.put(data, ["create_new_synonym"]);
    }
    
    deleteSynonym(synonym_id: number) {
        return this.post({synonym_id: synonym_id}, ["delete_taxon_synonym"])
    }

    getLifeCycleChoices() {
        return this.get(["life_cycles"]);
    }
    
    getEndemicChoices() {
        return this.get(["endemic"]);
    }
    
    getIntroducedChoices() {
        return this.get(["introduced"]);
    }

    getChecklistRecords(taxon_id: number) {
        return this.get(["checklist_records"], {"taxon_id": taxon_id.toString()});
    }

    getTaxaAutocompletion(search_term: string) {
        return this.get(["taxa_autocomplete"], {"search_term": search_term})
    }

    makeSynonymOf(taxon_id_1: number, taxon_id_2: number) {
        return this.post({"taxon_id_1": taxon_id_1, "taxon_id_2": taxon_id_2},
        ["make_synonym_of"]);
    }

    getChecklistRecord(checklist_type: string, checklist_record_id: number) {
        return this.get(["checklist_records", checklist_type, checklist_record_id.toString()]);
    }

    updateChecklistRecordMappedTo(checklist_type: string, checklist_record_id: number, mapped_to_id: number) {        
        return this.post({
            "checklist_type": checklist_type,
            "checklist_record_id": checklist_record_id,
            "mapped_to_id": mapped_to_id},
            ["update_checklist_record_mapping"]);
    }

    createNewChecklistRecordNote(checklist_record_id: number, checklist_record_type: string, note: string) {
        return this.put({checklist_record_id: checklist_record_id, checklist_record_type: checklist_record_type, note: note}, ["create_new_checklist_record_note"])
    }

    deleteChecklistRecordNote(note_id: number) {
        return this.post({note_id: note_id}, ["delete_checklist_record_note"])
    }

    updateChecklistRecordNote(note_id: number, note: string) {
        return this.post({note_id: note_id, note: note}, ["update_checklist_record_note"])
    }
}

export {APIManager}
