export class Contact {
    id: number;
    phone: string;
    email: string;

    constructor(id: number, phone: string, email: string) {
        this.id = id;
        this.phone = phone;
        this.email = email;
    }
}