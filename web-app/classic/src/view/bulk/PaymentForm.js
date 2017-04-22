Ext.define('Expenses.view.bulk.PaymentForm', {
    extend: 'Ext.container.Container',

    requires: [
        'Expenses.store.PaymentCategories'
    ],

    xtype: 'paymentform',

    trackResetOnLoad: true,

    layout: {
        type: "hbox"
    },

    defaults: {
        labelAlign: "left"
    },

    items: [
        {
            xtype: "form",
            itemId: "manualPayment",
            layout: {
                type: "vbox"
            },
            items: [
                {
                    xtype: "textfield",
                    fieldLabel: "Name",
                    name: "name",
                    allowBlank: false
                },
                {
                    xtype: "combobox",
                    fieldLabel: "Category",
                    store: Ext.create('Expenses.store.PaymentCategories'),
                    valueField: "name",
                    displayField: "name",
                    name: "category",
                    allowBlank: false
                },
                {
                    xtype: "datefield",
                    fieldLabel: "Date",
                    name: "date",
                    allowBlank: false
                },
                {
                    xtype: "numberfield",
                    fieldLabel: "Value",
                    minValue: 0,
                    name: "value"
                },
                {
                    xtype: "button",
                    text: "Add",
                    itemId: "submit",

                    listeners: {
                        click: "onFormSubmit"
                    }
                }
            ]
        },
        {
            xtype: "form",
            itemId: "fileUpload",
            margin: "0 0 0 20",
            items: [
                {
                    xtype: "filefield",
                    fieldLabel: "Name",
                    name: "myfile",
                    allowBlank: false
                },
                {
                    xtype: "button",
                    text: "Submit file",
                    itemId: "submitFile",

                    listeners: {
                        click: "onFileFormSubmit"
                    }
                }
            ]
        }
    ]
});