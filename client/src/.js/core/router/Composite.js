/**
 * Zimbabalim
 */
"use strict";

define([ "signals", "Utils" ],
    function( signals, Utils ){

        function Composite( _options, _callback ){


            var data = {
                options : _options || null,
                url : null
            };


            var props = {
                capture_$ : [],
                pool_$ : []
            };


            var update = function(){

                var m = _.map( props.capture_$, "path" );
                var f = _.flatten( m );
                var u = _.uniq( f, "uid" );

                data.path = u;
                data.url = Utils.encodeSlugPath( u );

                //console.log("/Composite/ -update ", data );
            };


            return {

                data : data, // *** export data here to make available for composite route use

                add : function( _targetRoute ){

                    //console.log("/Composite/ -add ", _targetRoute.data );
                    
                    props.capture_$.push( _targetRoute.data );
                    update();
                    return this
                },

                go : function(){

                    //console.log("/Composite/ -go ");
                    
                    _callback({
                        action : "on-composite-go",
                        data : {
                            options : _options,
                            path : data.path,
                            url : data.url
                            //custom_url : // TODO
                        }
                    });

                    return this
                }
            };
        }

        return Composite

    } );