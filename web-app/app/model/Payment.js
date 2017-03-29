Ext.define('Expenses.model.Payment', {
    extend: 'Ext.data.Model',

    idProperty: "_id",

    fields: [
        {name: "_id", type: "auto"},
        {name: 'name', type: 'string'},
        {name: 'category', type: 'string'},
        {name: 'date', type: "date", serialize: function(value) {
            return value.getTime();
        }},
        {name: 'value', type: 'number'}
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json'
        },
        url: 'http://localhost:3000/payments'
    }
});