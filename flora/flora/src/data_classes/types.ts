import type { ValueDisplayType } from "../types";


type ChecklistType = {
    id: number,
    checklist_name: string,
    checklist_type: string,
    external_checklist_id: number,
    locality: string,
    latest_date_retrieved?: string,
    earliest_year?: string,
    primary_checklist: boolean,
    citation: string,
    citation_url: string
}

type ChecklistStaleRecordCountType = {
    id: number,
    stale_record_count: number
}


type TaxonNameType = {
    id: number,
    taxon_name: string
}

type ObservationDateType = {
    date: string,
    url: string
}


type TaxonType = {
    id: number,
    taxon_name: string,
    rank: string,
    genus: string,
    family: string,
    seinet_id?: number,
    inat_id?: number,
    taxon_checklist_taxa: TaxonType[],
    synonyms: ValueDisplayType[],
    parent_species?: TaxonNameType
    subtaxa: TaxonNameType[],
    checklists: number[],
    introduced: string,
    introduced_display: string,
    endemic: string,
    endemic_display: string,
    life_cycle: string
    life_cycle_display: string,
    first_observation_date?: string,
    first_observation_date_url?: string,
    last_observation_date?: string,
    last_observation_date_url?: string,

    has_collections?: boolean;

    all_mapped_taxa?: TaxonNameType[],
    external_id?: number,
    primary_checklist: boolean,

    local_population_strict_northern_range_limit?: boolean,
    local_population_strict_southern_range_limit?: boolean,
    local_population_strict_eastern_range_limit?: boolean,
    local_population_strict_western_range_limit?: boolean,

    occurrence_remarks?: string,

    author?: string

}


type MinimalTaxonType = {
    id: number,
    taxon_name: string,
    rank: string,
    genus: string,
    family: string,
    introduced: ValueDisplayType,
    endemic: ValueDisplayType,
    life_cycle: ValueDisplayType,
    seinet_id?: number,
    inat_id?: number,
    first_observation_date?: string,
    first_observation_date_url?: string,
    last_observation_date?: string,
    last_observation_date_url?: string,


    local_population_strict_northern_range_limit?: boolean,
    local_population_strict_southern_range_limit?: boolean,
    local_population_strict_eastern_range_limit?: boolean,
    local_population_strict_western_range_limit?: boolean,

    author?: string
}


type ChecklistRecordNoteType = {
    id: number,
    note: string,
    added_on: string
}


type ChecklistRecordType = {
    id: number,
    external_id: string,
    last_refreshed: string,
    checklist_taxon: TaxonNameType,
    mapped_taxon: TaxonNameType,
    checklist: ChecklistType,
    date: string,
    observer: string,
    external_url: string,
    observation_type: string,
    notes: ChecklistRecordNoteType[]
}

type ChecklistStaleRecordType = {
    id: number,
    stale_records: ChecklistRecordType[]
}


type ChecklistRecordNoCollectorType = {
    id: number,
    observer: string,
    date: string,
    external_url: string
}


type TaxonSynonymType = {
    id: number,
    taxon: number,
    synonym: string
}

type EndemicType = {
    value: string,
    display: string
}


type LifeCycleType = {
    value: string,
    display: string
}

type IntroducedType = {
    value: string,
    display: string
}

type PersonalCollectionRecordType = {
    id: number,

    collection_number?: number
    date?: string,
    family?: string,
    status?: string,
    status_display?: string,
    preliminary_taxon?: string,

    time?: string,
    inat_record_id?: number,
    seinet_record_id?: number,
    specific_taxon?: number | null,
    specific_taxon_name?: string,
    latitude?: number,
    longitude?: number,
    elevation_ft?: number,
    locality?: string,
    habitat?: string,
    associated_collectors?: string,
    associated_species?: string,
    identification_notes?: string,
    description?: string,
    land_ownership?: string
}


type CollectorAliasType = {
    id: number,
    collector: number,
    alias: string
}

type CollectorType = {
    id: number,
    name: string,
    external_url?: string,
    collector_aliases: ValueDisplayType[],
    first_collection_year?: number,
    last_collection_year?: number,
    seinet_collection_records: {
        id: number,
        external_id?: string,
        date?: string,
        external_url?: string,
        observation_type: string,
        taxon_name: string,
        observer: string
    }[]
}

type HerbariumReportType = {
    id: number,
    taxon: string,
    url: string
}


export type {
    ChecklistRecordType, ChecklistRecordNoCollectorType, ChecklistStaleRecordCountType,
    ChecklistType, EndemicType,
    IntroducedType, LifeCycleType, MinimalTaxonType,
    ObservationDateType, TaxonNameType, TaxonSynonymType,
    TaxonType, PersonalCollectionRecordType, ValueDisplayType, ChecklistRecordNoteType,
    CollectorAliasType, CollectorType, HerbariumReportType, ChecklistStaleRecordType
};
