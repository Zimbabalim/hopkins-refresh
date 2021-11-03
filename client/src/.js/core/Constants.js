/**
 * Zimbabalim
 */
"use strict";

//"signals"

import signals from "signals";

let Constants = {

    client : {
        location : window.history.location || window.location,
        root_directory : "/"//"/dev/_centrepede/REZZICA/framework/v4/dist/"
        //historyEmulatation : history.emulate
    },

    core_events : {

        Sg_ROUTER_SHOW : {
            event : new signals.Signal,
            action : "Sg_ROUTER_SHOW", data : null,
            meta : {
                access : "public"
            }
        },

        Sg_ROUTER_HIDE : {
            event : new signals.Signal,
            action : "Sg_ROUTER_HIDE", data : null,
            meta : {
                access : "public"
            }
        },

        Sg_STORE_MUTATION : {
            event : new signals.Signal,
            action : "Sg_STORE_MUTATION", data : null,
            meta : {
                access : "private"
            }
        }
    },

    methods : {

        dispatchCoreEvent : function( _event, _data ){

            var sg = _event.event;

            sg.dispatch({
                action : _event.action,
                data : _data || _event.data,
                meta : _event.meta
            });
        }
    },

    log : function(){

        return{
            all : function (){
                //console.log("/Constants/ -all ", client );
            }
        }
    }

};

export default {
    client : Constants.client,
    core_events : Constants.core_events,
    methods : Constants.methods,
    log : Constants.log
}
