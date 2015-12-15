/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJCompUIHelper
 */

var XJEditActions = require('../actions/XJEditActions');

var XJCompUIHelper = function(xjComp) {

    // id from props.comp, used in XJEditActions
    this.id = xjComp.props.comp.id;
};

// Dom node style
XJCompUIHelper.prototype.init = function(style) {
    this.node = style;
};

XJCompUIHelper.prototype.animateMove = function(e) {
    e.preventDefault();
    var value = "translate3d(" +
                e.deltaX + "px, " +
                e.deltaY + "px, 0) rotateZ(0deg)";
    this.node.transform = value;
};

XJCompUIHelper.prototype.animateMoveEnd = function(e) {
    e.preventDefault();
    var newPosition = {
        top: parseInt(this.node.top) + e.deltaY,
        left: parseInt(this.node.left) + e.deltaX,
    };
    this.node.transform = "translate3d(0, 0, 0) rotateZ(0deg)";

    XJEditActions.move(this.id, {position: newPosition});
};

module.exports = XJCompUIHelper;


