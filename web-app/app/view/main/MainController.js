/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 */
Ext.define('Expenses.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function(sender, record) {
        //console.log(arguments);
    },

    onApplyFiltersClick: function() {
        this.view.down("#paymentHistory").getStore().reload();
    },

    onItemRemove: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({
            title: 'Remove',
            message: 'Do you really want to remove ' + rec.get("name") + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    rec.erase();
                }
            }
        });
    },

    onItemEdit: function(editor, event) {
        event.record.save();
    }
});