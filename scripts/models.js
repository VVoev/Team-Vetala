// simple model structure, needs to be completed...

class Vehicle {
    constructor(manufacturer, model, year, hp, price) {
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year;
        this.hp = hp;
        this.price = price;
    }

    get manufacturer() {
        return this._manufacturer;
    }

    set manufacturer(value) {
        this._manufacturer = value;
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

class Car extends Vehicle {
    constructor(manufacturer, model, year, hp, price) {
        super(manufacturer, model, year, hp, price);
    }

}

class Motorcycle extends Vehicle {
    constructor(manufacturer, model, year, hp, price, type) {
        super(manufacturer, model, year, hp, price);
        this.type = type;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}

class Truck extends Vehicle {
    constructor(manufacturer, model, year, hp, price, axes) {
        super(manufacturer, model, year, hp, price);
        this.axes = axes;
    }

    get axes() {
        return this._axes;
    }

    set axes(value) {
        this._axes = value;
    }
}

class Bus extends Vehicle {
    constructor(manufacturer, model, year, hp, price, seats) {
        super(manufacturer, model, year, hp, price);
        this.seats = seats;
    }

    get seats() {
        return this._seats;
    }

    set seats(value) {
        this._seats = value;
    }
}

function getCar(manufacturer, model, year, hp, price) {
    return new Car(manufacturer, model, year, hp, price);
}

function getMotorcycle(manufacturer, model, year, hp, price, type) {
    return new Motorcycle(manufacturer, model, year, hp, price, type);
}

function getTruck(manufacturer, model, year, hp, price, axes) {
    return new Truck(manufacturer, model, year, hp, price, axes);
}

function getBus(manufacturer, model, year, hp, price, seats) {
    return new Bus(manufacturer, model, year, hp, price, seats);
}

export {
    getCar,
    getMotorcycle,
    getTruck,
    getBus
};