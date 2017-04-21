import { homeController } from "./controllers/homeController.js";
import { loginController} from "./controllers/loginController.js";
 import { registerController} from "./controllers/registerController.js";

(function() {
    let sammyApp = Sammy('#content', function() {

        this.get('#/Home', homeController.viewHome);
        this.get('#/Login', loginController.viewLogin);
        this.get('#/Register', registerController.viewRegister);


    });


    $(function() {
        sammyApp.run('#/')
    })
})();