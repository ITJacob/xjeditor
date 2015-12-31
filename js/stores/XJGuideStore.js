/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJGuideStore
 */

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var XJEditorConstants = require('../constants/XJEditorConstants');

var GUIDE_EVENT = 'guide';

var _guide = {};
var _grid = {};

function init(grid) {

    _grid = grid;
}

// function start(comp) {

// }

function sync(c, e) {
    _guide = {};
    var comp = _getCompnent(c, e);

    var vGap = _grid.vGap,
        hGap = _grid.hGap,
        remainder = _grid.remainder;

    comp.top -= remainder;
    comp.bottom -= remainder;

    _drawGuide(comp.top, hGap, _guide, "h");
    _drawGuide(comp.bottom, hGap, _guide, "h");
    _drawGuide(comp.hCenter, hGap, _guide, "h");

    _drawGuide(comp.left, vGap, _guide, "v");
    _drawGuide(comp.right, vGap, _guide, "v");
    _drawGuide(comp.vCenter, vGap, _guide, "v");

}

function stop() {
    _guide = {};
}

function _getCompnent(comp, e) {
    var result = {};

    result.top = parseInt(comp.top) + e.deltaY;
    result.bottom = result.top + parseInt(comp.height);
    result.left = parseInt(comp.left) + e.deltaX;
    result.right = result.left + parseInt(comp.width);

    result.hCenter = (result.top + result.bottom) / 2;
    result.vCenter = (result.left + result.right) / 2;
    return result;
}

function _drawGuide(edge, gap, guide, k) {
    var index = Math.round(edge / gap);
    var level = Math.abs(edge - gap * index);
    var key = k + index;

    for (var i = 4; level <= i; i--) {
        guide[key] = 1 - 0.2 * i;
    }
}

var XJGuideStore = assign({}, EventEmitter.prototype, {

    getGuide: function() {
        return _guide;
    },

    emitGuide: function() {
        this.emit(GUIDE_EVENT);
    },

    addGuideListener: function(callback) {
        this.on(GUIDE_EVENT, callback);
    },

    removeGuideListener: function(callback) {
        this.removeListener(GUIDE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    var type;

    switch(action.actionType) {
        case XJEditorConstants.XJ_GUIDE_ACTION_INIT:
            init(action.grid);
            // XJGuideStore.emitGuide();
        break;

        case XJEditorConstants.XJ_GUIDE_ACTION_START:
            // start(action.comp);
            // XJGuideStore.emitGuide();
        break;

        case XJEditorConstants.XJ_GUIDE_ACTION_SYNC:
            sync(action.comp, action.event);
            XJGuideStore.emitGuide();
        break;

        case XJEditorConstants.XJ_GUIDE_ACTION_STOP:
            stop();
            XJGuideStore.emitGuide();
        break;

        default:
        // no op
    }
});

module.exports = XJGuideStore;
