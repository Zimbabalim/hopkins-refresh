"use strict";

/**
 * Zimbabalim
 * 31/08/2016
 */

import signals from "signals";
import SimpleSv from "service/SimpleSv";


let SundriesSv = {

    events : {
        Sg_SERVICE_RESPONSE: new signals.Signal()
    },

    props : {
        getAll : "./api/cms/sundries/get-all",
    },

    call : function( _action, _data ){

        //console.log("/SundriesSv/ -call ", _action, _data );

        var url,
            sv = new SimpleSv();

        switch( _action ){

            case "get-all":
                url = SundriesSv.props.getAll;
                break;
        }

        //console.log("/SundriesSv/ -call URL", url );

        sv.events.Sg_SERVICE_RESPONSE.add( onData );

        sv.call( {
            url : url,
            data : _data
        });

        function onData( _data ){

            //console.log("/SundriesSv/ -onData RECEIVED");

            let status = "fail",
                d = null;

            if( _data.success ){

                _data.data.reverse();
                status = "ok";

            } else {
                console.warn("/SundriesSv/ -onData ***NO DATA***");
            }

            SundriesSv.events.Sg_SERVICE_RESPONSE.dispatch({
                action : "Sg_SERVICE_RESPONSE",
                status : status,
                data : _data.data || null
            });
        }
    }
};

export default {
    events : SundriesSv.events,
    call : SundriesSv.call
}
