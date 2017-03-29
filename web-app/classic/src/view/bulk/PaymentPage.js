Ext.define('Expenses.view.bulk.PaymentPage', {
    extend: 'Ext.container.Container',

    requires: [
        "Expenses.view.bulk.PaymentForm",
        "Expenses.view.bulk.BulkAddList",
        "Expenses.controller.PaymentPage"
    ],

    xtype: 'paymentpage',

    controller: "paymentpage",

    title: 'Add payments',
    iconCls: 'fa-user',

    layout: {
        type: "vbox",
        align: "stretch"
    },

    padding: 20,

    items: [
        {
            xtype: 'paymentform',
            margin: "10 0 0 0"
        },
        {
            xtype: 'bulkaddlist',
            margin: "10 0 0 0",
            flex: 1
        },
        {
            xtype: "button",
            text: "Submit payments",
            margin: "20 0 0 0",

            listeners: {
                click: "onSubmitPaymentsClick"
            }
        }
    ]
});