"use strict";

/**
 * Zimbabalim
 * 19/05/2016
 */

import Globals from "Globals";
import enquire from "enquire.js";


let BreakpointEnquire = {


    init : function () {

        const els = {
            el :  document.documentElement // html
        };

        /*const props = {
         maximum : "screen and (min-width:980px)",
         large : "screen and (max-width: 979px) and (min-width: 768px)",
         medium : "screen and (max-width: 767px) and (min-width: 550px)",
         small : "screen and (max-width: 549px) and (min-width: 420px)",
         minimum : "screen and (max-width: 419px)"
         };*/

        /*const props = {
            maximum : "screen and (min-width:980px)",
            large : "screen and (max-width: 979px) and (min-width: 825px)",
            medium : "screen and (max-width: 824px) and (min-width: 550px)",
            small : "screen and (max-width: 549px) and (min-width: 420px)",
            minimum : "screen and (max-width: 419px)"
        };*/

        const props = {
            maximum : "screen and (min-width:980px)",
            large : "screen and (max-width: 979px) and (min-width: 825px)",
            medium : "screen and (max-width: 824px) and (min-width: 660px)",
            small : "screen and (max-width: 659px) and (min-width: 420px)",
            minimum : "screen and (max-width: 419px)"
        };


        enquire.register( props.maximum, {
            match : function() {
                addRemoveClass( "_maximum_", true );
            },
            unmatch : function() {
                addRemoveClass( "_maximum_", false );
            }
        });

        enquire.register( props.large, {
            match : function() {
                addRemoveClass( "_large_", true );
            },
            unmatch : function() {
                addRemoveClass( "_large_", false );
            }
        });

        enquire.register( props.medium, {
            match : function() {
                addRemoveClass( "_medium_", true );
            },
            unmatch : function() {
                addRemoveClass( "_medium_", false );
            }
        });

        enquire.register( props.small, {
            match : function() {
                addRemoveClass( "_small_", true );
            },
            unmatch : function() {
                addRemoveClass( "_small_", false );
            }
        });

        enquire.register( props.minimum, {
            match : function() {
                addRemoveClass( "_minimum_", true );
            },
            unmatch : function() {
                addRemoveClass( "_minimum_", false );
            }
        });


        function addRemoveClass( _name, _f ) {

            if( _f ){
                Globals.viewport.currentBreakpoint = _name;

                if( _name === "_minimum_" || _name === "_small_" ){
                    Globals.viewport.isMobile = true;
                    els.el.classList.add( "_is-mobile_" );
                } else {
                    Globals.viewport.isMobile = false;
                    els.el.classList.remove( "_is-mobile_" )
                }

                els.el.classList.add( _name );

            } else {
                els.el.classList.remove( _name )
            }
        }

    }

};

export default BreakpointEnquire;