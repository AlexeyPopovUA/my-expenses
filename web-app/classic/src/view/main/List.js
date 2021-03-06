Ext.define('Expenses.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'Expenses.store.Payments',
        'Ext.toolbar.Paging',
        'Ext.grid.filters.Filters'
    ],

    layout: {
        type: "fit"
    },

    title: 'Payments',

    store: Ext.create("Expenses.store.Payments", {
        remoteSort: true,
        remoteFilter: true,

        sorters: [{
            property: 'date',
            direction: 'DESC'
        }]
    }),

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
            },
            filter: {
                type: 'list'
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
            }/*,
            filter: {
                type: 'date'
            }*/
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
            },
            summaryType: 'sum'
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
            ptype: "gridfilters"
        },
        {
            ptype: "rowediting",
            clicksToEdit: 2
        }
    ],

    features: [{
        ftype: 'summary',
        dock: 'top'
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    },

    listeners: {
        select: 'onItemSelected',
        edit: 'onItemEdit'
    }
});