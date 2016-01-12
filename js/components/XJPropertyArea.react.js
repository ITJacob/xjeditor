/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJPropertyArea
 */

var React = require('react');
var Panel = require('react-bootstrap').Panel;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var XJPropertyArea = React.createClass({
    render: function() {
        var comps = this._findSelect(this.props.allXJComps);
        var panels = [];

        for (var i = 0; i < comps.length; i++) {
            var panel = this._createPanel(comps[i]);
            panels.push(panel);
        };

        return (
            <div className="XJPArea">
                {panels}
            </div>
        );
    },

    _findSelect: function(allComps) {
        var comps = [];
        for (var key in allComps) {
            if (allComps[key].isSelect) {
                comps.push( allComps[key] );
            }
        }
        return comps;
    },

    _createPanel: function(comp) {
        var header = "控件 id:" + comp.id;
        var type = comp.type;
        var style = [];
        for (var key in comp.style) {

            style.push(
                <div> key + ": " + comp.style[key] </div>
            );
        }
        var content = comp.content;
        return (
            <Panel key={comp.id} collapsible defaultExpanded header={header}>
                <ListGroup fill>
                    <ListGroupItem>种类: {type}</ListGroupItem>
                    <ListGroupItem>样式: {style}</ListGroupItem>
                    <ListGroupItem>内容: {content}</ListGroupItem>
                </ListGroup>
            </Panel>
        );
    },
});

module.exports = XJPropertyArea;
