/**
 * Zimbabalim
 */
"use strict";

//"signals", "Constants", "Store", "router2/Target", "router2/Composite", "router2/History"

import signals from "signals";
import Store from "core/Store";
import Target from "core/router/Target";
import History from "core/router/History";
import Constants from "core/Constants";

let Router = {

    callbacks : {
        historyFn : function( _data ){ Router.cmd( _data.action, _data.data ) },
        routeFn : function(  _data ){ Router.cmd( _data.action, _data.data ) }
    },

    props : {
        isInitialised : false,
        pushHistory : true
    },

    events : {
        Sg_ROUTE_ERROR : new signals.Signal()
    },

    init : function(){

        // NOTE disabled this as have another approach to default below
        /*if( !Store.getRoute().byName( "default") ){
         Router.createFallbackDefaultRoute();
         console.warn("/Router/ - is using a generated route! please define a default route!"); // TODO pass to logger
         }*/

        History.init( Router.callbacks.historyFn );
        Router.props.isInitialised = true;
    },

    cmd : function( _action, _args ){

        // console.warn("--> /Router/ -cmd ", _action, _args );

        /*if( !props.isInitialised ){ // *** FIXIT blocks startup, good to keep it for other cases
         console.warn( "\n" + "/Router/ please call zz.start before requesting routes!" );
         return;
         }*/

        _args.method = _action;

        // *** on no history route matched check for custom url and dispatch or fire error
        if( _args.status && _args.status === "fail" ){ // *** when status fail
            _args.path = customPath(); // *** check for custom url
            if( _args.path ){ // *** if exists
                _args.status = "custom"; // *** set flag to avoid confusion
                Router.dispatch( _args ); // *** dispatch to system
            } else {
                Router.dispatchApiError( "route-error", _args ); // *** otherwise fire error
            }

            //console.log("/Router/ -cmd FUCKED?");
            return; // *** quit here
            // TODO are we ever going to hit custom path below?
        }

        // console.warn("/Router/ -cmd ", _action );



        switch( _action ){

            case "on-target-go":

                pushHistory();
                Router.dispatch( _args );
                break;

            case "on-composite-go":

                pushHistory();
                Router.dispatch( _args );
                break;

            case "on-pop-state-change":

                _args.path = customPath();
                ////console.log("/Router/ -cmd POP STATE:", _args ); // *** FIXIT not firing?
                Router.dispatch( _args );
                break;

            case "on-startup-url":

                _args.path = customPath();
                Router.dispatch( _args );
                break;
        }


        function pushHistory(){

            //////console.log("/Router/ -pushHistory ", _args.options );

            if( Router.props.pushHistory ){

                var url = null,
                    pass = true;

                if( _args.options && _args.options.hideUrl ){

                    if( _args.options.hideUrl === true ){
                        ////console.log("/Router/ -pushHistory HIDE URL");
                        pass = false;
                    }
                }

                if( _args.options && _args.options.url ){
                    url = _args.options.url;
                } else if( _args.url ){
                    url = _args.url;
                }

                if( url && pass ){
                    History.push( url );
                }
            }
        }


        function customPath(){

            var custom = Store.getRoute().byCustomUrl( _args.url.result ),// *** beware .result...
                r = _args.path;

            if( custom ){
                r = custom.route.data.path;
            }

            return r;
        }
    },


    //*** NEW
    dispatch : function( _data ){

        //console.log("\n\n\/Router/ -dispatch ", _data );

        if( !_data.path || _data.path.length <= 1 ){

            _data = Store.getRoute().byDefault().route.data;

            if( _data.options && _data.options.url ){ // *** @zim added '_data.options &&'
                /// ???
            }
        }

        var first = _data.path[ 0 ], // FIXIT error here sometimes
            node = Store.get().node( first.uid ),
            root = Store.get().node( node.parentUid );

        var name = "FIXME!";

        if( _data.options && _data.options.name ){
            name = _data.options.name;
        }

        let vo = {
            name : name,
            options : _data.options || null,
            route : _data.path,
            type : "core-event",
            weight : "command",
            dispatcher : "router",
            method : _data.method, // *** this is action name, i.e. 'on-popstate-change' - we can decide to use it later elsewhere
            pushStateData : History.getPushStateData()
        };


        if( _data.method === "on-pop-state-change"){
            vo = History.getPushStateData( "route" );
            //console.log("/Router/ -dispatch SHOULD FIX BACK BUTTON!!!", vo );
        }
        

        root.node.api.dispatchCommand({
            action : Constants.core_events.Sg_ROUTER_SHOW.action,
            data : vo
        });

        //History.setPushStateData( "route", vo );
    }


    // ORIGINAL
    /*    dispatch : function( _data ){

     //console.log("\n\n\/Router/ -dispatch ", _data );
     // ////console.log("/Router/ -dispatch ", _data, _data.path, !_data.path || _data.path.length <= 1);

     if( !_data.path || _data.path.length <= 1 ){

     // _data = Store.getRoute().byName( "default" ).route.data;

     _data = Store.getRoute().byDefault().route.data;
     // ////console.log("/Router/ -dispatch TEST****", zzz );
     // console.warn("/Router/ -dispatchRouterCommand USING DEFAULT ROUTE:", _data.url );

     if( _data.options && _data.options.url ){ // *** @zim added '_data.options &&'
     // ////console.log("/Router/ -dispatch HAS URL", _data.options.url );
     //History.replace( _data.options.url ); // TODO experiment to allow a default url
     }

     }

     var first = _data.path[ 0 ], // FIXIT error here sometimes
     node = Store.get().node( first.uid ),
     root = Store.get().node( node.parentUid );

     //var name = ( _data.options && _data.options.name ) ? _data.options.name : "FIXME";

     var name = "FIXME!";

     if( _data.options && _data.options.name ){
     name = _data.options.name;
     }

     // *** FIXIT i'm really fucking around with to make it work for hopkins - will need to review bigtime. this is to get the query through somehow
     // var last = _data.path[ _data.path.length - 1 ];

     // last.options = _data.options;
     // ////console.log("/Router/ -dispatch PATH?", _data.path );

     //alert( "router" );


     if( _data.method === "on-pop-state-change"){
     //console.log("/Router/ -dispatch SHOULD FIX BACK BUTTON!!!");
     }

     root.node.api.dispatchCommand({
     action : Constants.core_events.Sg_ROUTER_SHOW.action,
     data : {
     name : name,
     options : _data.options || null,
     route : _data.path,
     type : "core-event",
     weight : "command",
     dispatcher : "router",
     method : _data.method, // *** this is action name, i.e. 'on-popstate-change' - we can decide to use it later elsewhere
     pushStateData : History.getPushStateData()
     }
     });

     History.setPushStateData( "route", {
     name :name,
     options : _data.options || null,
     route : _data.path,
     method : _data.method
     } )
     }*/,


    /**
     * dispatch public error events
     * TODO revise and tidy how we are using system events - some are in 'Constants', need to unify this
     * @param _type
     * @param _args
     */
    dispatchApiError : function( _type, _args ) {

        switch( _type ){

            case "route-error":

                /**
                 * this could be consumed to either show a 404 or call another predefined route using value of 'matchedNodes'
                 * more useful to leave the choice as a domain problem
                 */
                Router.events.Sg_ROUTE_ERROR.dispatch( {
                    action : _args.action,
                    url : _args.url.result,
                    matchedNodes : _args.path
                } );

                console.error("/Router/ -dispatchApiError --Sg_ROUTE_ERROR", _args );

                break;

        }


    },


    /**
     * store route object (target/composite) if options provided
     * @param _type
     * @param _route
     * @param _options
     */
    saveRouteObject : function( _type, _route, _options ){

        if( _options["name"] ){

            var vo = {
                type : _type,
                options : _options,
                route : _route
            };

            Store.add().route( _options.name, vo );
        }
    },


    /**
     * create default route if no default defined by user before zz.start() called (which hits init on this class)
     */
    createFallbackDefaultRoute : function(){

        var n = Store.get().nodeByIndex( 1 );

        if( n ){
            var r = new Target( n.uid, null, Router.callbacks.routeFn );
            Router.saveRouteObject( "target", r, { name : "default", url : "/" } );
        } else {
            console.error("/Router/ -createFallbackDefaultRoute *** ERROR *** looks like you need to create a child node..."); // *** TODO proper error message, investigate repercussions
        }
    }
};


export default {

    events : Router.events,

    init : Router.init,

    target : function( _id, _options ){

        ////console.log("/Router/ -target ", _id, _options );

        var r = new Target( _id, _options, Router.callbacks.routeFn );
        ( _options ) ? Router.saveRouteObject( "target", r, _options ) : null;

        return r
    },

    compose : function( _options ){

        var r = new Composite( _options, Router.callbacks.routeFn );
        ( _options ) ? Router.saveRouteObject( "composite", r, _options ) : null;

        return r
    },

    // *** e.g. "session", { foo : bar }
    setPushStateData : function ( _key, _data ) { // *** TEST
        // //console.log("/Router/ -setPushStateData ", _data );
        History.setPushStateData( _key, _data );
    },

    clearPushStateData : function () { // *** TEST
        ////console.log("/Router/ -clearPushStateData ");
        History.clearPushStateData();
    }

}
