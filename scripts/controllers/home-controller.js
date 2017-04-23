import { constants } from '../constants/constants.js';

// #region testing :-)
import { templateLoader as tl } from '../template-loader.js';
const data = {
    username: 'Kircho'
};
// #endregion

let homeController = function() {

    // context => Sammy
    function viewHome(context) {
        tl.get("home")
            .then(template => context.$element().html(template(data)));
    }

    function viewContacts(context) {
        tl.get("contact")
            .then(template => context.$element().html(template(constants.CONTACTS)));
    }

    return {
        viewHome: viewHome,
        viewContacts: viewContacts
    };
}();

export { homeController };