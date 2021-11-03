"use strict";

/**
 * Zimbabalim
 * 05/05/2016
 */

import signals from "signals";
import Globals from "Globals";
import SimpleSv from "service/SimpleSv";
import Model from "model/Model";

export default function Bootstrap(){

    const events = {
        Sg_READY : new signals.Signal()
    };

    const init = function(){

        Globals.dom.el = document.getElementById( "app-container" );
        // console.warn("/Bootstrap/ -init GLOBALS", Globals );

        // console.warn("/Bootstrap/ -init ***DUMMIED***", events );


        // *** http://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
        function getMobileOperatingSystem() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            // Windows Phone must come first because its UA also contains "Android"
            if (/windows phone/i.test(userAgent)) {
                return "Windows Phone";
            }

            if (/android/i.test(userAgent)) {
                return "Android";
            }

            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return "iOS";
            }

            return "unknown";
        }

        if( getMobileOperatingSystem() === "iOS" ){
            Globals.client.isIOS = true;
            document.body.classList.add( "is-ios" );
        } else {
            document.body.classList.add( "not-ios" );
        }


        // *** TODO better this happens after gateway passed...
        loadJson( "json/config.json" );

        // events.Sg_READY.dispatch();
    };


    const loadJson = function( _filename ){

        var url = _filename,
            sv = new SimpleSv();

        // console.warn("/Bootstrap/ -loadJson ", _filename, sv );

        sv.events.Sg_SERVICE_RESPONSE.add( onData );
        sv.call( { url : url });

        function onData( _data ){

            if( _data.success ){
                // //console.log("/Bootstrap/ -onData SUCCESS", _data.data );
                Model.setData( _data.data );
                events.Sg_READY.dispatch();

            } else {
                // TODO error view?
                console.warn("/Bootstrap/ -onData ***NO DATA***");
            }
        }
    };




    return {
        events : events,
        init : init
    }
}


