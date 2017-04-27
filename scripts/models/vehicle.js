export class Vehicle {
    constructor(make, model, year, hp, price) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.hp = hp;
        this.price = price;
    }

    get make() {
        return this._make;
    }

    set make(value) {
        this._make = value;
    }

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }

    get year() {
        return this._year;
    }

    set year(value) {
        this._year = value;
    }

    get hp() {
        return this._hp;
    }

    set hp(value) {
        this._hp = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }
}