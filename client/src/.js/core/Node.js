/**
 * Zimbabalim
 */
"use strict";

/*
define([ "signals", "zz", "Constants" ],
    function( signals, zz, Constants ){


        return Node
    } );*/


import signals from "signals";
import Constants from "core/Constants";

export default function Node( _meta ){

    var _defaults = {
        RELAY_SIGNALS : true
    };

    var _events = {
        _Sg_COMMAND : new signals.Signal(),
        _Sg_REQUEST : new signals.Signal()
    };

    var _init = function(){
        ////////console.log("/AbstractNode/ -_init ", _meta.uid, _meta.depth );
    };

    var _update = function( _key, _value ){

        if( _key === "children" ){
            _meta.children.push( _value );

            ////////console.log("/Node/ -_update ",  _meta.children );
        }

        // set other props directly? e.g. _meta[ _key ] = _value

        //_components.viewstack.add( _childUid ); // TODO
    };

    // *** for fast track events
    var _privateCoreEventSubscription = function( _sg ){
        _sg.add( function( _args ){
            _onPrivateCoreEvent( _args )
        });
    };

    var _onPrivateCoreEvent = function( _args ){
        //////////console.log("/Node/ -_onPrivateCoreEvent ", _args );
    };


    var _commandSubscription = function( _sg ){
        _sg.add( function( _args ){
            _onCommand( _args )
        });
    };

    var _requestSubscription = function( _sg ){
        _sg.add( function( _args ){
            _onRequest( _args )
        });
    };

    var _onCommand = function( _args ){

        // console.log( "/Node/ -_onCommand ", _meta.uid, _args.data["type"] );

        var pass = ( _args.data["type"] === "core-event" ) ? _onPublicCoreEvent( _args ) : true;

        if( pass ){
            // console.log("/Node/ -_onCommand PASSTHRU", _meta.uid );
            _notify( _args );
            _relay( _events._Sg_COMMAND, _args );
        }
    };

    var _onRequest = function( _args ){
        // console.log("/Node/ -_onRequest ", _meta.uid );
        _notify( _args );
        _relay( _events._Sg_REQUEST, _args );
    };

    var _relay = function( _sg, _args ){

        if( _args.special && !_args.special.relay || !_defaults.RELAY_SIGNALS ){
            //console.log("/AbstractNode/ -_relay DEFEAT", _meta.uid );
            return;
        }

        // console.log( _meta.uid, "/Node/ -_relay ###");

        _sg.dispatch( {
            action : _args.action,
            data : _args.data
        } );
    };

    var _notify = function( _args ){
        //console.log("/Node/ -_notify ", _meta );
        //_infoVO.self.actionRunner( _args.action, _args.data );

        _meta.node.actionRunner( _args.action, _args.data );
    };


    var dispatchCommand = function( _args ){
        _events._Sg_COMMAND.dispatch( _args );
    };


    var dispatchRequest = function( _args ){
        _events._Sg_REQUEST.dispatch( _args );
    };


    var _onPublicCoreEvent = function( _args ){

        var passThru = true;

        //Constants.core_events.Sg_ROUTER_SHOW.action
        if( _args.data["weight"] === "command" ){ onCommand() }

        // console.log( _meta.uid, "/Node/ -_onPublicCoreEvent ", _args );

        function onCommand(){

            if(  _args.data[ "dispatcher" ] === "router" ){

                var target = isTarget( _args.data.route );

                switch( _args.action ){

                    case Constants.core_events.Sg_ROUTER_SHOW.action:

                        // console.log("******* /Node/ -onCommand ", _args.data.options );

                        // *** FIXIT @zim added to avoid coupling to dom - find cleaner solution
                        var tryDom = function( _f ) {
                            if( _meta.node.els && _meta.node.els.el && _meta.node.els.el.nodeType ){ // *** nodeType in case react element

                                var el = _meta.node.els.el;
                                // ( _f ) ? el.addClass( "is-active" ) : el.removeClass( "is-active" ); // RESTORE
                                //( _f ) ? el.classList.add( "is-active" ) : el.classList.remove( "is-active" ); // *** native // RESTORE

                                var action = ( _f ) ? "show" : "hide"; // TODO is this a bit lame?
                                // console.log("/Node/ -tryDom *********", _args.data );
                                //_meta.node.actionRunner( action, _args.data.options ); // *** pass through so we can get query
                                _meta.node.actionRunner( action, _args.data ); // *** pass through so we can get query

                            } else {
                                // console.warn("/Node/ -onCommand --tryDom *error* no dom element matched"); // *** TODO create proper log error/warning
                            }
                        };

                        if( target.result ){
                            //console.log("/Node/ -onCommand TARGET", target.index, target.of, _meta.uid, target.data );

                            if( target.data ){
                                // console.log("/Node/ -onCommand ", _meta.uid, "HAS DATA:", target.data );
                            }

                            //passThru = !target.final; // TODO fails hiding children in same set - event should probably be stopped in children of this node, not here!

                            tryDom( true );
                        } else {
                            tryDom( false );
                        }



                        if( target.final ){
                            //console.timeEnd( "goto" );
                        }

                        break;

                }

            }

        }

        function onRequest(){
            // TODO
        }

        function isTarget( _uids_$ ){

            var r = {
                result : false,
                index : null,
                of : _uids_$.length,
                final : false,

                data : null // TEST
            };

            for( var j = 0; j < r.of; j ++ ){

                if( _uids_$[ j ].uid === _meta.uid ){
                    r.result = true;
                    r.index = parseInt( j + 1, 10 );
                    r.final = ( r.index === r.of );

                    r.data = _uids_$[ j ].data; // TEST

                    break;
                }
            }

            //console.warn( "/Node/ -isTarget ",  _uids_$, _meta.uid, r );

            return r;
        }



        return passThru
    };


    return{

        _events : _events,
        _init : _init,
        _update : _update,
        _privateCoreEventSubscription : _privateCoreEventSubscription,
        _commandSubscription : _commandSubscription,
        _requestSubscription : _requestSubscription,

        api : {
            info : _meta,
            dispatchCommand : dispatchCommand,
            dispatchRequest : dispatchRequest
        }
    }
}







/*function Node( _meta ){


}*/


