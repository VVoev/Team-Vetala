import { homeController } from "./controllers/homeController.js";
import { loginController} from "./controllers/loginController.js";

(function() {
    let sammyApp = Sammy('#content', function() {

        this.get('#/Home', homeController.viewHome);
        this.get('#/Login', loginController.viewLogin);


    });


    $(function() {
        sammyApp.run('#/')
    })
})();