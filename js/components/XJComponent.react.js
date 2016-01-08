/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJComponent
 */

var _ = require('lodash');
var React = require('react');
var Hammer = require('react-hammerjs');

var XJEditActions = require('../actions/XJEditActions');
var XJEditorConstants = require('../constants/XJEditorConstants');
var XJCompUIHelper = require('../helpers/XJCompUIHelper');
var XJCompFactory = require('../helpers/XJCompFactory');
var XJCompBar = require('../components/XJCompBar.react');


var XJComponent = React.createClass({

    getInitialState: function() {
        return {
            isMoving: false
        };
    },

    componentWillMount: function() {
        this.uihelper = new XJCompUIHelper(this);
        this.factory = new XJCompFactory();
    },

    componentDidMount: function() {
        this.uihelper.setTarget(this.refs.animateTarget);
    },

    componentWillUnmount: function() {
        delete this.uihelper;
        delete this.factory;
        // delete this.content;
        // delete this.bars;
    },

    render: function() {
        var content = this.factory.create(this.props.comp);
        var bars = this.factory.createBars(this);

        var compStyle = _.clone(this.props.comp.style);
        var barStyle = {
            display: this.props.comp.isSelect ? "block" : "none",
            opacity: this.state.isMoving ? "0.2" : "1.0"
        }

        return (
            <li className="xjComp"
                style={compStyle}
                ref="animateTarget"
                onClick={this._handleClick}>
                <Hammer onPanStart={this._handleMoveStart}
                        onPan={this._handleMove}
                        onPanEnd={this._handleMoveEnd}
                        vertical={true}>
                    {content}
                </Hammer>
                <Hammer onPan={this._handleRotate}
                        onPanEnd={this._handleRotateEnd}
                        vertical={true}>
                    <div style={barStyle}
                        className="bar bar-rotate bar-radius" />
                </Hammer>
                <div style={barStyle} className="bar bar-line" />
                {bars}
            </li>
        );
    },

    _handleMoveStart: function(e) {
        this.setState({isMoving: true});
        XJEditActions.select(this.props.comp.id);
    },

    _handleMove: function(e) {
        this.uihelper.animateMove(e);
    },

    _handleMoveEnd: function(e) {
        this.setState({isMoving: false});
        this.uihelper.animateMoveEnd(e);
    },

    _handleRotate: function(e) {
        this.uihelper.animateRotate(e);
    },

    _handleRotateEnd: function(e) {
        this.uihelper.animateRotateEnd(e);
        // console.log("... is Rotate end")
    },

    _handleClick: function(e) {
        e.stopPropagation();
        XJEditActions.select(this.props.comp.id);
    },
});

module.exports = XJComponent;
