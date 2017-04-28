import * as carModel from "./car.js";
import * as motorcycleModel from "./motorcycle.js";
import * as truckModel from "./truck.js";
import * as busModel from "./bus.js";

function getCar(make, model, year, hp, price) {
    return new carModel.Car(make, model, year, hp, price);
}

function getMotorcycle(make, model, year, hp, price, type) {
    return new motorcycleModel.Motorcycle(make, model, year, hp, price, type);
}

function getTruck(make, model, year, hp, price, axes) {
    return new truckModel.Truck(make, model, year, hp, price, axes);
}

function getBus(make, model, year, hp, price, seats) {
    return new busModel.Bus(make, model, year, hp, price, seats);
}

export {
    getCar,
    getMotorcycle,
    getTruck,
    getBus
};