import { z } from "zod";

export class TransactionDTO {
    constructor({ id, productId, createdAt, responsible, status, type, quantity }) {
        this.id = id;
        this.productId = productId;
        this.date = `${new Date(createdAt).toISOString().split('T')[0]} à ${new Date(createdAt).toISOString().split('T')[1].split('.')[0]}`;
        this.type = type;
        this.status = status;
        this.quantity = quantity;
        this.responsible = {
            responsibleId: responsible.id,
            username: responsible.username
        }
    }
}
// Nom utilisateur, date, quantity, type
export class TransactionDetailDTO {
    constructor({id, name, reference, category, description, stock }) {
        this.id = id;
        this.name = name;
        this.reference = reference;
        this.category = category;
        this.description = description
        this.quantity = stock.quantity
    }
}