/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJMenuArea
 */

var React = require('react');
var XJEditActions = require('../actions/XJEditActions');
var XJEditorConstants = require('../constants/XJEditorConstants');

var MenuConstants = {
    text: {
        type: XJEditorConstants.XJ_COMP_TYPE_TEXT,
        name: "文字"
    },
    image: {
        type: XJEditorConstants.XJ_COMP_TYPE_IMAGE,
        name: "图片"
    }
};

var XJMenuArea = React.createClass({
    render: function() {
        var menus = [];
        for (var key in MenuConstants) {
            menus.push (
                <XJMenu key={key} info={MenuConstants[key]} />
            );
        }
        return (
            <div className="xjMArea">
                {menus}
            </div>
        );
    }
});

var XJMenu = React.createClass({
    _onCreateComp: function(e) {
        e.preventDefault();
        XJEditActions.create(this.props.info.type);
    },

    render: function() {
        return (
            <div className="xjMenu">
                <button onClick={this._onCreateComp}>
                    {this.props.info.name}
                </button>
            </div>
        );
    }
});

module.exports = XJMenuArea;
