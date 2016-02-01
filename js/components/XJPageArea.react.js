/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJPageArea
 */

var React = require('react');
var Link = require('react-router').Link;

var XJPageArea = React.createClass({
    render: function() {
        return (
            <div className="XJPageArea">
                <div>
                    <ul>
                        <li><Link to="/scene/test" query={{ pageID: 1 }}>跳转到第一页</Link></li>
                        <li><Link to="/scene/test" query={{ pageID: 2 }}>跳转到第二页</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = XJPageArea;
