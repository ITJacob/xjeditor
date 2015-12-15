/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJEditorApp
 */

var React = require('react');
var XJCompStore = require('../stores/XJCompStore');
var XJMenuArea = require('../components/XJMenuArea.react');
var XJEditorArea = require('../components/XJEditorArea.react');

/**
 * Retrieve the current xjcomponent data from the XJCompStore
 */
function getXJCompState() {
    return {
        allXJComps: XJCompStore.getAll(),
    };
}

var XJEditorApp = React.createClass({

    getInitialState: function() {
        return getXJCompState();
    },

    componentDidMount: function() {
        XJCompStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        XJCompStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
        return (
            <div className="xjEditor">
                <XJMenuArea />
                <XJEditorArea allXJComps={this.state.allXJComps} />
            </div>
        );
    },

    /**
     * Event handler for 'change' events coming from the XJCompStore
     */
    _onChange: function() {
        this.setState(getXJCompState());
    }

});

module.exports = XJEditorApp;
