<script lang="ts">
    import TaxonNameAutocompletion from "../../../components/common/TaxonNameAutocompletion.svelte";
    import {
        CreatePersonalCollectionRecord,
        EditPersonalCollectionRecord,
    } from "../../../data_classes/personal_collection_record";
    import type {
        PersonalCollectionRecordType,
        TaxonNameType,
    } from "../../../data_classes/types";
    import type { Optional } from "../../../util/api_util";

    export let data: Optional<PersonalCollectionRecordType, "id">;
    export let create_or_edit: "create" | "edit";
    export let record_id: string | undefined = undefined;
    export let selectedSpecificTaxon: TaxonNameType | undefined = undefined;

    let submit_text: string;
    let submit_url: string;

    if (create_or_edit === "create") {
        submit_text = "Create new record";
        submit_url = "/personal_collection_records";
    } else {
        submit_text = "Edit record";
        submit_url = "/personal_collection_records/" + record_id;
    }

    function createNewRecord() {
        if (selectedSpecificTaxon !== undefined) {
            data.specific_taxon = selectedSpecificTaxon.id;
        } else {
            data.specific_taxon = null;
        }
        let endpoint;
        if (create_or_edit === "create") {
            endpoint = new CreatePersonalCollectionRecord();
        } else {
            endpoint = new EditPersonalCollectionRecord();
        }
        endpoint.callExternal(data).then(() => {
            window.location.href = submit_url;
        });
    }
</script>

<form on:submit={createNewRecord}>
    <div class="grid">
        <label>
            *Number:
            <input
                type="number"
                bind:value={data.collection_number}
                required={true}
            />
        </label>
        <label>
            *Date:
            <input type="date" bind:value={data.date} required={true} />
        </label>
        <label>
            Time:
            <input type="time" bind:value={data.time} step={60} />
        </label>
        <label>
            *Family:
            <input type="text" bind:value={data.family} required={true} />
        </label>
        <label>
            *Preliminary taxon:
            <input
                type="text"
                bind:value={data.preliminary_taxon}
                required={true}
            />
        </label>
        <label>
            *Status:
            <select bind:value={data.status}>
                <option value="p">Personal collection</option>
                <option value="h">Herbarium</option>
                <option value="t">Thrown out</option>
            </select>
        </label>
    </div>
    <div class="grid">
        <label>
            iNat:
            <input type="number" bind:value={data.inat_record_id} />
        </label>
        <label>
            SEINet:
            <input type="number" bind:value={data.seinet_record_id} />
        </label>
        <label>
            Latitude: <input
                type="number"
                step="0.000000000001"
                bind:value={data.latitude}
            />
        </label>
        <label>
            Longitude: <input
                type="number"
                step="0.000000000001"
                bind:value={data.longitude}
            />
        </label>
        <label>
            Elevation (ft):
            <input type="number" bind:value={data.elevation_ft} />
        </label>
    </div>
    <div class="grid">
        <label>
            Locality: <input type="text" bind:value={data.locality} />
        </label>

        <label>
            Habitat: <input type="text" bind:value={data.habitat} />
        </label>
        <label>
            Description: <input type="text" bind:value={data.description} />
        </label>
    </div>
    <div class="grid">
        <label>
            Associated species: <input
                type="text"
                bind:value={data.associated_species}
            />
        </label>
        <label>
            Land ownership: <input
                type="text"
                bind:value={data.land_ownership}
            />
        </label>
    </div>
    <div class="grid">
        <label>
            Identification notes:
            <textarea bind:value={data.identification_notes} />
        </label>
    </div>

    <div id="specific_taxon_div">
        Specific taxon determination:
        <div class="grid">
            <TaxonNameAutocompletion
                placeholder_text={"Specific taxon"}
                bind:selectedItem={selectedSpecificTaxon}
                required={false}
                show_clear={true}
            />
        </div>
    </div>

    <input type="submit" value={submit_text} />
</form>

<style>
    #specific_taxon_div {
        margin-bottom: 15px;
    }
</style>
