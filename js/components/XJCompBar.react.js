/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJCompBar
 */

var _ = require('lodash');
var React = require('react');
var classNames = require('classnames');
var Hammer = require('react-hammerjs');

var XJEditorConstants = require('../constants/XJEditorConstants');
var XJEditActions = require('../actions/XJEditActions');
var XJActiveActions = require('../actions/XJActiveActions');


var XJCompBar = React.createClass({

    getInitialState: function() {
        return {
            origin: {}
        };
    },

    componentDidMount: function() {
        this.uihelper = this.props.bar.comp.uihelper;
    },

    render: function() {
        var barClass = ["bar"];
        barClass.push(this.props.bar.barClass);
        var barRadius = null;
        if (this.props.bar.isCorner) {
            barClass.push("bar-radius");
        }
        else {
            barRadius = <div className="bar-radius" />;
        }

        var divStyle = {
            display: this.props.isSelect ? "block" : "none",
            opacity: this.props.isMoving ? "0.2" : "1.0"
        }

        return (
            <Hammer onPanStart={this._handleResizeStart}
                    onPan={this._handleResize}
                    onPanEnd={this._handleResizeEnd}
                    vertical={true}>
                <div style={divStyle}
                    className={classNames(barClass)}>
                    {barRadius}
                </div>
            </Hammer>
        );
    },

    _handleResizeStart: function(e) {
        this.setState({origin: _.clone(this.props.bar.comp.style)});
        XJActiveActions.select(
            this.props.bar.comp.id, this.props.isMultiple);
    },

    _handleResize: function(e) {
        var type = this.props.bar.type;
        XJActiveActions.resize(this._getDetection(e));
    },

    _handleResizeEnd: function(e) {
        XJEditActions.refresh();
    },

    _getDetection: function(e) {
        var o = this.state.origin;
        var n = this.props.bar.comp.style;
        var direction = this.props.bar.type.split("_").pop();
        var r = {
            top: 0,
            left: 0,
            height: 0,
            width: 0
        };

        if (direction.includes("S")) {
            r.height = parseInt(o.height) + e.deltaY - parseInt(n.height);
        }

        if (direction.includes("N")) {
            r.top = parseInt(o.top) + e.deltaY - parseInt(n.top);
            r.height = parseInt(o.height) - e.deltaY - parseInt(n.height);
        }

        if (direction.includes("E")) {
            r.width = parseInt(o.width) + e.deltaX - parseInt(n.width);
        }

        if (direction.includes("W")) {
            r.left = parseInt(o.left) + e.deltaX - parseInt(n.left);
            r.width = parseInt(o.width) - e.deltaX - parseInt(n.width);
        }

        return r;
    },
});

module.exports = XJCompBar;
