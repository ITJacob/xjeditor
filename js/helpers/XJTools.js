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
    }
};

module.exports = XJTools;
