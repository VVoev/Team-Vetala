// #region testing :-)
import { templateLoader as tl } from '../template-loader.js';
const data = {
    username: 'Kircho'
};
// #endregion

let homeController = function() {

    // context => Sammy
    function viewHome(context) {
        $.get('templates/homeView.handlebars', function() {
            tl.get("homeView")
                .then(template => context.$element().html(template(data)))
        })
    }

    return {
        viewHome: viewHome
    };
}();

export { homeController };