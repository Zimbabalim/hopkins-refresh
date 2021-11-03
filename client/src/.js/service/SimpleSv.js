"use strict";

/**
 * Zimbabalim
 * 09/05/2016
 */

import signals from "signals";

export default function SimpleSv(){

    // *** FIXIT change this to ditch jquery

        var events = {
            Sg_SERVICE_RESPONSE : new signals.Signal()
        };

        var call = function( _props ){

            var vo = {

                method : _props.method || "GET",
                url : _props.url,
                data : _props.data || "",
                dataType : _props.dataType || "json"
            };

            // console.log("/simplesv/ -call", vo );

            $.ajax({
                type : vo.method,
                url : vo.url,
                data : vo.data,
                dataType : vo.dataType,

                success : function( _r ) {
                    onResult( true, _r );
                },

                error : function( _error ) {
                    ////console.log("/SimpleSv/ -error ", _error );
                    onResult( false, _error );
                }
            });


            function onResult( _isSuccess, _data ){

                // console.log("/simplesv/ -onresult", _isSuccess, _data );

                _data = ( _isSuccess ) ? _data : null;

                events.Sg_SERVICE_RESPONSE.dispatch({
                    success : _isSuccess,
                    data : _data
                });
            }
        };

        return {
            events : events,
            call : call
        }


}