/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJText
 */

var React = require('react');

var XJEditActions = require('../actions/XJEditActions');

var XJText = React.createClass({

    render: function() {
        var html = {
            __html: this.props.comp.content,
        };
        return (
            <div className="xjText" dangerouslySetInnerHTML={html} />
        );
    }
});

module.exports = XJText;
