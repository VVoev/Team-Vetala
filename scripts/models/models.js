import * as userModel from "./user.js";
import * as newUserModel from "./new-user.js";
import * as carModel from "./car.js";
import * as motorcycleModel from "./motorcycle.js";
import * as truckModel from "./truck.js";
import * as busModel from "./bus.js";

function getUser(user, pass) {
    return new userModel.User(user, pass);
}

function getNewUser(user, pass, mail) {
    return new newUserModel.NewUser(user, pass, mail);
}

function getCar(make, model, firstRegistration, fuelType, hp, price, info) {
    return new carModel.Car(make, model, firstRegistration, fuelType, hp, price, info);
}

function getMotorcycle(make, model, firstRegistration, fuelType, hp, price, info, type) {
    return new motorcycleModel.Motorcycle(make, model, firstRegistration, fuelType, hp, price, info, type);
}

function getTruck(make, model, firstRegistration, fuelType, hp, price, info, axes) {
    return new truckModel.Truck(make, model, firstRegistration, fuelType, hp, price, info, axes);
}

function getBus(make, model, firstRegistration, fuelType, hp, price, info, seats) {
    return new busModel.Bus(make, model, firstRegistration, fuelType, hp, price, info, seats);
}

export {
    getUser,
    getNewUser,
    getCar,
    getMotorcycle,
    getTruck,
    getBus
};