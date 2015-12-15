/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJCompStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var XJEditorConstants = require('../constants/XJEditorConstants');
var assign = require('object-assign');

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
    var newposition = {
        left: 0,
        top: length*25 //TODO update init position calculation
    };
    _comps[id] = {
        id: id,
        type: type,
        position: newposition
    };
}

/**
 * Update a XJComponent.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
    _comps[id] = assign({}, _comps[id], updates);
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

        case XJEditorConstants.XJ_COMP_ACTION_MOVE:
            update(action.id, action.position);
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
