export interface Offre {

    id: number;
    name: string;
    description: string;
    currentprice: number;
    new_prix: number;
    promotion: boolean;
    selected: boolean;
    available: boolean;
    photoName: string;
    date_debut: Date;
    date_fin: Date;
    comission: number;
    lieu: string;
    quantity: number;

    _links: {
        self: {
            href: string;
        },
        offres: {
            href: string;
        },
        category: {
            id: number;
        }
    };

}
