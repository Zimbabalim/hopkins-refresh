/**
 * Zimbabalim
 */
"use strict";

import Store from "core/Store";

let Utils = {

    props : {
        urlSymbols : {
            query : ":",
            equals : "=",
            and : "&",
            belongs : ";"
        }
    },
    
    
    trimSlashes : function( _str ){

        //console.log("/Utils/ -trimSlashes ", _str );

        this.result = _str.replace(/^\/+|\/+$/g, "");
        return this;
    },

    toArray : function( _str, _delimiter ){


        if( _.isObject( _str ) ){
            return this;
        }

        _str = ( _str ) ? _str : this.result;
        _delimiter = ( _delimiter ) ? _delimiter : "/";
        this.result = _str.split( _delimiter );

        //console.log("/Utils/ -toArray ", this.result );

        return this;
    },

    toTrimmedArray : function( _str ){
        return this.trimSlashes( _str ).toArray();
    },

    /*crossReferenceArrays : function( _request_$, _pool_$, _key ){ // *** TODO add ability to get by index

     _key = ( _key ) ? _key : "uid";


     if( !_request_$ ){
     return null
     }

     var l = _request_$.length,
     temp = [];

     while( l-- ){
     var r = _.find( _pool_$, function( _v ){

     //console.log("/Utils/ - ", _v[ _key ]  );

     if( _v[ _key ] === _request_$[ l ] ){
     temp.push( _v );
     }
     });
     }

     return  _.sortBy( temp, _key ); // TODO ensure sorted by "@n."
     },*/

    extractQueryString : function( _s ){

        var symb = Utils.props.urlSymbols,
            query_$ = null,
            q = _s.split( symb.query),
            o = q[ 0 ];

        if( q.length > 1 ) {

            query_$ = [];

            var qq = q[ 1 ].split( symb.and );

            var create = function( _q ){

                var vo = {};

                _.each(_q, function (_qq) {
                    var v = _qq.split(symb.equals);
                    vo[v[0]] = v[1];
                });

                query_$.push(vo);
            };

            _.each(qq, function (_q) {
                var qqq = _q.split(symb.belongs);
                create(qqq);
            });
        }

        return{
            clean : o,
            data : query_$
        }
    },


    iterate : function( _array, _method ){

        var r_$ = [];

        _.each( _array, function( _v ){
            r_$.push( _method( _v ) );
        });

        return r_$;
    },


    // TODO improve this to transform/apply an object
    createRouteVO : function( _id ){

        if(_.isObject( _id )){ return null }

        var r = {},
            t = Store.get().node( _id );

        r.depth = t.depth;
        r.name = t.name;
        r.slug = t.slug;
        r.uid = t.uid;
        r.data = null;

        return r || null
    },


    encodeSlugPath : function( _path ){

        var pathByUid = _.map( _path, "uid" ),
            raw_$ = [],
            slugs = [];

        _.each( pathByUid, function( _a ){ // OPTIMISE
            raw_$.push( Store.get().byUid( _a ) );
        });

        slugs = _.map( raw_$, "slug" );

        return slugs.join( "/" );
    },

    // ****************************

    conditionSlugPath : function( _slugPath ){

        var symb = Utils.props.urlSymbols,
            a_$ = _slugPath.split( "/"),
            queries_$ = [],
            clean_$ = [],
            hasData = false;

        _.each( a_$, function( _s ){

            if( !!~_s.indexOf( symb.query ) ){
                extractQuery( _s );
                hasData = true;
            } else {
                clean_$.push( _s );
                queries_$.push( null );
            }
        } );

        function extractQuery( _s ){

            var query_$ = [];

            var q = _s.split( symb.query );

            clean_$.push( q[ 0 ] );

            var qq = q[ 1 ].split( symb.and );

            _.each( qq, function( _q ){
                var qqq = _q.split( symb.belongs );
                create( qqq );
            });

            function create( _q ){

                var vo = {};

                _.each( _q, function( _qq ){
                    var v =_qq.split( symb.equals );
                    vo[ v[ 0 ] ] = v[ 1 ];
                } );

                query_$.push( vo );
            }

            queries_$.push( query_$ );
        }


        return{
            hasData : hasData,
            clean : clean_$,
            queries : queries_$
        }
    },



    // ****************************

    decodeSlugPath : function( _slugPath ){

        _slugPath = this.trimSlashes( _slugPath).result;

        var processed = this.conditionSlugPath( _slugPath),
            a_$ = processed.clean,
            rootNode = Store.get().bySlug( a_$.shift() )[ 0 ],
            root = ( !!rootNode ) ? rootNode.uid : null,
            results_$ = [],
            successfulParents_$ = [],
            targetLength = a_$.length + 1,
            numFound = 0,
            wrapped_$ = [],
            status = "fail";

        //console.log("/Utils/ -decodeSlugPath ROOT? ***", processed );

        //console.log("/Utils/ -decodeSlugPath ", a_$ );

        if( !root ){
            return; // *** quit
        }

        find( root, a_$.shift() );

        function find( _parent, _child ){

            s1();

            function s1(){ // *** strategy 1 - find child in parent

                if( !_child ){
                    return; // *** quit
                }

                var c = Store.get().hasChild( _parent, _child );

                if( c.uid ){
                    successfulParents_$.push( _parent );
                    add( "s1", c );
                } else {
                    error( "s1", _child );
                    s2();
                }
            }

            function s2(){ // *** strategy 2 - look back into last good parent

                var c = Store.get().hasChild( successfulParents_$[ successfulParents_$.length - 1], _child );

                if( c.uid ){
                    add( "s2", c );
                } else {
                    error( "s2", _child );
                    s3();
                }
            }

            function s3(){ // *** strategy 3 - look into all parents

                for( var i = 0; i < successfulParents_$.length; i ++ ){

                    var p = successfulParents_$[ i],
                        c = Store.get().hasChild( p, _child );

                    if( c.uid ){
                        add( "s3", c );
                        break;
                    } else {
                        error( "s3", _child );
                    }
                }
            }

            function add( _phase, _item ){
                numFound ++;
                find( _item.uid, a_$.shift() );
                results_$.push( _item );
            }

            function error( _phase, _item ){
                //
            }
        }

        var r = _.map( results_$.reverse(), "uid" );
        r.unshift( root ); // *** add root uid to top of a_$

        //console.log("/Utils/ -decodeSlugPath **********", r );

        if( targetLength === r.length ){
            console.warn( r.length + "/" + targetLength, "success");
            status = "ok";
        } else {
            console.warn( r.length + "/" + targetLength, "***ERROR***");
            status = "fail";
            // TODO do something else here!!!
            // TODO could detect where new path began (depth changes) and render part that works or do a 404 error?!!!
        }

        // OPTIMISE
        for( var i = 0; i < r.length; i ++ ){
            wrapped_$.push(
                this.wrapNodeUidAsVO( Store.get().byUid( r[ i ] ), processed.queries[ i ] )
            );
        }

        //return r;
        //return wrapped_$;

        return{
            status : status,
            result : wrapped_$
        }
    },

    wrapNodeUidAsVO : function( _uid, _data ){

        var uid = null,
            slug = null;

        if(_.isObject( _uid )){
            uid = _uid.uid;
            slug = _uid[ "slug" ];
        } else {
            uid = _uid;
        }

        if( !slug ){
            slug = Store.get().byUid( uid ).slug;
        }

        return {
            uid : uid,
            slug : slug,
            data : _data || null
        }
    }

};

export default Utils;
