export class Bike {
    _id: string;
    name: string;
    kms: string;
    description: string;
    available: boolean;

    constructor(_id = '', name = '', kms = '', description = '', available = true) {
        this._id = _id;
        this.name = name;
        this.kms = kms;
        this.description = description;
        this.available = available;
    }
}
