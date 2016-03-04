/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * app
 */

var React = require('react');
var ReactDOM = require('react-dom');

var browserHistory = require('react-router').browserHistory;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute = require('react-router').IndexRoute;

var XJEditorApp = require('./components/XJEditorApp.react');


var App = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

var Index = React.createClass({
    render: function() {
        var style = {
            padding: "30px",
        }
        return (
            <div>
                <h1 style={style}>心界编辑器</h1>
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

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index}/>
            <Route path="/scene/:sceneID" component={XJEditorApp} />
        </Route>
    </Router>
), document.getElementById('xjEditorApp')
);
