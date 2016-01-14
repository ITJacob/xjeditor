/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJKeyboardMap
 */

var keyMirror = require('keymirror');

var Mirror = keyMirror({
    DELETE: null,
    CONTROL: null,

    UP: null,
    RIGHT: null,
    DOWN: null,
    LEFT: null,
});

var XJKeyboardMap = {

    XJ_KEY_DELETE: Mirror.DELETE,
    XJ_KEY_CONTROL: Mirror.CONTROL,

    XJ_KEY_UP: Mirror.UP,
    XJ_KEY_RIGHT: Mirror.RIGHT,
    XJ_KEY_DOWN: Mirror.DOWN,
    XJ_KEY_LEFT: Mirror.LEFT,

    map: {
        8: Mirror.DELETE, // Delete
        17: Mirror.CONTROL, // Control
        38: Mirror.UP, // Up
        39: Mirror.RIGHT, // Right
        40: Mirror.DOWN, // Down
        37: Mirror.LEFT, // Left
    },
}

module.exports = XJKeyboardMap;
