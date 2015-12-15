/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJEditActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var XJEditorConstants = require('../constants/XJEditorConstants');

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
     * @param  {object} target position
     */
    move: function(id, position) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_MOVE,
            id: id,
            position: position
        });
    },

    /**
     * @param  {string} id
     */
    destroy: function(id) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_DESTROY,
            id: id
        });
    },

};

module.exports = XJEditActions;
