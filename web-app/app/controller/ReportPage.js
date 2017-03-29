Ext.define('Expenses.controller.ReportPage', {
    extend: 'Ext.app.ViewController',

    requires: [],

    alias: 'controller.reportpage',

    init: function() {
        console.log('Expenses.controller.ReportPage.init');
    },

    onItemSelected: function() {
        console.log('Expenses.controller.ReportPage.onItemSelected');
    },

    onReportShow: function() {
        console.log('Expenses.controller.ReportPage.onReportShow');

        this.view.down("grid").getStore().load();
    }
});
