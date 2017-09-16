Ext.define('Expenses.view.report.ReportPage', {
    extend: 'Ext.container.Container',

    requires: [
        "Expenses.controller.ReportPage",
        "Expenses.store.Report",
        "Ext.grid.filters.Filters"
    ],

    xtype: 'reportpage',

    controller: "reportpage",

    title: 'Reports',
    iconCls: 'fa-users',

    layout: {
        type: "vbox",
        align: "stretch"
    },

    padding: 20,

    items: [
        {
            xtype: "gridpanel",
            title: 'Report',

            store: Ext.create("Expenses.store.Report"),

            flex: 1,

            layout: {
                type: "fit"
            },

            columns: [
                {
                    text: 'Category',
                    dataIndex: 'category',
                    flex: 1,
                    filter: {
                        type: 'list'
                    }
                },
                {
                    text: 'Year',
                    dataIndex: 'year',
                    flex: 1,
                    filter: {
                        type: 'list'
                    }
                },
                {
                    text: 'Month',
                    dataIndex: 'month',
                    flex: 1,
                    filter: {
                        type: 'list'
                    }
                },
                {
                    text: 'Sum',
                    dataIndex: 'sum',
                    flex: 1,
                    summaryType: 'sum'
                },
                {
                    text: 'Count',
                    dataIndex: 'count',
                    flex: 1
                }
            ],

            selType: "rowmodel",

            listeners: {
                select: 'onItemSelected',
                afterrender: "onReportShow"
            },

            plugins: [
                'gridfilters'
            ],

            features: [{
                ftype: 'summary',
                dock: 'top'
            }]
        }
    ]
});
