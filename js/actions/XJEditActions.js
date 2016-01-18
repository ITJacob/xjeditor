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
     * @param  {object} target style
     */
    update: function(id, style) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_UPDATE,
            id: id,
            style: style
        });
    },

    select: function(id) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_SELECT,
            id: id
        });
    },

    blur: function() {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_BLUR,
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
