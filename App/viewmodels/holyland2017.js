define(['viewmodels/shell'], function (shell) {

    //properties
    this.linkList = ko.observableArray();
    this.topContacts = ko.observableArray();
    this.callsign = ko.observable('');
    this.didNotWork = ko.observable(false);
    var that = this;

    this.GetWorkedStations = function () {
        if (callsign() == "") return;
        $.ajax({
            type: "POST",
            url: "./Server/GetLogForCall.php",
            data: { 'info': { 'call': callsign() } }
        }).done(function (data) {
            linkList(data);
            didNotWork(false);
        }).error(function (xhr, ajaxOptions, thrownError) {
            //alert(jQuery.parseJSON(xhr.responseText).error);
            linkList([]);
            didNotWork(true);
        });
    }

    this.GetTopContacts = function () {
        $.ajax({
            type: "POST",
            url: "./Server/GetAllLog.php"
        }).done(function (data) {
            topContacts(data);
        }).error(function (xhr, ajaxOptions, thrownError) {
            //alert(jQuery.parseJSON(xhr.responseText).error);
            topContacts([]);
        });
    }

    this.IsSectionExist = function(section)
    {
        var queryResult = Enumerable.From(linkList).Where(function (x) { return x.section == section }).ToArray();
        return queryResult.length;
    }
    
    var vm = {
        activate: function () {
            //shell.selectedSubMenu('ham');
            shell.selectedMainMenu('sections');
            GetTopContacts();
            setInterval(GetTopContacts, 10000);
        },
        compositionComplete: function () {
            jwerty.key('enter', function () {
                GetWorkedStations();
            }, that);
            
        },
        linkList: linkList,
        topContacts:topContacts,
        callsign: callsign,
        didNotWork:didNotWork,
        shell: shell
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return vm;
});