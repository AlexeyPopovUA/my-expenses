Ext.define('Expenses.view.bulk.PaymentForm', {
    extend: 'Ext.form.Panel',

    requires: [
        'Expenses.store.PaymentCategories'
    ],

    xtype: 'paymentform',

    trackResetOnLoad: true,

    layout: {
        type: "vbox"
    },

    defaults: {
        labelAlign: "left"
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
});