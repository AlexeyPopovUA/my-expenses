Ext.define('Expenses.view.history.PaymentForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'paymentfilters',

    requires: [
        'Expenses.store.PaymentCategories'
    ],

    title: 'Payments filters',

    layout: {
        type: "vbox",
        align: "stretch"
    },

    defaults: {
        labelAlign: "left"
    },

    collapsible: true,
    collapsed: true,

    minWidth: 200,
    width: 400,

    items: [
        {
            xtype: "textfield",
            fieldLabel: "Name"
        },
        {
            xtype: "combobox",
            fieldLabel: "Category",
            store: Ext.create("Expenses.store.PaymentCategories")
        },
        {
            xtype: "container",
            margin: "0 0 10 0",
            layout: {
                type: "hbox"
            },
            items: [
                {
                    xtype: "datefield",
                    fieldLabel: "Date from",
                    labelAlign: "top",
                    flex: 1
                },
                {
                    xtype: "datefield",
                    fieldLabel: "Date to",
                    labelAlign: "top",
                    flex: 1,
                    margin: "0 0 0 10"
                }
            ]
        },
        {
            xtype: "button",
            text: "Apply",
            itemId: "applyFiltersButton",
            maxWidth: 100,
            listeners: {
                click: "onApplyFiltersClick"
            }
        }
    ]
});