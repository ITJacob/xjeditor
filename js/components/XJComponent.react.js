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
var XJActiveActions = require('../actions/XJActiveActions');
var XJGuideActions = require('../actions/XJGuideActions');

var XJEditorConstants = require('../constants/XJEditorConstants');
var XJCompFactory = require('../helpers/XJCompFactory');
var XJCompBar = require('../components/XJCompBar.react');


var XJComponent = React.createClass({

    getInitialState: function() {
        return {
            isMoving: false, //only influence css
        };
    },

    componentDidMount: function() {
        XJActiveActions.register(
            this.props.comp, this.refs.animateTarget.style);
    },

    componentWillUnmount: function() {
        //wait for other actions
        var id = this.props.comp.id;
        setTimeout(function(){ XJActiveActions.unregister(id); }, 1);
    },

    render: function() {
        var comp = this.props.comp;

        var isSelect =
            _.indexOf(this.props.selectedIDs, comp.id) !== -1;

        var content = XJCompFactory.create(comp);
        var bars = XJCompFactory.createBars(this, isSelect);

        var compStyle = _.clone(this.props.comp.style);
        var barStyle = {
            display: isSelect ? "block" : "none",
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

    // for Move Action
    _handleMoveStart: function(e) {
        this.setState({isMoving: true});
        XJActiveActions.select(
            this.props.comp.id, this.props.isMultiple);
    },

    _handleMove: function(e) {
        XJActiveActions.move(e);
        XJGuideActions.sync(
            this.refs.animateTarget.style, e);
    },

    _handleMoveEnd: function(e) {
        this.setState({isMoving: false});
        XJActiveActions.moveEnd(e);
        XJEditActions.refresh();
        XJGuideActions.stop();
    },

    // for Rotate Action

    _handleRotate: function(e) {
        XJActiveActions.rotate(e, this.refs.animateTarget);
    },

    _handleRotateEnd: function(e) {
        XJEditActions.refresh();
        XJActiveActions.select(
            this.props.comp.id, this.props.isMultiple);
    },

    // for click
    _handleClick: function(e) {
        e.stopPropagation();

        XJActiveActions.select(
            this.props.comp.id, this.props.isMultiple);
    },

});

module.exports = XJComponent;
