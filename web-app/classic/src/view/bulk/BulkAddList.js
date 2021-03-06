Ext.define('Expenses.view.bulk.BulkAddList', {
    extend: 'Ext.grid.Panel',
    xtype: 'bulkaddlist',

    requires: [
        'Expenses.store.Payments',
        'Ext.grid.column.Date'
    ],

    title: 'Bulk Add',

    store: Ext.create("Expenses.store.Payments", {
        autoLoad: false
    }),

    layout: {
        type: "fit"
    },

    columns: [
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 10,
            editor: {
                allowBlank: false
            }
        },
        {
            text: 'Category',
            dataIndex: 'category',
            flex: 1.5,
            editor: {
                allowBlank: false
            }
        },
        {
            xtype: "datecolumn",
            text: 'Date',
            dataIndex: 'date',
            flex: 1.5,
            editor: {
                xtype: 'datefield',
                allowBlank: false
            }
        },
        {
            xtype: "numbercolumn",
            text: 'Value',
            dataIndex: 'value',
            flex: 1,
            editor: {
                xtype: 'numberfield',
                step: 0.1,
                allowBlank: false
            }
        },
        {
            xtype: 'actioncolumn',
            width: 50,
            sortable: false,
            hideable: false,
            items: [{
                icon: 'build/development/Expenses/classic/resources/images/shared/icon-error.png',
                tooltip: 'Delete',

                handler: 'onItemRemove'
            }]
        }
    ],

    selType: "rowmodel",

    plugins: [
        {
            ptype: "rowediting",
            clicksToEdit: 2
        }
    ],

    listeners: {
        select: 'onItemSelected'
    }
});