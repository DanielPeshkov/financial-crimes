export class Address {
    id: number | null;
    type: string | null;
    street: string | null;
    street2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;

    constructor(id: number | null, type: string | null, street: string | null, street2: string | null, 
                city: string | null, state: string | null, zip: string | null, country: string | null
    ) {
        this.id = id;
        this.type = type;
        this.street = street;
        this.street2 = street2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
    }
}

export function createAddress(data: any): Address {
    const {id, type, street, street2, city, state, zip, country, ...ect} = data;

    const address = new Address(id, type, street, street2, city, state, zip, country);
    return address;
}