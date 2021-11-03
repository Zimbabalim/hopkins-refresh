"use strict";

/**
 * Zimbabalim
 * 19/05/2016
 */

/**
 * utility to return rectangle from provided element once rect has value
 * @returns {{watch: watch}}
 * @constructor
 */
export default function MutationObserver(){

    let els = {
        el : null
    };

    let props = {
      rect : null
    };

    const watch = function( _el, _fn ){

        els.el = _el;

        // console.log("/MutationObserver/ -watch ", els.el );

        let timer = window.setInterval( function () {

            props.rect = els.el.getBoundingClientRect();

            if( (props.rect.height + props.rect.width + props.rect.left) > 0 ){
                window.clearInterval( timer );

                _fn( props.rect );
                props.rect = null;
            }

        }, 16 )

    };

    return {
        watch : watch
    }
}
