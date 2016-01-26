/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJEditActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var XJEditorConstants = require('../constants/XJEditorConstants');
var XJActiveStore = require('../stores/XJActiveStore');

var XJEditActions = {

    /**
     * @param  {constant} XJEditorConstants type
     */
    create: function(type) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_CREATE,
            type: type
        });
    },

    /**
     * @param  {String} target id
     * @param  {object} target comp
     */
    update: function(id, comp) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_UPDATE,
            id: id,
            comp: comp
        });
    },

    refresh: function() {
        var newComps = XJActiveStore.getSelectedComps();
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_MULTI_UPDATE,
            comps: newComps
        });
    },

    /**
     * @param  {array} ids
     */
    destroy: function(ids) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_DESTROY,
            ids: ids
        });
    },

};

module.exports = XJEditActions;
