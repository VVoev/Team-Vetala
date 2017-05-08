import { vehicleController } from '../scripts/controllers/vehicle-controller.js';
import { templateLoader } from '../scripts/common/template-loader.js'
import { userController } from '../scripts/controllers/user-controller.js';
import * as models from '../scripts/models/models.js';

mocha.setup('bdd');
const expect = chai.expect;

// const TEST_TEMPLATE = Handlebars.complile("<div></div>")
// const TEST_USER = 'test_user';

describe("Our App Tests", function() {

    describe("Models Tests", function() {
        it("shouldCreateCar", function() {
            let car = models.getCar("BMW", "A330", 2008, "petrol", 300, 8800, "NoInfo");

            expect(car.make).to.equal("BMW");

        });
    });

    describe("Controllers Tests", function() {

    });
});

mocha.run();