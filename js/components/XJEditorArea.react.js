/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJEditorArea
 */

var React = require('react');

var XJComponent = require('../components/XJComponent.react');

var XJEditorArea = React.createClass({

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
