Ext.define('Expenses.model.PaymentCategory', {
    extend: 'Ext.data.Model',

    idProperty: "_id",

    fields: [
        "_id",
        {name: 'name', type: 'string'}
    ],

    proxy: {
        type: 'memory'
    }
});