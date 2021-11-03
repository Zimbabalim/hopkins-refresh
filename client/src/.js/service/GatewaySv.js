"use strict";

/**
 * Zimbabalim
 * 26/08/2016
 */

import signals from "signals";
import SimpleSv from "service/SimpleSv";


let GatewaySv = {

    events : {
        Sg_SERVICE_RESPONSE: new signals.Signal()
    },

    props : {
        validateLogin : "./api/gateway/validate-login"
        //checkAlreadyRegistered : "./api/gateway/check-already-registered"
    },

    call : function( _action, _data ){

        //console.log("/GatewaySv/ -call ", _action, _data );

        var url,
            sv = new SimpleSv();

        switch( _action ){

            case "validate-login":
                url = GatewaySv.props.validateLogin;
                break;

            /*case "check-already-registered":
                url = GatewaySv.props.checkAlreadyRegistered;
                break;*/
        }

        //console.log("/GatewaySv/ -call URL", url );

        sv.events.Sg_SERVICE_RESPONSE.add( onData );

        sv.call( {
            url : url,
            data : _data
        });

        function onData( _data ){

            //console.log("/GatewaySv/ -onData RECEIVED");

            let status = "fail";

            if( _data.success ){
                //console.log("/GatewaySv/ -onData ", _data.data );
                status = "ok";

            } else {
                console.warn("/GatewaySv/ -onData ***NO DATA***");
            }

            GatewaySv.events.Sg_SERVICE_RESPONSE.dispatch({
                action : "Sg_SERVICE_RESPONSE",
                status : status,
                data : _data.data || null
            });
        }
    },
};

export default {
    events : GatewaySv.events,
    call : GatewaySv.call
}
