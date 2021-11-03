/**
 * Zimbabalim
 */
"use strict";

define([ "signals", "Store" ],
    function( signals, Store ){

        var props = {
            urlSymbols : {
                query : ":",
                equals : "=",
                and : "&",
                belongs : ";"
            }
        };


        // DEPRECATED?
        var encodeUri = function( _path ){
            var a = _.map( _path, "uid");
            return a.join("/");
        };

        /**
         * traverse uri path (string representation e.g. 'mediator@0/node_1_0@25/node_2_0@26') and return node.meta objects in array
         * @param _path
         * @returns {Array.<T>}
         */
        var decodeUri = function( _path ){

            _path = trimSlashes( _path ); // *** remove leading and trailing slashes

            var a_$ = _path.split("/"),
                l = a_$.length,
                r_$ = [];

            while( l-- ){
                r_$.push( wrapNodeUidAsVO( a_$[ l ] ) );
            }

            return r_$.reverse(); // TODO bit silly to keep reversing these arrays..?
        };


        // TODO check if object exists before creating a new one?
        var wrapNodeUidAsVO = function( _uid, _data ){

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
        };


        // *** TODO refactor to something like this pattern
        /*var queryTools = function(){


            return{
                encodeSlugs : function( _nodepath ){

                },

                decodeSlugs : function( _slugstring ){

                }
            }

        };*/



        var encodeSlugPath = function( _path ){

            var pathByUid = _.map( _path, "uid"),
                raw_$ = [],
                slugs = null;

            _.each( pathByUid, function( _a ){ // OPTIMISE
                raw_$.push( Store.get().byUid( _a ) );
            });

            slugs = _.map( raw_$, "slug");

            return slugs.join("/");
        };


        var mergeQueryData = function( _originalPath, _queries ){

            _.each( _queries, function( _v, _idx ){

                if( _v ){
                    _originalPath[ _idx].data = _v;
                }
            });

            return _originalPath;
        };


        var conditionSlugPath = function( _slugPath ){

            var symb = props.urlSymbols,
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
        };



        /*var processed = conditionSlugPath( _slugPath),
            a_$ = processed.clean,
            rootNode = Store.get().bySlug( a_$.shift() )[ 0 ],
            root = ( !!rootNode ) ? rootNode.uid : null,
            results_$ = [],
            successfulParents_$ = [],
            targetLength = a_$.length + 1,
            numFound = 0,
            wrapped_$ = [];*/


        // TODO refactor!!!
        // TODO catch fucked up paths!
        // TODO warn for non-contigious paths!!!!
        // TODO check for XSS
        var decodeSlugPath = function( _slugPath ){

            _slugPath = trimSlashes( _slugPath );

            var processed = conditionSlugPath( _slugPath),
                a_$ = processed.clean,
                rootNode = Store.get().bySlug( a_$.shift() )[ 0 ],
                root = ( !!rootNode ) ? rootNode.uid : null,
                results_$ = [],
                successfulParents_$ = [],
                targetLength = a_$.length + 1,
                numFound = 0,
                wrapped_$ = [];

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
            } else {
                console.warn( r.length + "/" + targetLength, "failure");
                // TODO do something else here!!!
                // TODO could detect where new path began (depth changes) and render part that works or do a 404 error?!!!
            }

            // OPTIMISE
            for( var i = 0; i < r.length; i ++ ){
                wrapped_$.push(
                    wrapNodeUidAsVO( Store.get().byUid( r[ i ] ), processed.queries[ i ] )
                );
            }

            return wrapped_$;
            //return r;
        };



        var trimSlashes = function( _s ){
            return _s.replace(/^\/+|\/+$/g, "");
        };


        // TODO refactor this
        var afterFirst = function(p_string, p_char) {
            if (p_string == null) { return ''; }
            var idx = p_string.indexOf(p_char);
            if (idx == -1) { return ''; }
            idx += p_char.length;
            return p_string.substr(idx);
        };

        return {
            decodeUri : decodeUri,
            encodeUri : encodeUri,
            wrapNodeUidAsVO : wrapNodeUidAsVO,

            conditionSlugPath : conditionSlugPath,
            mergeQueryData : mergeQueryData,

            encodeSlugPath : encodeSlugPath,
            decodeSlugPath : decodeSlugPath,

            trimSlashes : trimSlashes,
            afterFirst : afterFirst
        }

    } );