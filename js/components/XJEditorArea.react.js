/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJEditorArea
 */

var React = require('react');

var XJComponent = require('../components/XJComponent.react');
var XJEditActions = require('../actions/XJEditActions');

var XJEditorArea = React.createClass({

    componentDidMount: function() {
        // ref: https://hulufei.gitbooks.io/react-tutorial/content/events.html
        document.addEventListener("keydown", function (event) {
            var map = {
                8: -1, // Delete
                38: 0, // Up
                39: 1, // Right
                40: 2, // Down
                37: 3, // Left
            };
            var mapped = map[event.which];
            if (mapped == -1) {
                event.preventDefault();
                XJEditActions.destroy();
            }
        });
    },

    render: function() {
        var allXJComps = this.props.allXJComps;
        var comps = [];

        for (var key in allXJComps) {
            comps.push(<XJComponent
                key={key}
                comp={allXJComps[key]} />);
        }

        return (
            <div className="xjEWrapper">
                <ul className="xjEArea">{comps}</ul>
            </div>

        );
    }
});

module.exports = XJEditorArea;
