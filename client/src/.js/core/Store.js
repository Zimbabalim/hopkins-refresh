/**
 * Zimbabalim
 */
"use strict";

//"lodash", "Constants"

import Constants from "core/Constants";

let Store = {


    model : {
        metas : {},
        routes : {},
        rootNodes_$ : [],
        userActions : {}
    },

    props : {
        numNodes : 0,
        numRoots : 0,
        metasAsArray : [] // *** OPTIMISATION for Store.get()s by index
    },


    //window.getnode = function( _id ){ Store.get().node( _id ) };


    add : function(){

        return {
            node : function( _meta ){

                Store.model.metas[ _meta.uid ] = _meta;
                Store.props.metasAsArray = _.values( Store.model.metas );

                _meta.path = {
                    uri : Store.get().nodes( _meta ).uri,
                    slugs : Store.get().nodes( _meta ).slugs,
                    //nodes : Store.get().nodes( _meta).nodes,
                    //annotation : null
                };

                if( _meta.isRoot ){
                    Store.model.rootNodes_$.push( _meta );
                    Store.props.numRoots ++;
                    //console.log("/Store/ -node ", Store.model.rootNodes_$ );
                }

                //console.log("/Store/ -node ", _meta );

                Store.props.numNodes ++;
                Constants.methods.dispatchCoreEvent( Constants.core_events[ "Sg_STORE_MUTATION" ], { numNodes : Store.props.numNodes } );
            },

            route : function( _name, _vo ){

                Store.model.routes[ _name ] = _vo;
                //console.log("/Store/ -route ", getRoute().byName( _name ));
            },

            // *** NOTE just an idea to have a place to store action names
            userAction : function ( _name ) {

                Store.model.userActions[ _name ] = _name;
                //console.log("/Store/ ADD -userAction ", _name, Store.model.userActions );
            }
        }
    },

// *** TODO refactor to merge in clean way with 'Store.get()'
    getRoute : function(){

        return{

            // *** updated 17.05.16. TODO only accounting for single query and not following my previous scheme
            byName : function( _name ){

                var n = _name.split( ":" ), // *** NOTE allow passing parameter and it not croaking
                    r = Store.model.routes[ n[ 0 ] ] || null;

                if( r ){
                    r.options.query = n[ 1 ]; // *** NOTE add query if passed to options object
                }

                // return Store.model.routes[ n[ 0 ] ] || null;
                return r;
            },

            // *** new method to avoid having to set 'name' to default
            byDefault : function () {

                var r = _.find( Store.model.routes, function( _v ){

                    if( _v.options[ "default" ] && _v.options[ "default" ] === true ){
                        return _v
                    }
                });

                // *** if no default set, fallback to using first declared route as default and return it
                if( !r ){
                    let forcedDefault = Store.model.routes[ Object.keys( Store.model.routes )[ 0 ]];
                    forcedDefault.options.default = true;
                    console.warn("/Store/ -byDefault --forcing first route (" + forcedDefault.options.name + ") to be the default route" );
                    r = forcedDefault;
                }

                return r
            },

            byCustomUrl : function( _url ){

                //console.log("/Store/ -byCustomUrl ***", _url, "<", _url.length, !!_url.length );

                if( _url !== "" ){ // *** NOTE "" != undefined ffs!

                    var r = _.find( Store.model.routes, function( _v ){
                        return ( _v.options.url === _url );
                    });
                }

                //console.log("/Store/ -byCustomUrl ", r );

                return r || null;
            }
        }
    },


    /**
     *
     */
    get : function( _uid ){

        var byUid = function( _directUid ){
            return Store.model.metas[ _uid || _directUid ] || null;
        };

        var cache = {
            meta : byUid(),
            paths : {
                nodes : null,
                uids : null,
                uri : null, // *** e.g. 'mediator@0/node_1_1@1'
                slugs : null
            }
        };

        return{

            root : function( _id ){

                var numRoots = Store.model.rootNodes_$.length,
                    r = null;

                if( _.isNumber( _id )){
                    r = Store.model.rootNodes_$[ _id ];
                }

                if( _.isString( _id ) ){
                    r = byUid( _id );
                }

                if( numRoots === 1 ){
                    r = Store.model.rootNodes_$[ 0 ];
                }

                //console.log("/Store/ -root ", r );

                return r || null;
            },

            /**
             * get node by index, uid, slug or name
             * @param _id
             * @returns {*}
             */
            node : function( _id ){

                var r = null;

                if( _.isNumber( _id )){
                    r = Store.props.metasAsArray[ _id ]; // OPTIMISE
                }

                if( _.isString( _id ) ){

                    r = Store.model.metas[ _id ] || null; // *** first look for uid

                    if( !r ){
                        r = iterate( "slug" );
                    }


                    if( !r ){
                        r = iterate( "name" );
                    }
                }

                function iterate( _key ){

                    // console.log("/Store/ -iterate ", _key );

                    var r = null;

                    var r_$ = _.filter( Store.model.metas, function( _n ){
                        // console.log("/Store/ - GET?", _id );
                        return _id === _n[ _key ];
                    } );

                    // console.log("/Store/ -iterate *****", r_$.length );

                    // TODO this isn't great...
                    if( r_$.length === 1 ){
                        r = r_$[ 0 ]
                    } else if( r_$.length >= 2 ) {
                        error( "Found " + r_$.length + " '" + _id + "' " + "by key '" + _key + "'", r_$ );
                    } else {
                        // error( "Can't fucking find '" + _id + "'", "" );
                        // console.log("/Store/ -iterate SEARCH BY NAME?");

                        // *** NOTE should have found by name by this point
                    }

                    return r;
                }

                function error( _msg, _data ){
                    console.warn("/Store/ -error GET", _msg, _data );
                }

                //console.log("/Store/ -node RESULT", r );

                return r;
            },



            byUid : byUid,

            nodeByIndex : function( _index ){ // TODO rename to 'byIndex'
                var m = _.values( Store.model.metas ); // OPTIMISE
                return m[ _index ];
            },

            bySlug : function( _slug ){

                var r = _.filter( Store.model.metas, function( _v ){
                    return _slug === _v.slug;
                } );

                return r || null
            },

            /**
             *
             * @param _parentUid : String = uid // TODO also by slug? might be a bit tricky
             * @param _childIdentifier : String = uid or slug
             * @returns Object || null = child object { uid : xxx, slug : xxx }
             */
            hasChild : function( _parentUid, _childIdentifier ){

                var p = byUid( _parentUid ),
                    r = {};

                //////console.log("/Store/ -hasChild ", p.uid, _childIdentifier );

                if( p && p.children ){
                    //////console.log("/Store/ -hasChild EXISTS, HAS CHILDREN", p.children );

                    r = _.find( p.children, function( _c ){
                        return ( _c.uid === _childIdentifier ) || ( _c.slug === _childIdentifier );
                    } );

                    if( r ){
                        r.parentDepth = p.depth;
                    }
                }

                return r || { uid : null, slug : null, depth : null, parentDepth : null };
            },

            nodes : function(_directMeta ){

                var m = ( _directMeta ) ? _directMeta : cache.meta;

                if( !m ){ return null }
                var rawPath_$ = [],
                    uidPath_$ = [],
                    uriPathString = "",
                    slugs = "";

                traverse( m );

                function traverse( p ){

                    rawPath_$.push( p );
                    uidPath_$.push( p.uid );

                    if( p.parentUid ){ traverse( Store.model.metas[ p.parentUid ] ) }
                }

                cache.paths.nodes = rawPath_$.reverse();
                cache.paths.uids = uidPath_$.reverse();

                _.each( rawPath_$, function( _m ){
                    uriPathString += _m.uid + "/";
                    slugs += _m.slug + "/";
                });

                cache.paths.uri = uriPathString.substring( 0, uriPathString.length - 1 );
                cache.paths.slugs = slugs.substring( 0, slugs.length - 1 );
                //Store.model.basePathData[ m.uid ] = cache.paths; // TEST

                return cache.paths
            },

            userAction : function ( _name ) {
                //console.log("/Store/ GET -userAction ", _name );

                return Store.model.userActions;
            }
        };
    },

    log : function(){

        return{
            all : function(){
                console.warn("\n/Store/ log -all", /*Store.model.metas,*/ Store.model, "\n" );
            },
            meta : function( _uid ){
                //console.log("/Store/ log -meta ", Store.get().byUid( _uid ) );
            },
            paths : function(){
                //console.log("/Store/ -paths ", Store.model.basePathData );
            }
        }
    }

};


export default {
    props : Store.props,
    add : Store.add,
    get : Store.get,
    getRoute : Store.getRoute,
    log : Store.log
}


