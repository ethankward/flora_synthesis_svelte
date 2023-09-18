import type { ValueDisplayType } from "../types";


type ChecklistType = {
    id: number,
    checklist_name: string,
    checklist_type: string,
    external_checklist_id: number,
    locality: string,
    latest_date_retrieved?: string,
    earliest_year?: string,
    primary_checklist: boolean
}

type ChecklistStaleRecordCountType = {
    id: number,
    stale_record_count: number
}

type TaxonNameType = {
    id: number,
    taxon_name: string
}

type ChecklistTaxonType = {
    id: number,
    taxon_name: string,
    family: string,
    external_id: number,
    rank: string,
    genus: string,
    checklist: number,
    all_mapped_taxa: TaxonNameType[],
    primary_checklist: boolean
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
    taxon_checklist_taxa: ChecklistTaxonType[],
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
    first_observation_date: ObservationDateType,
    last_observation_date: ObservationDateType,
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
    first_observation_date: ObservationDateType,
    last_observation_date: ObservationDateType,
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
    id?: number,

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
}

export type {
    ChecklistRecordType, ChecklistStaleRecordCountType,
    ChecklistTaxonType, ChecklistType, EndemicType,
    IntroducedType, LifeCycleType, MinimalTaxonType,
    ObservationDateType, TaxonNameType, TaxonSynonymType,
    TaxonType, PersonalCollectionRecordType
};
