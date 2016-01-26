/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJCompUIHandler
 */

var _ = require('lodash');

var XJActiveStore = require('../stores/XJActiveStore');

var XJTools = require('../helpers/XJTools');


var XJCompUIHandler = {

    move: function(e) {
        e.preventDefault();

        return this._buildComps({
            construct: function(comp) {
                var t = XJTools.parseTransform(comp.style.transform);
                return {
                    transform: XJTools.getTransform(e.deltaX, e.deltaY, 0, t.r),
                }
            }
        });
    },

    moveEnd: function(e) {
        e.preventDefault();

        return this._buildComps({
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

    rotate: function(e, node) {
        e.preventDefault();
        var target = this._getPosition(node);
        var yAxis = e.center.x - target.x;
        var xAxis = target.y - e.center.y;
        var angle = Math.atan2(yAxis, xAxis) * 360 / (2 * Math.PI);

        return this._buildComps({
            construct: function(comp) {
                return {
                    transform:
                        XJTools.getTransform(0, 0, 0, angle.toFixed(2)),
                }
            }
        });
    },

    resize: function(detection) {

        return this._buildComps({
            construct: function(comp) {
                return {
                    top: parseInt(comp.style.top) + detection.top + "px",
                    left: parseInt(comp.style.left) + detection.left + "px",
                    height: parseInt(comp.style.height) + detection.height + "px",
                    width: parseInt(comp.style.width) + detection.width + "px",
                }
            }
        });
    },

    _buildComps: function(builder) {
        var comps = XJActiveStore.getSelectedComps();
        var refs = XJActiveStore.getSelectedRefs();
        var newComps = {};
        for (var id in comps) {
            var newStyle = builder.construct(comps[id]);

            newComps[id] = {
                style: newStyle,
            };
            _.assign(refs[id], newStyle);
        }

        return newComps;
    },

    // ref: http://www.kirupa.com/html5/get_element_position_using_javascript.htm
    _getPosition: function(elem) {
        var xPosition = parseInt(elem.style.width)/2;
        var yPosition = parseInt(elem.style.height)/2;

        while(elem) {
            xPosition +=
                (elem.offsetLeft - elem.scrollLeft + elem.clientLeft);
            yPosition +=
                (elem.offsetTop - elem.scrollTop + elem.clientTop);
            elem = elem.offsetParent;
        }

        return { x: xPosition, y: yPosition };
    },
};

module.exports = XJCompUIHandler;
