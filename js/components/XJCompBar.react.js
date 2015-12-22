/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJCompBar
 */

var React = require('react');
var classNames = require('classnames');
var Hammer = require('react-hammerjs');

var XJEditorConstants = require('../constants/XJEditorConstants');


var XJCompBar = React.createClass({

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

        return (
            <Hammer onPan={this._handleResize}
                    onPanEnd={this._handleResizeEnd}
                    vertical={true}>
                <div className={classNames(barClass)}>
                    {barRadius}
                </div>
            </Hammer>
        );
    },

    _handleResize: function(e) {
        var type = this.props.bar.type;
        this.uihelper.animateResize(e, type);
    },

    _handleResizeEnd: function(e) {
        this.uihelper.animateResizeEnd(e);
        // console.log("... is resize end")
    },
});

module.exports = XJCompBar;
