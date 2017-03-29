Ext.define('Expenses.controller.PaymentPage', {
    extend: 'Ext.app.ViewController',

    requires: [
        "Expenses.model.Payment"
    ],

    alias: 'controller.paymentpage',

    /**
     * @type Expenses.model.Payment
     */
    record: null,

    init: function() {
        this._reloadFormRecord();
    },

    onFormSubmit: function() {
        var form = this.view.down("form");

        if (form.isValid()) {
            form.updateRecord(this.record);
            this.view.down("grid").getStore().add(this.record);

            this._reloadFormRecord();
        }
    },

    _reloadFormRecord: function() {
        this.record = Ext.create("Expenses.model.Payment");

        this.view.down("form").loadRecord(this.record);
    },

    onItemSelected: function() {
        //console.log("Bulk add page. onItemSelected", arguments);
    },

    onSubmitPaymentsClick: function() {
        var data = [];
        var store = this.view.down("grid").getStore();

        store.each(function(item) {
            var json = item.getProxy().getWriter().getRecordData(item);
            json.date = item.get("date").getTime();
            data.push(json);
        });

        Ext.Ajax.request({
            url: 'http://localhost:3000/payments/addmany',
            method: "POST",

            jsonData: {
                data: data
            },

            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                console.dir(obj);

                store.removeAll();
            },

            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }
});