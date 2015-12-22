/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJComponent
 */

var _ = require('lodash');
var React = require('react');
var Hammer = require('react-hammerjs');

var XJEditorConstants = require('../constants/XJEditorConstants');
var XJCompUIHelper = require('../helpers/XJCompUIHelper');
var XJCompFactory = require('../helpers/XJCompFactory');
var XJCompBar = require('../components/XJCompBar.react');


var XJComponent = React.createClass({

    componentWillMount: function() {
        this.uihelper = new XJCompUIHelper(this);

        var factory = new XJCompFactory();
        this.content = factory.create(this.props.comp.type);
        this.bars = factory.createBars(this);
    },

    componentDidMount: function() {
        this.uihelper.setTarget(this.refs.animateTarget);
    },

    componentWillUnmount: function() {
        delete this.uihelper;
        delete this.content;
        delete this.bars;
    },

    render: function() {
        var compStyle = _.clone(this.props.comp.style);
        return (
            <li className="xjComp"
                style={compStyle}
                ref="animateTarget">
                <Hammer onPan={this._handleMove}
                        onPanEnd={this._handleMoveEnd}
                        vertical={true}>
                    {this.content}
                </Hammer>
                <Hammer onPan={this._handleRotate}
                        onPanEnd={this._handleRotateEnd}
                        vertical={true}>
                    <div className="bar bar-rotate bar-radius" />
                </Hammer>
                <div className="bar bar-line" />
                {this.bars}
            </li>
        );
    },

    _handleMove: function(e) {
        this.uihelper.animateMove(e);
    },

    _handleMoveEnd: function(e) {
        this.uihelper.animateMoveEnd(e);
    },

    _handleRotate: function(e) {
        this.uihelper.animateRotate(e);
    },

    _handleRotateEnd: function(e) {
        this.uihelper.animateRotateEnd(e);
        // console.log("... is Rotate end")
    },
});

module.exports = XJComponent;
