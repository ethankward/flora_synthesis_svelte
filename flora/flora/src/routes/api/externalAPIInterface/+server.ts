import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { APIManager } from "../../../util/api";
import {execute, APIEndpoints} from "../../../util/local_api_dispatch";


let external_api_manager = new APIManager(env.API_ENDPOINT);


/** @type {import('./$types').RequestHandler} */
export async function POST({request, params, url}) {
    const data = await request.json();
    const endpoint_identifier = url.searchParams.get("endpoint_identifier");
    if (!endpoint_identifier) {
        throw new Error("Something went wrong");
    }

    let result = execute(external_api_manager, data, endpoint_identifier as APIEndpoints);
    if (!result) {
        throw new Error("Something went wrong");
    }

    return json((await result).data);

}
