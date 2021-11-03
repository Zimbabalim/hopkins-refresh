"use strict";

/**
 * Zimbabalim
 * 05/05/2016
 */

import datasetShim from "../.libs/dataset-shim.js" // *** non-npm libs here

import _ from "lodash"; // *** seems this will attach globally so we don't need to import it again..?
import signals from "signals";
import Bootstrap from "Bootstrap";
import Mediator from "Mediator";

import zz from "core/zz";


export default function Context(){

    const bootstrap = new Bootstrap();

    const init = function(){

        console.log("release: 14.12.20");

        bootstrap.events.Sg_READY.addOnce( startup );
        bootstrap.init();
    };

    const startup = function (){
        let mediator = new zz.Node( null, Mediator, { name : "mediator" });
        mediator.init();
    };

    return {
        init : init
    }
}
