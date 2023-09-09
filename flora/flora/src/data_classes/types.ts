import type { ValueDisplayType } from "../types";


type ChecklistType = {
    id: number,
    checklist_name: string,
    checklist_type: string,
    external_checklist_id: number,
    locality: string,
    latest_date_retrieved?: string,
    earliest_year?: string
}



type ChecklistTaxonType = {
    id: number,
    taxon_name: string,
    family: string,
    external_id: number,
    rank: string,
    genus: string,
    checklist: number,
    all_mapped_taxa: TaxonNameType[];
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
    observation_type: string
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

export type {
    ChecklistType,
    ChecklistTaxonType, 
    TaxonNameType, 
    TaxonType, 
    MinimalTaxonType, 
    ChecklistRecordType, 
    TaxonSynonymType, 
    EndemicType, 
    LifeCycleType, 
    IntroducedType,
    ObservationDateType
}