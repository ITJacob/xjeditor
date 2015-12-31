/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJEditorData
 */

function XJEditorData() {
    this.ScreenWidth = 320;
    this.ScreenHeight = 486;
    this.GridRows = 16;
    this.GridCols = 10;
}

// get methods
XJEditorData.prototype.getScreenWidth = function() {
    return this.ScreenWidth;
}

XJEditorData.prototype.getScreenHeight = function() {
    return this.ScreenHeight;
}

XJEditorData.prototype.getGridRows = function() {
    return this.GridRows;
}

XJEditorData.prototype.getGridCols = function() {
    return this.GridCols;
}

// set methods
XJEditorData.prototype.setScreenWidth = function(data) {
    this.ScreenWidth = data;
}

XJEditorData.prototype.setScreenHeight = function(data) {
    this.ScreenHeight = data;
}

XJEditorData.prototype.setGridRows = function(data) {
    this.GridRows = data;
}

XJEditorData.prototype.setGridCols = function(data) {
    this.GridCols = data;
}

// export a singleton
module.exports = new XJEditorData;
