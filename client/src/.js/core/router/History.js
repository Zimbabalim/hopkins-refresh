/**
 * Zimbabalim
 */
"use strict";

//"signals", "Constants", "router2/Utils"

import Constants from "core/Constants";
import Utils from "core/router/Utils";

let History = {

    props : {
        callback : null,
        //pushStateData : null, // *** TEST
        cacheCurrentUrl : null, // *** TEST

        prevPushStateData : null, // *** TEST

        pushStateData : {
            route : null,
            session : null
        },

        stateDataTest : []
    },


    init : function( _callback ){

        History.props.callback = _callback;

        // History.onChange( "on-startup-url" ); // FIXIT - removed this to prevent auto routing at startup

        window.onpopstate = function( e ){   // *** TODO check crossbrowser
            History.onChange( "on-pop-state-change" );
        };
    },


    onChange : function( _action ){

        console.warn("---> /History/ -onChange", _action );

        var path = null,
            url = null,
            decode = {},
            status = "fail";

        if( Constants.client.location.pathname === "/" ){

            status = "ok";
            path = [];
            url = "";
            // //console.log("/History/ -onChange THIS MUST BE ROOT!");

        } else {

            decode =  Utils.decodeSlugPath( Constants.client.location.pathname );
            //console.log("/History/ -onChange ", decode );

            if( decode ){
                path = decode.result;
                status = decode.status;
            } else {
                status = "fail";
            }

            url = Utils.trimSlashes( Constants.client.location.pathname );
        }

        if( status === "fail" ){
            //console.log("/History/ -onChange FAIL?");
            //historyReplace( "it/has/borked" ); // *** NOTE experiment
        }

        History.props.callback( { // *** dispatch to router
            action : _action,
            data : {
                status : status,
                path : path,
                url : url
            }
        } );
    },

    historyPush : function( _url ){
        var base = Constants.client.location.origin;
        _url = Utils.trimSlashes( _url ).result;
        // history.pushState( null, null, base + "/" + _url ); // *** RESTORE?

        History.props.cacheCurrentUrl = _url; // *** TEST

        // *********************************************************************************
        //history.pushState( { data : History.props.pushStateData }, null, base + "/" + _url ); // *** REMOVE?
        // *********************************************************************************

        //console.log("/History/ -historyPush ", History.props.cacheCurrentUrl, window.history.state["data"] );
    },


    setPushStateData : function ( _key, _data ) {
        // //console.log("/History/ -setPushStateData ", _key, _data );

        // History.props.prevPushStateData = History.props.pushStateData; // *** TEST
        // //console.log("##### /History/ -setPushStateData", History.props.prevPushStateData.route ,History.props.pushStateData.route  );


        //History.props.pushStateData[ _key ] = _data; // *** TODO not very safe...

        History.props.stateDataTest.push( { [_key] : _data } );
        //console.log("@@@@@@@@ /History/ -setPushStateData ", History.props.stateDataTest );

        History.historyPush( History.props.cacheCurrentUrl ); // *** TEST - see if we can write in data by calling again..?
    },

    getPushStateData : function ( _key ) {
        // return History.props.pushStateData[ _key ]

        /*let r = null;

        if( History.props.prevPushStateData ){
            r = History.props.prevPushStateData[ _key ]
            //console.log("/History/ -getPushStateData PREV DATA...", r );
        }*/

        ////console.log("/History/ -getPushStateData ", History.props.prevPushStateData, r );

        let r = null;

        if( History.props.stateDataTest.length > 1 ){

            let rr = _.filter( History.props.stateDataTest, "route" );
            r = rr[ rr.length - 1 ].route;

            //console.log("************ /History/ -getPushStateData ", History.props.stateDataTest, r );
        }

        return r
    },

    clearPushStateData : function ( _key ) {
        //console.log("/History/ -clearPushStateData ");
    },


    historyReplace : function( _url ){
        var base = Constants.client.location.origin;
        _url = Utils.trimSlashes( _url ).result;
        history.replaceState( null, null, base + "/" + _url );
    }
};


export default {
    init : History.init,
    //forceHistoryPush : History.historyPush,
    setPushStateData : History.setPushStateData,
    getPushStateData : History.getPushStateData,
    clearPushStateData : History.clearPushStateData,
    push : History.historyPush,
    replace : History.historyReplace
}

