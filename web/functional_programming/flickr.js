/**
 * Created by xiaogang on 2017/6/30.
 */
"use strict";
requirejs.config({
    paths: {
        ramda: './ramda',
        jquery: './jquery'
    }
});

require([
        'ramda',
        'jquery'
    ],
    function (_, $) {
        ////////////////////////////////////////////
        // Utils

        var Impure = {
            getJSON: _.curry(function (callback, url) {
                $.getJSON(url, callback);
            }),

            setHtml: _.curry(function (sel, html) {
                console.log(html);
                $(sel).html(html);
            })
        };

        var img = function (url) {
            // return $('<img />', {src: url});

            return '<img src="' + url + '">'
        };


        var trace = _.curry(function (tag, x) {
            console.log(tag, x);
            return x;
        });

        ////////////////////////////////////////////

        var url = function (t) {
            return './' + t + '.json';
        };

        // var mediaUrl = _.compose(_.prop('m'), _.prop('media'));
        //
        // var srcs = _.compose(_.map(mediaUrl), trace("data:"), _.prop('data'));
        //
        // var images = _.compose(_.map(img), trace("src:"), srcs);

        var mediaUrl = _.compose(_.prop('m'), _.prop('media'));

        var mediaToImg = _.compose(img, mediaUrl);

        var images = _.compose(_.map(mediaToImg), _.prop('data'));


        var renderImages = _.compose(Impure.setHtml("body"), trace("imageHtml:"), images);

        var app = _.compose(Impure.getJSON(renderImages), trace("url"), url);

       // app("data");


        // console.log(_.reduce(function (a, b) {
        //     return a - b;
        // }, 0, [1, 2, 3, 4]));

        function p(x) {
            return x * x;
        }

        function f(x) {
            return x + x;
        }
        // filter :: (a -> Bool) -> [a] -> [a]
        var func1 = _.compose(_.map(f),trace("filter"), _.filter(_.compose(p,trace("f1:"), f)));


        var func2 = _.compose(_.filter(p), _.map(f));


        //
        // console.log(func1([1,2,3,4]));
        // console.log(func2([1,2,3,4]));


        var func3=_.compose(p,trace("f3:"), f);
        var func4=(_.compose(p,trace("f4:"), _.filter(f)));
        console.log(func3(3))
        console.log(func4([3]))
    });