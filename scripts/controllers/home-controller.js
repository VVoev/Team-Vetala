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
            .then(template => context.$element().html(template(data)))
    }

    return {
        viewHome: viewHome
    };
}();

export { homeController };