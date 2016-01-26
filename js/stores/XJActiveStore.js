/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJActiveStore
 */

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var XJEditorConstants = require('../constants/XJEditorConstants');
var XJTools = require('../helpers/XJTools');

var ACTIVE_EVENT = 'active';
var SELECT_EVENT = 'select';

var _comps = {};
var _refs = {};
var _selectedID = "";
var _selectedIDs = [];


function _setID(id) {
    _selectedID = _comps.hasOwnProperty(id) ? id : "";
}

function register(comp, ref) {
    if (!_comps.hasOwnProperty(comp.id)) {
        _comps[comp.id] = _.clone(comp);
        _refs[comp.id] = ref;
    }

    _setID(comp.id);
}

function unregister(id) {
    if (_comps.hasOwnProperty(id)) {
        delete _comps[id];
        delete _refs[id];
    }

    _setID("");
}

function select(id, isMultiple) {
    if (isMultiple) {
        var isContain = _.remove(_selectedIDs, function(e){
            return e === id;
        });
        if (isContain.length === 0) {
            _selectedIDs.push(id);
        }
    }
    else {
        _selectedIDs = [id];
    }

    _setID(id);
}

function multiUpdate(newComps) {
    _.merge(_comps, newComps);
}


var XJActiveStore = assign({}, EventEmitter.prototype, {

    getSelectedComps: function() {
        var comps = {};
        for (var i = 0; i < _selectedIDs.length; i++) {
            var id = _selectedIDs[i];
            comps[id] = _comps[id];
        };
        return comps;
    },

    getSelectedRefs: function() {
        var refs = {};
        for (var i = 0; i < _selectedIDs.length; i++) {
            var id = _selectedIDs[i];
            refs[id] = _refs[id];
        };
        return refs;
    },

    // for property area to display
    getSelected: function() {
        return _comps[_selectedID];
    },

    getSelectedIDs: function() {
        return _selectedIDs;
    },

    emitActive: function() {
        console.log("emitActive!");
        this.emit(ACTIVE_EVENT);
    },

    addActiveListener: function(callback) {
        this.on(ACTIVE_EVENT, callback);
    },

    removeActiveListener: function(callback) {
        this.removeListener(ACTIVE_EVENT, callback);
    },

    emitSelect: function() {
        console.log("emitSelect!");
        this.emit(SELECT_EVENT);
    },

    addSelectListener: function(callback) {
        this.on(SELECT_EVENT, callback);
    },

    removeSelectListener: function(callback) {
        this.removeListener(SELECT_EVENT, callback);
    },

});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var type;

    switch(action.actionType) {
        case XJEditorConstants.XJ_ACTIVE_ACTION_REGISTER:
            register(action.comp, action.ref)
            XJActiveStore.emitSelect();
        break;

        case XJEditorConstants.XJ_ACTIVE_ACTION_UNREGISTER:
            unregister(action.id)
            XJActiveStore.emitSelect();
        break;

        case XJEditorConstants.XJ_ACTIVE_ACTION_SELECT:
            select(action.id, action.isMultiple)
            XJActiveStore.emitSelect();
        break;

        case XJEditorConstants.XJ_ACTIVE_ACTION_MULTI_UPDATE:
            multiUpdate(action.comps);
            XJActiveStore.emitActive();
        break;

        default:
        // no op
    }
});

module.exports = XJActiveStore;
