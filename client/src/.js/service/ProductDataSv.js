"use strict";

/**
 * Zimbabalim
 * 12/05/2016
 */

import signals from "signals";
import SimpleSv from "service/SimpleSv";


let ProductDataSv = {

    events : {
        Sg_SERVICE_RESPONSE: new signals.Signal()
    },

    props : {
        url : "json/product-data.json"
    },

    call : function(){

        var url = ProductDataSv.props.url,
            sv = new SimpleSv();

        // console.warn("/ProductDataSv/ -loadJson ", ProductDataSv.props.url, sv );

        sv.events.Sg_SERVICE_RESPONSE.add( onData );
        sv.call( { url : url });

        function onData( _data ){

            if( _data.success ){

                ProductDataSv.formatData( _data.data );

            } else {
                // TODO error view?
                console.warn("/ProductDataSv/ -onData ***NO DATA***");

                ProductDataSv.events.Sg_SERVICE_RESPONSE.dispatch({
                    action : "Sg_SERVICE_RESPONSE",
                    status : "fucked",
                    data : null
                });
            }


        }
    },

    formatData : function ( _data ) {

        // *** This works for original test, but we want to do this in model/Products now
        /*let r = [];

        _.map( _data, function ( _v, _key ) {
            _.map( _v, function ( _vv, _key ) {
                _.filter( _vv, function ( _vvv, _key ) {
                    r.push( _vvv.variations );
                } );
            });
        });

        r = _.flatten( r );*/

        ProductDataSv.events.Sg_SERVICE_RESPONSE.dispatch({
            action : "Sg_SERVICE_RESPONSE",
            status : "ok",
            data : _data
        });
    }
};

export default {
    events : ProductDataSv.events,
    call : ProductDataSv.call
}
