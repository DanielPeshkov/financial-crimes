export class Address {
    id: number;
    type: string;
    street: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
    country: string;

    constructor(id: number, type: string, street: string, street2: string, 
                city: string, state: string, zip: string, country: string
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
