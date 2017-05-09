import {vehicleController} from '../scripts/controllers/vehicle-controller.js';
import {templateLoader} from '../scripts/common/template-loader.js'
import {userController} from '../scripts/controllers/user-controller.js';
import * as models from '../scripts/models/models.js';

mocha.setup('bdd');
const expect = chai.expect;

// const TEST_TEMPLATE = Handlebars.complile("<div></div>")
// const TEST_USER = 'test_user';

describe("Our App Tests", function () {

    describe("Models Tests", function () {

        describe("Car Tests", function () {
            it("MakerToBeBmw_WhenCreatingCarBmw", function () {
                let car = models.getCar("BMW", "330i", 2008, "petrol", 300, 8800, "NoInfo");
                expect(car.make).to.equal("BMW");
            });
            it("ModelToBe330i_WhenCreatingCarWithModel330i", function () {
                let car = models.getCar("BMW", "330i", 2008, "petrol", 300, 8800, "NoInfo");
                expect(car.model).to.equal("330i");
            });
            it("CarFuelTypeToBePetrol_WhenCreatingCarWithFuelTypePetrol", function () {
                let car = models.getCar("BMW", "330i", 2008, "petrol", 300, 8800, "NoInfo");
                expect(car.fuelType).to.equal("petrol");
            });
            it("CarHorsePowersToBe300_WhenCreatingCarWith300HorsePowers", function () {
                let car = models.getCar("BMW", "330i", 2008, "petrol", 300, 8800, "NoInfo");
                expect(car.fuelType).to.equal("petrol");
            })
            it("CarInfoToBeEqualToAdded_Value", function () {
                let car = models.getCar("BMW", "330i", 2008, "petrol", 300, 8800, "ValueForTheMoney");
                expect(car.info).to.equal("ValueForTheMoney");
            })
        });

        describe("Bus Tests", function () {
            it("BusMakerToBeIkarus_WhenMakerIsICarus",function () {
                let bus = models.getBus("Ikarus","440x",2010,"diesel",450,99000,"PartyBus",44);
                expect(bus.make).to.equal("Ikarus");
            })
            it("BusModelToBe440x_WhenModels440x",function () {
                let bus = models.getBus("Ikarus","440x",2010,"diesel",450,99000,"PartyBus",44);
                expect(bus.make).to.equal("Ikarus");
            })
            it("BusFuelTypeToBeDiesel_WhenIsDiesel",function () {
                let bus = models.getBus("Ikarus","440x",2010,"diesel",450,99000,"PartyBus",44);
                expect(bus.make).to.equal("Ikarus");
            })
            it("BusPriceToBe990000_WhenPriceIs99000Euro",function () {
                let bus = models.getBus("Ikarus","440x",2010,"diesel",450,99000,"PartyBus",44);
                expect(bus.make).to.equal("Ikarus");
            })
            it("BusMakerToBeChanged_WhenMakerIsChanged",function () {
                let bus = models.getBus("Ikarus","440x",2010,"diesel",450,99000,"PartyBus",44);
                bus.make = "Man";
                expect(bus.make).to.equal("Man");
            })
        });

        describe("User Tests", function () {
           it("ExpectNewUSerToBeCreatedSuccesfully_WhenCreatingNewUser",function () {
               let user = models.getNewUser("Vlado","1","vlado@abv.bg");
               //not passing i dont know why
               assert.equal(user.name,"Vlado");
           })
        });

        describe("Kinvey requests",function () {
            beforeEach(function() {
                sinon.stub(vehicleController.all, 'vehicleController.All')
                    .returns(Promise.resolve(data.result));

                sinon.stub(templates, 'get')
                    .returns(Promise.resolve(SOME_TEMPLATE));
            });

            it("expect vehicleController.all() to be called exactly once", function(done) {
                vehicleController.all()
                    .then((data) => {
                        console.log(data)
                    })
                    .then(done, done);
            });
        })




    });

});

mocha.run();