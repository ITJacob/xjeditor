/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJCompStore
 */

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var XJEditorConstants = require('../constants/XJEditorConstants');

var CHANGE_EVENT = 'change';

var _comps = {};

/**
 * Create a XJComponent.
 * @param  {constant} XJEditorConstants type
 */
function create(type) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var length = Object.keys(_comps).length;
    var newstyle = {
        height: "35px",
        width: "300px",
        left: "0px",
        top: length*25 + "px", //TODO update init position calculation
        rotateZ: "0",
    };
    _comps[id] = {
        id: id,
        type: type,
        style: newstyle
    };
}

/**
 * Update a XJComponent.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
    _.merge(_comps[id], updates);
}

/**
 * Delete a XJComponent.
 * @param  {string} id
 */
function destroy(id) {
    delete _comps[id];
}

var XJCompStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        return _comps;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var type;

    switch(action.actionType) {
        case XJEditorConstants.XJ_COMP_ACTION_CREATE:
            type = action.type;
            if (type !== '') {
                create(type);
                XJCompStore.emitChange();
            }
        break;

        case XJEditorConstants.XJ_COMP_ACTION_UPDATE:
            update(action.id, action.style);
            XJCompStore.emitChange();
        break;

        case XJEditorConstants.XJ_COMP_ACTION_DESTROY:
            destroy(action.id);
            XJCompStore.emitChange();
        break;

        default:
        // no op
    }
});

module.exports = XJCompStore;
