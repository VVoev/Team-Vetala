import { vehicleController } from '../scripts/controllers/vehicle-controller.js';
import { templateLoader as tl } from '../scripts/common/template-loader.js'
import { userController } from '../scripts/controllers/user-controller.js';
import { homeController } from '../scripts/controllers/home-controller.js';
import * as models from '../scripts/models/models.js';

mocha.setup('bdd');
const expect = chai.expect;

describe("Our App Tests", function() {

    describe("Models Tests", function() {

        describe("Car Tests", function() {
            it("MakerToBeSetCorrect_WhenCreatingCar", function() {
                let car = models.getCar("BMW", "330i", 2008, "petrol", 300, 8800, "NoInfo");
                expect(car.make).to.equal("BMW");
            });
            it("ModelToBeSetCorrect_WhenCreatingCar", function() {
                let car = models.getCar("BMW", "330i", 2008, "petrol", 300, 8800, "NoInfo");
                expect(car.model).to.equal("330i");
            });
            it("CarFuelTypeToBePetrol_WhenCreatingCar", function() {
                let car = models.getCar("BMW", "330i", 2008, "petrol", 300, 8800, "NoInfo");
                expect(car.fuelType).to.equal("petrol");
            });
            it("CarHorsePowersToBeCorrect_WhenCreatingCar", function() {
                let car = models.getCar("BMW", "330i", 2008, "petrol", 300, 8800, "NoInfo");
                expect(car.fuelType).to.equal("petrol");
            });
            it("CarInfoToBeEqualToAdded_Value", function() {
                let car = models.getCar("BMW", "330i", 2008, "petrol", 300, 8800, "ValueForTheMoney");
                expect(car.info).to.equal("ValueForTheMoney");
            });
        });

        describe("Bus Tests", function() {
            it("BusMakerToBeCorrect_WhenCreatingNewBus", function() {
                let bus = models.getBus("Ikarus", "440x", 2010, "diesel", 450, 99000, "PartyBus", 44);
                expect(bus.make).to.equal("Ikarus");
            });
            it("BusModelToBeCorrect_WhenCreatingNewBus", function() {
                let bus = models.getBus("Ikarus", "440x", 2010, "diesel", 450, 99000, "PartyBus", 44);
                expect(bus.make).to.equal("Ikarus");
            });
            it("BusFuelToBeDiesel_WhenCreatingNewBus", function() {
                let bus = models.getBus("Ikarus", "440x", 2010, "diesel", 450, 99000, "PartyBus", 44);
                expect(bus.make).to.equal("Ikarus");
            });
            it("BusPriceToBeCorrect_WhenCreateNewBus", function() {
                let bus = models.getBus("Ikarus", "440x", 2010, "diesel", 450, 99000, "PartyBus", 44);
                expect(bus.make).to.equal("Ikarus");
            });
            it("BusMakerToBeChanged_WhenMakerIsChanged", function() {
                let bus = models.getBus("Ikarus", "440x", 2010, "diesel", 450, 99000, "PartyBus", 44);
                bus.make = "Man";
                expect(bus.make).to.equal("Man");
            });
        });

        describe("User Tests", function() {
            it("User can be created succesfully", function() {
                let user = models.getNewUser("Vlado", "123456", "vlado@abv.bg");
                expect(user.user).to.be.equal("Vlado");
            });
            it("User can be change his nickname succesfully", function() {
                let user = models.getNewUser("Vlado", "123456", "vlado@abv.bg");
                user.user = "Petar";
                expect(user.user).to.be.equal("Petar");
            });
            it("User cannot be created be if email is invalid", function() {
                expect(() => models.getNewUser("vlado", "123456", "invalid_email")).to.throw();
            });
        });
    });

    describe("Controllers Tests", () => {
        describe('HomeController tests', () => {
            let templateStub;

            beforeEach(() => {
                templateStub = sinon.stub(tl, "get")
                    .returns(Promise.resolve("html"));
            });

            afterEach(() => {
                templateStub.restore();
            });

            it('expect to call templateLoader get once', () => {
                homeController.viewHome();
                expect(templateStub).to.have.been.calledOnce;
            });

            it('expect to call templateLoader get with correct name for the home page template', () => {
                homeController.viewHome();
                expect(templateStub).to.have.been.calledWith('home');
            });
        });

        describe("User Controller Tests", () => {

        });

        describe("Vehicle Controller Tests", () => {

        });
    });
});

mocha.run();