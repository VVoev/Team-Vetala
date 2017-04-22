import {homeController} from "./controllers/homeController.js";


(function () {
    let sammyApp = Sammy('#content', function () {

        //Default view
        this.get('#/', homeController.viewHome);
        this.get('#/Home', homeController.viewHome);


    });


    $(function () {
        sammyApp.run('#/')
    })
})();