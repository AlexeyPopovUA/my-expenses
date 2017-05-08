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
        var form = this.view.down("form#manualPayment");

        if (form.isValid()) {
            form.updateRecord(this.record);
            this.view.down("grid").getStore().add(this.record);

            this._reloadFormRecord();
        }
    },

    onFileFormSubmit: function() {
        var self = this;
        var form = this.view.down("form#fileUpload").getForm();

        if (form.isValid()) {
            // Create a new FormData object.
            var formData = new FormData();
            var files = this.view.down("form#fileUpload filefield").fileInputEl.dom.files;
            // Loop through each of the selected files.
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // Add the file to the request.
                formData.append('myfile', file, file.name);
            }

            // Set up the request.
            var xhr = new XMLHttpRequest();
            xhr.responseType = "json";

            // Open the connection.
            xhr.open('POST', 'http://localhost:3000/payments/importxls', true);

            // Set up a handler for when the request finishes.
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // File(s) uploaded.
                    //console.log(xhr.response);

                    self.view.down("grid").getStore().loadData(xhr.response, true);
                }
            };

            // Send the Data.
            xhr.send(formData);

            //todo Make standard file uplad work with CORS
            /*form.submit({
                method: "POST",
                success: function(form, action) {
                    Ext.Msg.alert('Success', action.result.msg);
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Failed', action.result.msg);
                }
            });*/
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
    },

    onItemRemove: function(grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({
            title: 'Remove',
            message: 'Do you really want to remove ' + rec.get("name") + ' from the temporary table?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    rec.erase();
                }
            }
        });
    }
});