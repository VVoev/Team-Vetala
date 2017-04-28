import { homeController } from "./controllers/home-controller.js";
import { userController } from "./controllers/user-controller.js";
import { carController } from "./controllers/car-controller.js";
import { validator } from "./common/validator.js";
import { constants } from './constants/constants.js';
import { toastrSettings } from './config/toastr-config.js';

(function() {
    let sammyApp = Sammy('#content', function() {

        //configuring toaster to work as you want to work
        toastr.options = toastrSettings;

        // original state of this
        let carApi = this;

        //Default view
        this.get('#/', homeController.viewHome);
        this.get('#/Home', homeController.viewHome);

        //All other views
        this.get('#/Contact', homeController.viewContacts);

        this.get('#/Register', function(context) {
            if (validator.isUserLoggedIn()) {
                toastr.error(constants.ERROR_HAVE_ACCOUNT);
                document.location = '#/Home'
            } else {
                userController.register(context);
            }
        });

        this.get('#/Login', function(context) {
            if (validator.isUserLoggedIn()) {
                toastr.error(constants.ERROR_ALREADY_LOGGED);
                document.location = '#/Home'
            } else {
                userController.login(context);
            }
        });

        this.get('#/Shop', carController.all);

        this.get('#/AddCar', function(context) {
            if (!validator.isUserLoggedIn()) {
                toastr.error(constants.ERROR_UNAUTORIZE_ADD_VEHICLE);
                document.location = '#/Home'
            } else {
                carController.addCar(context);
            }
        });

        this.get('#/Logout', function(context) {
            let user = sessionStorage.getItem("userName");
            sessionStorage.clear();
            userController.deactivateField();
            $('#logginUser').html('');
            toastr.warning(constants.SUCCESS_LOGOUT + " " + user);
            document.location = '#/Home';
        });

        this.get('#/Edit/', function(context) {
            carController.editCar(context);
        });

        this.get('#/Delete/', function(context) {
            carController.deleteCar(context);
        });


    });

    $(function() {
        sammyApp.run('#/')
    })

    return {
        sammyApp,
    }

})();