/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJCompFactory
 */

var React = require('react');

var XJCompText = require('../components/XJCompText.react');
var XJCompImage = require('../components/XJCompImage.react');

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

module.exports = XJCompFactory;
