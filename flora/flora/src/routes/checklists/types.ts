import type {
    TaxonOrChecklistTaxon,
} from "../../data_classes/taxon";

class DisplayedField {
    title: string = "";
    visible: boolean = true;
    is_toggleable: boolean = true;
    sort_direction: "asc" | "desc" | undefined;
    sort_arrow: "▲" | "▼" | undefined;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get_display(taxon: TaxonOrChecklistTaxon): string {
        return "";
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    visible_in_list_format(taxon: TaxonOrChecklistTaxon) {
        return this.visible;
    }

    visible_in_table_format() {
        return true;
    }

    update_sort_direction() {
        if (this.sort_direction == "asc") {
            this.sort_direction = "desc";
            this.sort_arrow = "▼";
        } else if (this.sort_direction == "desc") {
            this.sort_direction = "asc";
            this.sort_arrow = "▲";
        } else {
            this.sort_direction = "asc";
            this.sort_arrow = "▲";
        }
    }

    compare(t1: TaxonOrChecklistTaxon, t2: TaxonOrChecklistTaxon) {
        if (this.sort_direction === "asc") {
            return this.get_display(t1).localeCompare(this.get_display(t2));
        } else if (this.sort_direction === "desc") {
            return -this.get_display(t1).localeCompare(this.get_display(t2));
        } else {
            return 1;
        }
    }

}


class TaxonNameField extends DisplayedField {
    title = "Taxon name";
    visible = true;
    is_toggleable = false;

    get_display(taxon: TaxonOrChecklistTaxon) {
        return taxon.taxon_name();
    }

    visible_in_list_format() {
        return false;
    }

    visible_in_table_format() {
        return false;
    }
}


class FamilyField extends DisplayedField {
    title = "Family";
    visible = false;

    get_display(taxon: TaxonOrChecklistTaxon) {
        return taxon.family();
    }

}

class MappedToField extends DisplayedField {
    title = "Mapped taxa";
    visible = false;

    visible_in_list_format() {
        return false;
    }

    get_display(taxon: TaxonOrChecklistTaxon) {
        if (taxon.is_checklist_taxon) {
            return taxon.all_mapped_taxa().map((mapped_taxon) => mapped_taxon.taxon_name).join(", ")
        } else {
            return taxon.taxon_name();
        }
    }

}

class SynonymsField extends DisplayedField {
    title = "Synonyms";
    visible = true;

    get_display(taxon: TaxonOrChecklistTaxon) {
        return taxon.synonyms().map((synonym) => synonym.display).join(", ")
    }

    visible_in_list_format(taxon: TaxonOrChecklistTaxon) {
        return this.visible && taxon.synonyms().length > 0;
    }
}

class LifeCycleField extends DisplayedField {
    title = "Life cycle";
    visible = false;
    get_display(taxon: TaxonOrChecklistTaxon) {
        const result = taxon.life_cycle_display();
        if (!result) {
            return "Unknown";
        }
        return result;
    }
}

class IntroducedField extends DisplayedField {
    title = "Introduced";
    visible = false;
    get_display(taxon: TaxonOrChecklistTaxon) {
        const result = taxon.introduced_display();
        if (!result) {
            return "Unknown";
        }
        return result;
    }
}

class EndemicField extends DisplayedField {
    title = "Endemic";
    visible = false;
    get_display(taxon: TaxonOrChecklistTaxon) {
        const result = taxon.endemic_display();
        if (!result) {
            return "Unknown";
        }
        return result;
    }
}

class FirstObservationDateField extends DisplayedField {
    title = "First observation date";
    visible = false;
    get_display(taxon: TaxonOrChecklistTaxon) {
        const result = taxon.first_observation_date();
        if (!result) {
            return "Unknown";
        }
        return result;
    }
}

class LastObservationDateField extends DisplayedField {
    title = "Last observation date";
    visible = false;
    get_display(taxon: TaxonOrChecklistTaxon) {
        const result = taxon.last_observation_date();
        if (!result) {
            return "Unknown";
        }
        return result;
    }
}

class HasCollectionsField extends DisplayedField {
    title = "Has collections";
    visible = false;

    get_display(taxon: TaxonOrChecklistTaxon): string {
        const result = taxon.has_collections();
        if (result) {
            return "Yes";
        } else {
            return "No";
        }
    }
}

const all_field_types: (typeof DisplayedField)[] = [
    TaxonNameField, MappedToField, FamilyField, SynonymsField,
    LifeCycleField, IntroducedField, EndemicField,
    FirstObservationDateField, LastObservationDateField, HasCollectionsField
];

export {
    all_field_types
};
export type { DisplayedField };

