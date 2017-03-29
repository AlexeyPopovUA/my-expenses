Ext.define('Expenses.store.PaymentCategories', {
    extend: 'Ext.data.Store',

    alias: 'store.paymentcategories',

    model: "Expenses.model.PaymentCategory",

    /*proxy: {
        type: 'ajax',
        reader: {
            type: 'json'
        },
        url: 'http://localhost:3000/payments/categories/get'
    }*/

    proxy: {
        type: "memory"
    },

    data: [
        {name: "Food"},
        {name: "Girlfriend"},
        {name: "Travelling"},
        {name: "Rent"},
        {name: "Household"},
        {name: "Mobile + internet"},
        {name: "Special"},
        {name: "Toilet"},
        {name: "Appearance"},
        {name: "Entertainment"},
        {name: "Insurance"},
        {name: "Clothes"}
    ]
});