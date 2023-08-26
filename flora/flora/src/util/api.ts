import axios, { AxiosHeaders } from "axios";


class APIManager {
    api_url: URL;

    constructor(api_url: string) {
        this.api_url = new URL(api_url);
    }

    getUrl(path: string[], params?: { [key: string]: string;}) {
        let url = new URL(path.join('/'), this.api_url);
        if (params) {
            for (const [key, value] of params.entries) {
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

    getChecklists() {
        return this.get(["checklists"]);
    }
    
    getTaxa() {
        return this.get(["taxa"]);
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
    
    getLifeCycleChoices() {
        return this.get(["life_cycles"]);
    }
    
    getEndemicChoices() {
        return this.get(["endemic"]);
    }
    
    getChecklistRecords(taxon_id: number) {
        return this.get(["checklist_records", "?taxon_id=" + taxon_id]);
    }
}


export {APIManager}
