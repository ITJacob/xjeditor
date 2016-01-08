/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJText
 */

var React = require('react');
var ReactQuill = require('react-quill');

var XJEditActions = require('../actions/XJEditActions');

var XJText = React.createClass({

    componentWillReceiveProps: function(next) {
        var toolbarDom = this.refs.quill.refs.toolbar.getDOMNode();
        toolbarDom.style.display =
            next.comp.isSelect ? "block" : "none";
    },

    onTextChange: function(value) {
        XJEditActions.update(this.props.comp.id, {content: value});
    },

    render: function() {
        return (
            <ReactQuill ref="quill"
                theme="snow"
                onChange={this.onTextChange}
                value={this.props.comp.content}>
                <div key="editor"
                    ref="editor"
                    className="quill-contents" />
                <ReactQuill.Toolbar
                    key="toolbar"
                    ref="toolbar"
                    items={ReactQuill.Toolbar.defaultItems} />
            </ReactQuill>
        );
    }
});

module.exports = XJText;
