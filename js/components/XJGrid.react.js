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

function getRGBa() {
    var args = Array.prototype.slice.call(arguments);

    //ref: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    if (args.length == 2) {
        var result =
            /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(args[0]);

        args = [
            parseInt(result[1], 16), parseInt(result[2], 16),
            parseInt(result[3], 16), args[1]
        ];
    }

    return "rgba(" + args.join(",") + ")";
}

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

    render: function() {
        var gridStyle = {
            left: 0,
            top: 0
        }
        return (
            <div className="xjGrid">
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
                c = getRGBa("#FFE900", guide[key]);
            }
            canvas.fillStyle = c;
            canvas.fillRect(Math.floor(i * this.vGap), 0, 1, this.GridH);
        }

        for (var j = 1; this.GridRows > j; j++) {
            var key = "h" + j;
            var c = this.DefaultColor;

            if (guide.hasOwnProperty(key)) {
                c = getRGBa("#FFE900", guide[key]);
            }
            canvas.fillStyle = c;
            canvas.fillRect(
                0, Math.floor(j * this.hGap) + this.remainder, this.GridW, 1
            );
        }
    }
});

module.exports = XJGrid;
