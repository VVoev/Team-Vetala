import { homeController } from "./controllers/home-controller.js";
import { userController } from "./controllers/user-controller.js";
import { vehicleController } from "./controllers/vehicle-controller.js";
import { validator } from "./common/validator.js";
import { constants } from "./common/constants.js";

(function() {
    let sammyApp = Sammy("#content", function() {

        //Default view
        this.get("#/", homeController.viewHome);
        this.get("#/Home", homeController.viewHome);

        //All other views
        this.get("#/Register", function(context) {
            if (validator.isUserLoggedIn()) {
                toastr.error(constants.ERROR_HAVE_ACCOUNT);
                document.location = "#/Home"
            } else {
                userController.register(context);
            }
        });

        this.get("#/Login", function(context) {
            if (validator.isUserLoggedIn()) {
                toastr.error(constants.ERROR_ALREADY_LOGGED);
                document.location = "#/Home"
            } else {
                userController.login(context);
            }
        });

        this.get("#/Logout", function(context) {
            if (!validator.isUserLoggedIn()) {
                toastr.error(constants.ERROR_UNAUTORIZED);
            } else {
                userController.logout();
            }
        });

        this.get("#/Contact", homeController.viewContacts);

        this.get("#/Shop", vehicleController.all);

        this.get("#/AddVehicle", function(context) {
            if (!validator.isUserLoggedIn()) {
                toastr.error(constants.ERROR_UNAUTORIZED);
                document.location = "#/Home"
            } else {
                vehicleController.addVehicle(context);
            }
        });

        this.get("#/Edit/", function(context) {
            if (!validator.isUserLoggedIn()) {
                toastr.error(constants.ERROR_UNAUTORIZED);
                document.location = "#/Home"
            } else {
                vehicleController.editVehicle(context);
            }
        });

        this.get("#/Delete/", function(context) {
            if (!validator.isUserLoggedIn()) {
                toastr.error(constants.ERROR_UNAUTORIZED);
                document.location = "#/Home"
            } else {
                vehicleController.deleteVehicle(context);
            }
        });

        // Get Home view for empty hash URLs
        this.get("", function() {
            this.app.runRoute("get", "#/Home");
        });


    });

    $(function() {
        sammyApp.run("#/")
    })

    $(document).ready(function() {
        userController.init();
    });

    return {
        sammyApp,
    }

})();