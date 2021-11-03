/**
 * Zimbabalim
 * entry point - sets up shortcuts to libs and fires context.init
 */
"use strict";

(function(){

    require.config({

        baseUrl             :   "../src/.js/src",
        paths : {
            lodash          :   "../libs/lodash.min",
            signals         :   "../libs/signals.min",
            Zepto           :   "../libs/zepto.min",
            TweenMax        :   "../libs/GreenSock-JS/src/minified/TweenMax.min",
            history         :   "../libs/history.min"
    }});


    require( [ "zz", "_tests/TestBed4" ],
        function( zz, TestBed ){

            zz.init();
            TestBed.init();

        });

}());