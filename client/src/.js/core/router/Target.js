/**
 * Zimbabalim
 */
"use strict";

// "signals", "Store", "router2/Utils"

import Utils from "core/router/Utils";
import Store from "core/Store";

export default function Target( _id, _options, _callback ){


    var data = {
        options : _options || null,
        path : null,
        url : null
    };

    var props = {
        node : {},
        queryData : {},
        baseRouteVOs_$ : [],
        temp_$ : []
    };

    /**
     *
     */
    var update = function(){
        data.path = props.temp_$;
        data.url = Utils.encodeSlugPath( data.path );
        //console.log("/Target/ -update", data );

        //console.timeEnd("target");
        //console.timeEnd("children");
    };


    /**
     * iife
     * set up
     */
    var init = ( function(){

        //console.time("target");
        // console.log("/Target/ - ID?", _id );

        // *** separates identifier from any provided query string
        var target = Utils.extractQueryString( _id );
        // console.log("/Target/ - target?", target );

        props.queryData = target.data;
        props.node = Store.get().node( target.clean );
        // console.log("/Target/ - NODE?", props.node );

        if( !props.node ){
            console.warn("/Target/ - ***ERROR*** not found!");
            return
        }

        // *** generate array of route objects from uri string
        props.baseRouteVOs_$ = Utils.iterate(
            Utils.toTrimmedArray( props.node.path.uri ).result,
            Utils.createRouteVO
        );

        // *** append data if we have it
        props.baseRouteVOs_$[ props.baseRouteVOs_$.length - 1 ] // *** ! our node is at the end of the line so far
            .data = props.queryData;

        props.baseRouteVOs_$.splice( 0, 1 ); // *** remove root node - we can infer it later and keep slug url simple
        props.temp_$ = props.baseRouteVOs_$;

        update();
    }());


    return {

        data : data,

        children : function( _request ){

            //console.time("children");

            if( !_request ){ // *** treat empty call as none()
                this.none();
            }

            var isArray = _.isArray( _request ),
                casted_$ = ( isArray ) ? _request : ( _.isString( _request )) ? [ _request ] : null,// *** if input is string, wrap in array
                extracted_$ = Utils.iterate( casted_$, Utils.extractQueryString ), // *** handle query string
                adapted_$ = [],
                routeVOs_$ = [];

            // TODO extend createRouteVO to accommodate this
            _.each( extracted_$, function( _v ){ // *** convert extractQueryString format to our route format

                var n = Store.get().node( _v.clean ),
                    r = {};

                if( n ){
                    r.depth = n.depth;
                    r.name = n.name;
                    r.slug = n.slug;
                    r.uid = n.uid;
                    r.data = _v.data;
                }

                adapted_$.push( r );
            });


            _.each( adapted_$, function( _v ){ // *** check objects actually belong to the node, and save the new versions

                var m = _.find( props.node.children, function( _vv ){
                    return ( _v.uid === _vv.uid );
                } );

                if( m ){
                    routeVOs_$.push( _v );
                }
            });

            if( routeVOs_$ ){
                props.temp_$ = _.union( props.baseRouteVOs_$, routeVOs_$ ); // *** merge new objects into the path
                update();
            }

            return this;
        },

        all : function(){
            console.warn("/Target/ -all ");

            props.temp_$ = null;
            props.temp_$ = _.union( props.baseRouteVOs_$, props.availableChildren );
            update();

            return this;
        },

        except : function(){
            console.warn("/Target/ -except ");
            return this;
        },

        none : function(){
            console.warn("/Target/ -none ");
            return this;
        },

        go : function( _from ){

            _from = ( _from ) ? _from : 0;
            data.from = _from; // TEST

            // console.log("\n\n\/Target/ -go ", data );

            update();
            
            _callback({
                action : "on-target-go",
                data : data
            });

            return this;
        }

    }
}
