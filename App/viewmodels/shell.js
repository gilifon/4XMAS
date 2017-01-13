define(['plugins/router', 'durandal/app'], function (router, app) {

    
    var selectedSubMenu = ko.observable('');
    var selectedMainMenu = ko.observable('main');
    var version = app.version;
    
    return {
        selectedSubMenu: selectedSubMenu,
        selectedMainMenu: selectedMainMenu,
        version: version,
        router: router,
        activate: function () {
            router.map([
                { route: '', title: 'Live Log', moduleId: 'viewmodels/holyland2017', nav: true },                
            ]).buildNavigationModel();

            return router.activate();
        },
        compositionComplete: function () {
            $("#loadingImage").hide();
        }
    };
});