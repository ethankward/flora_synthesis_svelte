class TaxonSynonym {
    id: number;
    taxon: number;
    synonym: string;

    constructor(id: number, taxon: number, synonym: string) {
        this.id = id;
        this.taxon = taxon;
        this.synonym = synonym;
    }
}

export {TaxonSynonym}