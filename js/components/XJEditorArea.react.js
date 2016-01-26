/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJEditorArea
 */

var _ = require('lodash');
var React = require('react');

var XJComponent = require('../components/XJComponent.react');

var XJCompStore = require('../stores/XJCompStore');
var XJKeyboardMap = require('../constants/XJKeyboardMap')
var XJEditActions = require('../actions/XJEditActions');
var XJActiveStore = require('../stores/XJActiveStore');

function getXJCompState() {
    return {
        selectedIDs: XJActiveStore.getSelectedIDs(),
    };
}

var XJEditorArea = React.createClass({

    getInitialState: function() {
        return {
            selectedIDs: [],
            isMultiple: false,
        };
    },

    componentDidMount: function() {
        // ref: https://hulufei.gitbooks.io/react-tutorial/content/events.html
        document.addEventListener("keydown", this._onKeyDown);
        document.addEventListener("keyup", this._onKeyUp);
        XJActiveStore.addSelectListener(this._onChange);
    },

    componentWillUnmount: function() {
        document.removeEventListener("keydown", this._onKeyDown);
        document.removeEventListener("keyup", this._onKeyUp);
        XJActiveStore.removeSelectListener(this._onChange);
    },

    render: function() {
        var allXJComps = this.props.allXJComps;
        var comps = [];

        for (var key in allXJComps) {
            comps.push(<XJComponent
                key={key}
                comp={allXJComps[key]}
                selectedIDs={this.state.selectedIDs}
                isMultiple={this.state.isMultiple} />);
        }

        return (
            <div className="xjEWrapper">
                <ul className="xjEArea">{comps}</ul>
            </div>

        );
    },

    _onKeyDown: function(event) {
        var map = XJKeyboardMap.map;
        var mapped = map[event.which];
        if (mapped === XJKeyboardMap.XJ_KEY_DELETE) {
            event.preventDefault();
            XJEditActions.destroy(this.state.selectedIDs);
        }

        if (mapped === XJKeyboardMap.XJ_KEY_CONTROL) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({isMultiple: true});
        }
    },

    _onKeyUp: function(event) {
        var map = XJKeyboardMap.map;
        var mapped = map[event.which];

        if (mapped === XJKeyboardMap.XJ_KEY_CONTROL) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({isMultiple: false});
        }
    },

    _onChange: function() {
        this.setState(getXJCompState());
    },
});

module.exports = XJEditorArea;
