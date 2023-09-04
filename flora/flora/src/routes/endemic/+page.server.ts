import { APIManager } from "../../util/api";

export async function load({ params }) {
    let api_manager = new APIManager("http://127.0.0.1:8000/api/");

    return {
        taxon_data: (await api_manager.getPrimaryChecklistTaxa()).data,
    }
}