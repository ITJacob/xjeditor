/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJGrid
 */

var _ = require('lodash');
var React = require('react');

var XJEditorData = require('../constants/XJEditorData');
var XJGuideStore = require('../stores/XJGuideStore');
var XJGuideActions = require('../actions/XJGuideActions');
var XJActiveActions = require('../actions/XJActiveActions');

var XJTools = require('../helpers/XJTools');
var getRGBa = XJTools.getRGBa;

var XJGrid = React.createClass({

    componentWillMount: function() {
        this._initGrid();
        XJGuideActions.init(this);
    },

    componentDidMount: function() {
        this.canvas = this.refs.gridTarget.getContext("2d");
        this._paint();
        XJGuideStore.addGuideListener(this._paint);
    },

    componentWillUnmount: function() {
        XJGuideStore.removeGuideListener(this._paint);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // grid re-paint the canvas, don't need to re-render
        return false;
    },

    render: function() {
        var gridStyle = {
            left: 0,
            top: 0
        }
        return (
            <div className="xjGrid" onClick={this._handleClick}>
                <canvas className="eq-block-grid-inner"
                        style={gridStyle}
                        width={this.GridW}
                        height={this.GridH}
                        ref="gridTarget" />
            </div>
        );
    },

    _initGrid: function() {
        this.GridW = XJEditorData.getScreenWidth();
        this.GridH = XJEditorData.getScreenHeight();
        this.GridRows = XJEditorData.getGridRows();
        this.GridCols = XJEditorData.getGridCols();
        this.DefaultColor = getRGBa(150, 150, 150, 0.2);
        this.vGap = Math.round(this.GridW / this.GridCols);
        this.hGap = Math.round(this.GridH / this.GridRows);
        this.remainder = (this.GridH - this.hGap * this.GridRows) / 2;
    },

    _paint: function() {

        // should highlighted lines.
        // guide = {v1:0.2, h1:1.0},
        // v1 for position, 0.2 for Alpha
        var guide = XJGuideStore.getGuide();

        if ( _.isEqual(this.guide, guide) ) return;
        // console.log("not equal!");
        this.guide = guide;
        var canvas = this.canvas;

        canvas.clearRect(0, 0, this.GridW, this.GridH);

        for (var i = 1; this.GridCols > i; i++) {
            var key = "v" + i;
            var c = this.DefaultColor;

            if (guide.hasOwnProperty(key)) {
                c = getRGBa("#FFB200", guide[key]);
            }
            canvas.fillStyle = c;
            canvas.fillRect(Math.floor(i * this.vGap), 0, 1, this.GridH);
        }

        for (var j = 1; this.GridRows > j; j++) {
            var key = "h" + j;
            var c = this.DefaultColor;

            if (guide.hasOwnProperty(key)) {
                c = getRGBa("#FFB200", guide[key]);
            }
            canvas.fillStyle = c;
            canvas.fillRect(
                0, Math.floor(j * this.hGap) + this.remainder, this.GridW, 1
            );
        }
    },

    _handleClick: function(e) {
        e.stopPropagation();
        XJActiveActions.select();
    },
});

module.exports = XJGrid;
