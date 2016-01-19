/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJCompUIHandler
 */

var _ = require('lodash');

var XJCompStore = require('../stores/XJCompStore');
var XJEditActions = require('../actions/XJEditActions');
var XJGuideActions = require('../actions/XJGuideActions');
var XJEditorConstants = require('../constants/XJEditorConstants');
var XJTools = require('../helpers/XJTools');


var XJCompUIHandler = {

    move: function(ids, e) {
        e.preventDefault();

        return this._buildComps(ids, {
            construct: function(comp) {
                var t = XJTools.parseTransform(comp.style.transform);
                return {
                    transform: XJTools.getTransform(e.deltaX, e.deltaY, 0, t.r),
                }
            }
        });
    },

    moveEnd: function(ids, e) {
        e.preventDefault();

        return this._buildComps(ids, {
            construct: function(comp) {
                var t = XJTools.parseTransform(comp.style.transform);
                return {
                    top: parseInt(comp.style.top) + e.deltaY + "px",
                    left: parseInt(comp.style.left) + e.deltaX + "px",
                    transform: XJTools.getTransform(0, 0, 0, t.r),
                }
            }
        });
    },

    _buildComps: function(ids, builder) {
        var comps = XJCompStore.getAll();
        var newComps = {};
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];

            newComps[id] = {
                style: builder.construct(comps[id]),
            };
        }

        return newComps;
    },

};

module.exports = XJCompUIHandler;
