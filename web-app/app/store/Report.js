Ext.define('Expenses.store.Report', {
    extend: 'Ext.data.Store',

    alias: 'store.report',

    model: "Expenses.model.Report",

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },
        url: 'http://localhost:3000/payments/report/groups'
    }
});
