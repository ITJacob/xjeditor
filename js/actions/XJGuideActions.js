/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJGuideActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var XJEditorConstants = require('../constants/XJEditorConstants');

var XJGuideActions = {

	// parse the grid
    init: function(grid) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_GUIDE_ACTION_INIT,
            grid: grid
        });
    },

    // not use it
	start: function(comp) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_GUIDE_ACTION_START,
            comp: comp
        });
    },

    // parse the moving comp
    sync: function(comp, event) {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_GUIDE_ACTION_SYNC,
            comp: comp,
            event: event
        });
    },

    // stop guide
    stop: function() {
        AppDispatcher.dispatch({
            actionType: XJEditorConstants.XJ_GUIDE_ACTION_STOP,
        });
    },

};

module.exports = XJGuideActions;
