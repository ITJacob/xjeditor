/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJEditorApp
 */

var React = require('react');
var XJCompStore = require('../stores/XJCompStore');
var XJEditActions = require('../actions/XJEditActions');

var XJMenuArea = require('../components/XJMenuArea.react');
var XJEditorArea = require('../components/XJEditorArea.react');
var XJPropertyArea = require('../components/XJPropertyArea.react');
var XJGrid = require('../components/XJGrid.react');

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
                <div className="xjBG" />
                <XJMenuArea />
                <div className="xjPhone">
                    <div className="top" />
                    <div className="phone_menubar" />
                    <div className="scene_title_baner" />
                    <XJEditorArea allXJComps={this.state.allXJComps} />
                    <XJGrid />
                    <div className="bottom" />
                    <div className="tips">
                        为了获得更好的使用，建议使用谷歌浏览器（chrome）、360浏览器、IE11浏览器。
                    </div>
                </div>
                <div className="xjProperty">
                    <XJPropertyArea />
                </div>
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
