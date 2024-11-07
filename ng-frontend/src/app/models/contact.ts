export class Contact {
    id: number | null;
    phone: string | null;
    email: string | null;

    constructor(id: number | null, phone: string | null, email: string | null) {
        this.id = id;
        this.phone = phone;
        this.email = email;
    }    
}

export function createContact(data: any): Contact | null {
    let {id, phone, email, ...etc} = data;
    if (id || phone || email) {
        const contact = new Contact(id, phone, email);
        return contact;
    }

    return null;
}