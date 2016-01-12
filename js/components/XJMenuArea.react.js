/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJMenuArea
 */

var React = require('react');
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

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
            <div className="xjMBackground">
                <div className="xjMArea">
                    <ButtonToolbar>
                        {menus}
                    </ButtonToolbar>
                </div>
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
            <Button bsStyle="primary" onClick={this._onCreateComp}>
                {this.props.info.name}
            </Button>
        );
    }
});

module.exports = XJMenuArea;
