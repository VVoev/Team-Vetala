SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'index': '../scripts/index.js',
        'main': '../scripts/main.js'
    }
});

System.import('main');

//TODO FILE need to be refactored in order to use modules