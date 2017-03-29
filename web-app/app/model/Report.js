Ext.define('Expenses.model.Report', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'category', type: 'string'},
        {name: 'year', type: "int"},
        {name: 'month', type: "int"},
        {name: 'sum', type: 'number'},
        {name: 'count', type: 'int'},
    ],

    proxy: {
        type: 'memory'
    }
});