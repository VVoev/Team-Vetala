import {homeController} from '../scripts/controllers/homeController.js'

(function () {
    let sammyApp = Sammy('#content', function () {

        this.get('#/',homeController.all);

        
    });


    $(function () {
        sammyApp.run('#/')
    })
})();