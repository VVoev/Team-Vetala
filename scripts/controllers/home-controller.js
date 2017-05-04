import { constants } from "../common/constants.js";
import { templateLoader as tl } from "../common/template-loader.js";


let homeController = function() {

    // context => Sammy
    function viewHome(context) {
        tl.get("home")
            .then(template => context.$element().html(template));
    }

    function viewContacts(context) {
        tl.get("contact")
            .then(template => context.$element().html(template(constants.CONTACTS)));
    }

    return {
        viewHome,
        viewContacts
    };
}();

export { homeController };