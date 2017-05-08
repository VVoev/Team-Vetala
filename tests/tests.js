import {vehicleController} from '../scripts/controllers/vehicle-controller.js';
import {templateLoader} from '../scripts/common/template-loader.js'
import {userController} from '../scripts/controllers/user-controller.js';
import {models} from '../scripts/models/models.js';

console.log("tuka")
mocha.setup('bdd');
const expect = chai.expect;
const TEST_TEMPLATE = Handlebars.complile("<div></div>")
const TEST_USER = 'test_user';

describe("Test Controllers", function () {
    describe("Models Tests", function () {
        describe("AllTests", function () {
            it("shouldCreateCar", function () {
                let car = models.getCar("BMW", "330", 2008, "petrol", 300, 8800, "NoInfo");
                expect(10).to.be.above(5);
                // expect('foobar').to.contain('petrol');
            })
        })
    })

})
