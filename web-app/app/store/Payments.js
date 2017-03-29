Ext.define('Expenses.store.Payments', {
    extend: 'Ext.data.Store',

    alias: 'store.payments',

    autoLoad: true,

    model: "Expenses.model.Payment",

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },
        url: 'http://localhost:3000/payments/get',
        /*extraParams: {
            filterBy: "category",
            value: "Food"
        }*/
    }
});