/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJEditActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var XJEditorConstants = require('../constants/XJEditorConstants');
var XJCompUIHandler = require('../helpers/XJCompUIHandler');

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

    move: function(ids, e) {
        var newComps = XJCompUIHandler.move(ids, e);
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_MULTI_UPDATE,
            comps: newComps
        });
    },

    moveEnd: function(ids, e) {
        var newComps = XJCompUIHandler.moveEnd(ids, e);
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_MULTI_UPDATE,
            comps: newComps
        });
    },

    rotate: function(ids, e) {
        var newComps = XJCompUIHandler.rotate(ids, e);
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_MULTI_UPDATE,
            comps: newComps
        });
    },

    resize: function(ids, e) {
        var newComps = XJCompUIHandler.resize(ids, e);
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_COMP_ACTION_MULTI_UPDATE,
            comps: newComps
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
