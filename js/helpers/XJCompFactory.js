/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJCompFactory
 */

var React = require('react');

var XJCompText = require('../components/XJCompText.react');
var XJCompImage = require('../components/XJCompImage.react');
var XJCompBar = require('../components/XJCompBar.react');

var XJEditorConstants = require('../constants/XJEditorConstants');


var XJCompFactory = function() {};

XJCompFactory.prototype.create = function(type) {
    var component;
    if (type == XJEditorConstants.XJ_COMP_TYPE_TEXT) {
        component = ( <XJCompText /> );
    }
    else if (type == XJEditorConstants.XJ_COMP_TYPE_IMAGE) {
        component = ( <XJCompImage /> );
    }

    return component;
};

XJCompFactory.prototype.createBars = function(comp) {
    var bars = [];
    for (var i = 0; i < _BarTypes.length; i++) {
        var barDirection = _BarTypes[i].split('_').pop().toLowerCase();
        var isCorner = (barDirection.length === 2);

        var barProp = {
            type: XJEditorConstants[_BarTypes[i]],
            barClass: "bar-" + barDirection,
            isCorner: isCorner,
            comp: comp,
        }
        bars.push(<XJCompBar
            key={_BarTypes[i]}
            bar={barProp} />)
    };

    return bars;
};

var _BarTypes = [
    "XJ_COMPBAR_TYPE_N",
    "XJ_COMPBAR_TYPE_S",
    "XJ_COMPBAR_TYPE_E",
    "XJ_COMPBAR_TYPE_W",
    "XJ_COMPBAR_TYPE_NE",
    "XJ_COMPBAR_TYPE_NW",
    "XJ_COMPBAR_TYPE_SE",
    "XJ_COMPBAR_TYPE_SW"
];

module.exports = XJCompFactory;
