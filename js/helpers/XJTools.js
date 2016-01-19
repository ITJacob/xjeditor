/*
 * Copyright (c) 2015-2016, XinJie Technology, Inc.
 * All rights reserved.
 *
 * XJTools
 */

var XJTools = {

    /**
     * create a rgba String.
     * @param  {255, 233, 0, 0.2} or
     * @param {"#FFE900", 0.2} both will return a
     * rgba(255,233,0,0.2) String
     */
    getRGBa: function() {
        var args = Array.prototype.slice.call(arguments);

        //ref: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        if (args.length == 2) {
            var result =
                /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(args[0]);

            args = [
                parseInt(result[1], 16), parseInt(result[2], 16),
                parseInt(result[3], 16), args[1]
            ];
        }

        return "rgba(" + args.join(",") + ")";
    },

    /**
     * create a transform String.
     * @param  {X, Y, Z, R} or
     * translate3d(Xpx, Ypx, Zpx) rotateZ(Rdeg); String
     */
    getTransform: function(x, y, z, r) {
        return "translate3d(" +
                x + "px, " +
                y + "px, " +
                z + ") rotateZ(" +
                r + "deg)";
    },

    /**
     * create a transform object.
     * @param str: "translate3d(0px, -10px, 100px) rotateZ(-29deg);"
     * will return a
     * Object {x: 0, y: -10, z: 100, r: -29}
     */
    parseTransform: function(str) {
        var result = {
            x: 0,
            y: 0,
            z: 0,
            r: 0
        };
        var step1 = str.match(/\((.| )+?\)/g);
        result.r = parseInt(step1.pop().match(/([-\d]+)/g));

        if (step1.length > 0) {
            var step2 = step1.pop().match(/([-\d]+)/g);
            result.x = parseInt(step2[0]);
            result.y = parseInt(step2[1]);
            result.z = parseInt(step2[2]);
        }

        return result;
    }
};

module.exports = XJTools;
