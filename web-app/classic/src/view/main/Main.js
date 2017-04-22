/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Expenses.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'Expenses.view.main.MainController',
        'Expenses.view.main.MainModel',
        'Expenses.view.main.List',

        "Expenses.view.bulk.PaymentPage",

        "Expenses.view.history.PaymentForm",

        "Expenses.view.report.ReportPage"
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: "0 20 20 10",
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [
        {
            title: 'Payments history',
            iconCls: 'fa-home',
            // The following grid shares a store with the classic version's grid as well!

            layout: {
                type: "vbox",
                align: "stretch"
            },

            items: [
                {
                    xtype: 'paymentfilters',
                    margin: "10 0 0 0"
                },
                {
                    xtype: 'mainlist',
                    itemId: 'paymentHistory',
                    margin: "10 0 0 0",
                    flex: 1
                }
            ]
        },
        {
            xtype: "paymentpage"
        },
        {
            xtype: "reportpage"
        }/*,
        {
            title: 'Settings',
            iconCls: 'fa-cog',
            bind: {
                html: '{loremIpsum}'
            }
        }*/
    ]
});
