/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJActiveActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var XJEditorConstants = require('../constants/XJEditorConstants');
var XJCompUIHandler = require('../helpers/XJCompUIHandler');

var XJActiveActions = {

    register: function(comp, ref) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_ACTIVE_ACTION_REGISTER,
            comp: comp,
            ref: ref,
        });
    },

    unregister: function(id) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_ACTIVE_ACTION_UNREGISTER,
            id: id,
        });
    },

    select: function(id, isMultiple) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_ACTIVE_ACTION_SELECT,
            id: id,
            isMultiple: isMultiple,
        });
    },

    update: function(comp) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_ACTIVE_ACTION_UPDATE,
            comp: comp,
        });
    },

    move: function(e) {
        var newComps = XJCompUIHandler.move(e);
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_ACTIVE_ACTION_MULTI_UPDATE,
            comps: newComps,
        });
    },

    moveEnd: function(e) {
        var newComps = XJCompUIHandler.moveEnd(e);
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_ACTIVE_ACTION_MULTI_UPDATE,
            comps: newComps,
        });
    },

    rotate: function(e, node) {
        var newComps = XJCompUIHandler.rotate(e, node);
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_ACTIVE_ACTION_MULTI_UPDATE,
            comps: newComps,
        });
    },

    resize: function(detection) {
        var newComps = XJCompUIHandler.resize(detection);
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_ACTIVE_ACTION_MULTI_UPDATE,
            comps: newComps,
        });
    },

};

module.exports = XJActiveActions;
