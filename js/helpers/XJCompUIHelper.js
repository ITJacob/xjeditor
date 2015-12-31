/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJCompUIHelper
 */

var _ = require('lodash');
var XJEditActions = require('../actions/XJEditActions');
var XJGuideActions = require('../actions/XJGuideActions');
var XJEditorConstants = require('../constants/XJEditorConstants');


var XJCompUIHelper = function(xjComp) {

    // id from props.comp, used in XJEditActions
    this.id = xjComp.props.comp.id;
    this.initNode = xjComp.props.comp.style;
};

// Dom node style
XJCompUIHelper.prototype.setTarget = function(node) {
    this.node = node;
    this.nodeStyle = node.style;
};

XJCompUIHelper.prototype.animateMove = function(e) {
    e.preventDefault();
    var value = "translate3d(" +
                e.deltaX + "px, " +
                e.deltaY + "px, 0) rotateZ(" +
                this.initNode.rotateZ + "deg)";
    this.nodeStyle.transform = value;
    XJGuideActions.sync(this.nodeStyle, e);
};

XJCompUIHelper.prototype.animateMoveEnd = function(e) {
    e.preventDefault();
    var newPosition = {
        top: parseInt(this.nodeStyle.top) + e.deltaY + "px",
        left: parseInt(this.nodeStyle.left) + e.deltaX + "px",
    };
    this.nodeStyle.transform = "translate3d(0, 0, 0) rotateZ(" +
                                this.initNode.rotateZ + "deg)";

    XJEditActions.update(this.id, {style: newPosition});
    XJGuideActions.stop();
};

XJCompUIHelper.prototype.animateResize = function(e, type) {
    e.preventDefault();
    var newStyle = {};
    switch(type) {
        case XJEditorConstants.XJ_COMPBAR_TYPE_N:
            var newStyle = {
                top: parseInt(this.initNode.top) + e.deltaY + "px",
                height: parseInt(this.initNode.height) - e.deltaY + "px",
            };
        break;
        case XJEditorConstants.XJ_COMPBAR_TYPE_S:
            var newStyle = {
                height: parseInt(this.initNode.height) + e.deltaY + "px",
            };
        break;
        case XJEditorConstants.XJ_COMPBAR_TYPE_E:
            var newStyle = {
                width: parseInt(this.initNode.width) + e.deltaX + "px",
            };
        break;
        case XJEditorConstants.XJ_COMPBAR_TYPE_W:
            var newStyle = {
                left: parseInt(this.initNode.left) + e.deltaX + "px",
                width: parseInt(this.initNode.width) - e.deltaX + "px",
            };
        break;
        case XJEditorConstants.XJ_COMPBAR_TYPE_NE:
            var newStyle = {
                top: parseInt(this.initNode.top) + e.deltaY + "px",
                height: parseInt(this.initNode.height) - e.deltaY + "px",
                width: parseInt(this.initNode.width) + e.deltaX + "px",
            };
        break;
        case XJEditorConstants.XJ_COMPBAR_TYPE_NW:
            var newStyle = {
                top: parseInt(this.initNode.top) + e.deltaY + "px",
                height: parseInt(this.initNode.height) - e.deltaY + "px",
                left: parseInt(this.initNode.left) + e.deltaX + "px",
                width: parseInt(this.initNode.width) - e.deltaX + "px",
            };
        break;
        case XJEditorConstants.XJ_COMPBAR_TYPE_SE:
            var newStyle = {
                height: parseInt(this.initNode.height) + e.deltaY + "px",
                width: parseInt(this.initNode.width) + e.deltaX + "px",
            };
        break;
        case XJEditorConstants.XJ_COMPBAR_TYPE_SW:
            var newStyle = {
                height: parseInt(this.initNode.height) + e.deltaY + "px",
                left: parseInt(this.initNode.left) + e.deltaX + "px",
                width: parseInt(this.initNode.width) - e.deltaX + "px",
            };
        break;

    };
    _.assign(this.nodeStyle, newStyle);
};

XJCompUIHelper.prototype.animateResizeEnd = function(e) {
    e.preventDefault();
    var newStyle = {
        height: this.nodeStyle.height,
        width: this.nodeStyle.width,
        left: this.nodeStyle.left,
        top: this.nodeStyle.top,
    };

    XJEditActions.update(this.id, {style: newStyle});
};

XJCompUIHelper.prototype.animateRotate = function(e) {
    e.preventDefault();
    var target = _getPosition(this.node);
    // console.log("e center: (" + e.center.x + ", " + e.center.y +
    //             "); target center: (" + target.x + ", " + target.y + ")");
    var yAxis = e.center.x - target.x;
    var xAxis = target.y - e.center.y;
    var angle = Math.atan2(yAxis, xAxis) * 360 / (2 * Math.PI);

    var value = "rotateZ(" + parseInt(angle) + "deg)";
    this.nodeStyle.transform = value;
};

XJCompUIHelper.prototype.animateRotateEnd = function(e) {
    e.preventDefault();
    var newStyle = {
        rotateZ: this.nodeStyle.transform.replace ( /[^\d.-]/g, '' ),
    };
    // console.log("  ...rotateZ: " + newStyle.rotateZ);

    XJEditActions.update(this.id, {style: newStyle});
};

function _getPosition(element) {
    var xPosition = parseInt(element.style.width)/2;
    var yPosition = parseInt(element.style.height)/2;

    while(element) {
        xPosition += element.offsetLeft;
        yPosition += element.offsetTop;
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

module.exports = XJCompUIHelper;


