<script lang="ts">
    import GoogleEarthCoordinates from "../../components/common/GoogleEarthCoordinates.svelte";
    import InatRecordLink from "../../components/common/InatRecordLink.svelte";
    import SEINetRecordLink from "../../components/common/SEINetRecordLink.svelte";
    import type { PersonalCollectionRecordType } from "../../data_classes/types";
    import CreateOrEditForm from "./components/CreateOrEditForm.svelte";
    import TaxonNameLink from "../../components/common/TaxonNameLink.svelte";
    export let data;

    let personal_collection_records: PersonalCollectionRecordType[] =
        data.personal_collection_record_data;
</script>

<article>
    <details open>
        <summary>Add new record</summary>
        <CreateOrEditForm create_or_edit="create" data={{}} />
    </details>
</article>

<article>
    <header>Personal collections</header>

    <ul>
        {#each personal_collection_records as personal_collection_record, i}
            {#if i > 0}<hr />{/if}
            <h4>
                {personal_collection_record.collection_number}:
                {#if personal_collection_record.specific_taxon && personal_collection_record.specific_taxon_name}
                    <TaxonNameLink
                        taxon={{
                            id: personal_collection_record.specific_taxon,
                            taxon_name:
                                personal_collection_record.specific_taxon_name,
                        }}
                    />
                {:else}
                    {personal_collection_record.preliminary_taxon}
                {/if}
                ({personal_collection_record.date}{#if personal_collection_record.time}&nbsp;{personal_collection_record.time}{/if})

                {#if personal_collection_record.inat_record_id}
                    <InatRecordLink
                        inat_record_id={personal_collection_record.inat_record_id}
                    />
                {/if}
                {#if personal_collection_record.seinet_record_id}
                    <SEINetRecordLink
                        seinet_record_id={personal_collection_record.seinet_record_id}
                    />
                {/if}
                <sup
                    ><a
                        href="/personal_collection_records/{personal_collection_record.id}"
                        target="_blank">edit</a
                    ></sup
                >
            </h4>
            <ul>
                <li>Status: {personal_collection_record.status_display}</li>
                <li>Family: {personal_collection_record.family}</li>
                {#if personal_collection_record.latitude && personal_collection_record.longitude}
                    <li>
                        Coordinates:
                        <GoogleEarthCoordinates
                            latitude={personal_collection_record.latitude}
                            longitude={personal_collection_record.longitude}
                        />
                    </li>
                {/if}
                {#if personal_collection_record.elevation_ft}
                    <li>
                        Elevation (feet): {personal_collection_record.elevation_ft}
                    </li>
                {/if}
                {#if personal_collection_record.locality}
                    <li>
                        Locality: {personal_collection_record.locality}
                    </li>
                {/if}
                {#if personal_collection_record.habitat}
                    <li>
                        Habitat: {personal_collection_record.habitat}
                    </li>
                {/if}
                {#if personal_collection_record.associated_species}
                    <li>
                        Associated species: {personal_collection_record.associated_species}
                    </li>
                {/if}
            </ul>
        {/each}
    </ul>
</article>