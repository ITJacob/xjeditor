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

var XJActiveStore = require('../stores/XJActiveStore');
var XJTools = require('../helpers/XJTools');


function getXJCompState() {
    return {
        selectedComp: XJActiveStore.getSelected(),
    };
}

var XJPropertyArea = React.createClass({

    getInitialState: function() {
        return getXJCompState();
    },

    componentDidMount: function() {
        XJActiveStore.addSelectListener(this._onChange);
        XJActiveStore.addActiveListener(this._onChange);
    },

    componentWillUnmount: function() {
        XJActiveStore.removeSelectListener(this._onChange);
        XJActiveStore.removeActiveListener(this._onChange);
    },


    render: function() {
        var comp = this.state.selectedComp;
        var panel = this._createPanel(comp);

        return (
            <div className="XJPArea">
                {panel}
            </div>
        );
    },

    _createPanel: function(comp) {
        if (!comp) {
            comp = this._getDefault();
        }

        var header = "控件 id:" + comp.id;
        var type = comp.type;
        var style = [];
        for (var key in comp.style) {

            style.push(
                <div key={key}> {key + ": " + comp.style[key]} </div>
            );
        }
        var content = comp.content;
        return (
            <Panel collapsible defaultExpanded header={header}>
                <ListGroup fill>
                    <ListGroupItem>种类: {type}</ListGroupItem>
                    <ListGroupItem>样式: {style}</ListGroupItem>
                    <ListGroupItem>内容: {content}</ListGroupItem>
                </ListGroup>
            </Panel>
        );
    },

    _getDefault: function() {
        return {
            id: "",
            type: "",
            content: "",
            style: [],
        }
    },

    _onChange: function() {
        this.setState(getXJCompState());
    }
});

module.exports = XJPropertyArea;
