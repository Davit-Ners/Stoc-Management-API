export class ProductDTO {
    constructor({ id, name, category }) {
        this.id = id;
        this.name = name;
        this.category = category;
    }
}

export class ProductDetailDTO {
    constructor({id, name, reference, category, description }) {
        this.id = id;
        this.name = name;
        this.reference = reference;
        this.category = category;
        this.description = description
    }
}