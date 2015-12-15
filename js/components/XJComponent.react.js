/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJComponent
 */

var React = require('react');
var Hammer = require('react-hammerjs');

var XJEditorConstants = require('../constants/XJEditorConstants');
var XJCompUIHelper = require('../helpers/XJCompUIHelper');
var XJCompFactory = require('../helpers/XJCompFactory');


var XJComponent = React.createClass({

    componentWillMount: function() {
        this.uihelper = new XJCompUIHelper(this);
    },

    componentDidMount: function() {
        this.uihelper.init(this.refs.animateTarget.style);
    },

    componentWillUnmount: function() {
        delete this.uihelper;
    },

    handleMove: function(e) {
        this.uihelper.animateMove(e);
    },

    handleMoveEnd: function(e) {
        this.uihelper.animateMoveEnd(e);
    },

    render: function() {
        var factory = new XJCompFactory();
        var content = factory.create(this.props.comp.type);
        var compStyle = {
            left: this.props.comp.position.left + "px",
            top: this.props.comp.position.top + "px"
        };

        return (
            <li className="xjComp" style={compStyle} ref="animateTarget">
                <Hammer onPan={this.handleMove}
                        onPanEnd={this.handleMoveEnd}>
                    {content}
                </Hammer>
            </li>
        );
    }
});

module.exports = XJComponent;
