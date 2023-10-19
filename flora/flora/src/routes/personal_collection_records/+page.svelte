<script lang="ts">
    import GoogleEarthCoordinates from "../../components/common/GoogleEarthCoordinates.svelte";
    import InatRecordLink from "../../components/common/InatRecordLink.svelte";
    import SEINetRecordLink from "../../components/common/SEINetRecordLink.svelte";
    import type { PersonalCollectionRecordType } from "../../data_classes/types";
    import CreateOrEditForm from "./components/CreateOrEditForm.svelte";
    import TaxonNameLink from "../../components/common/TaxonNameLink.svelte";
    export let data;

    function getYear(datestr: string) {
        return datestr.split("-")[0];
    }

    let personal_collection_records: PersonalCollectionRecordType[] =
        data.personal_collection_record_data;

    let grouped_records: { [key: string]: PersonalCollectionRecordType[] } = {};
    personal_collection_records.forEach((record) => {
        if (record.date) {
            let year = getYear(record.date);
            if (!(year in grouped_records)) {
                grouped_records[year] = [];
            }
            grouped_records[year].push(record);
        }
    });
</script>

<svelte:head>
    <title>Personal collection records</title>
</svelte:head>

<article>
    <details open>
        <summary>Add new record</summary>
        <CreateOrEditForm create_or_edit="create" data={{}} />
    </details>
</article>

{#each Object.keys(grouped_records) as year}
    <article>
        <details open>
            <summary>{year} collections</summary>

            <ul>
                {#each grouped_records[year] as personal_collection_record, i}
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
                            {personal_collection_record.preliminary_taxon} (<span
                                class="error"
                                >no specific taxon determination</span
                            >)
                        {/if}
                        ({personal_collection_record.date}{#if personal_collection_record.time}&nbsp;{personal_collection_record.time}{/if})

                        {#if personal_collection_record.inat_record_id}
                            <InatRecordLink
                                inat_record_id={personal_collection_record.inat_record_id}
                            />
                        {:else}
                            <span class="error">no inat record</span>
                        {/if}
                        {#if personal_collection_record.seinet_record_id}
                            <SEINetRecordLink
                                seinet_record_id={personal_collection_record.seinet_record_id}
                            />
                        {:else if personal_collection_record.status === "h"}
                            <span class="error"
                                >herbarium but no SEINet obs</span
                            >
                        {/if}
                        <sup
                            ><a
                                href="/personal_collection_records/{personal_collection_record.id}"
                                target="_blank">edit</a
                            ></sup
                        >
                    </h4>
                    <ul>
                        <li>
                            Status: {personal_collection_record.status_display}
                        </li>
                        <li>Family: {personal_collection_record.family}</li>
                        {#if personal_collection_record.latitude && personal_collection_record.longitude}
                            <li>
                                Coordinates:
                                <GoogleEarthCoordinates
                                    latitude={personal_collection_record.latitude}
                                    longitude={personal_collection_record.longitude}
                                />
                            </li>
                        {:else}
                            <span class="error">no coordinates</span>
                        {/if}
                        {#if personal_collection_record.elevation_ft}
                            <li>
                                Elevation (feet): {personal_collection_record.elevation_ft}
                            </li>
                        {:else}
                            <span class="error">no elevation</span>
                        {/if}
                        {#if personal_collection_record.locality}
                            <li>
                                Locality: {personal_collection_record.locality}
                            </li>
                        {:else}
                            <span class="error">no locality</span>
                        {/if}
                        {#if personal_collection_record.habitat}
                            <li>
                                Habitat: {personal_collection_record.habitat}
                            </li>
                        {:else}
                            <span class="error">no habitat</span>
                        {/if}
                        {#if personal_collection_record.associated_species}
                            <li>
                                Associated species: {personal_collection_record.associated_species}
                            </li>
                        {:else}
                            <span class="error">no associated species</span>
                        {/if}
                        {#if personal_collection_record.description}
                            <li>
                                Description: {personal_collection_record.description}
                            </li>
                        {/if}
                        {#if personal_collection_record.land_ownership}
                            <li>
                                Land ownership: {personal_collection_record.land_ownership}
                            </li>
                        {:else}
                            <span class="error">no land ownership</span>
                        {/if}
                        {#if personal_collection_record.identification_notes}
                            <li>
                                Identification notes: <pre>{personal_collection_record.identification_notes}</pre>
                            </li>
                        {/if}
                    </ul>
                {/each}
            </ul>
        </details>
    </article>
{/each}
