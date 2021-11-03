"use strict";

/**
 * Zimbabalim
 * 26/08/2016
 */

import signals from "signals";
import SimpleSv from "service/SimpleSv";


let UserSwatchesToDbSv = {

    events : {
        Sg_SERVICE_RESPONSE: new signals.Signal()
    },

    props : {
        initialPopulation : "./api/cms/users/initial-population",
        writeSwatches : "./api/cms/users/write-swatches",
        writeRichSwatches : "./api/cms/users/write-rich-swatches"
    },

    call : function( _action, _data ){

        //////console.log26.("/UserSwatchesToDbSv/ -call ", _action, _data );

        var url,
            sv = new SimpleSv();

        switch( _action ){

            case "initial-population":
                url = UserSwatchesToDbSv.props.initialPopulation;
                break;

            case "write-swatches":
                url = UserSwatchesToDbSv.props.writeSwatches;
                break;
    
            case "write-rich-swatches":
                url = UserSwatchesToDbSv.props.writeRichSwatches;
                break;
        }

        //////console.log26.("/UserSwatchesToDbSv/ -call URL", url );

        sv.events.Sg_SERVICE_RESPONSE.add( onData );

        sv.call( {
            url : url,
            data : _data
        });

        //////console.log26.26.("/UserSwatchesToDbSv/ -call ", _data );

        function onData( _data ){

            ////console.log26.26.("/UserSwatchesToDbSv/ -onData RECEIVED", _data);

            let status = "fail";

            if( _data.success ){
                ////////console.log26.26.("/UserSwatchesToDbSv/ -onData ", _data.data );
                status = "ok";

            } else {
                console.warn("/UserSwatchesToDbSv/ -onData ***NO DATA***");
            }

            UserSwatchesToDbSv.events.Sg_SERVICE_RESPONSE.dispatch({
                action : "Sg_SERVICE_RESPONSE",
                status : status,
                data : _data.data || null
            });
        }
    },
};

export default {
    events : UserSwatchesToDbSv.events,
    call : UserSwatchesToDbSv.call
}
