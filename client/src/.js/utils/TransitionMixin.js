"use strict";

/**
 * Zimbabalim
 * 19/05/2016
 */

import TweenMax from "gsap";

export default function TransitionMixin(){

    let els = {
        el : null
    };

    let props = {
        id : null,
        animation : {
            showTime : 0.3,
            hideTime : 0.2,
            showDelay : 0.4,
            hideDelay : 0,
            showEase : Expo.easeOut,
            hideEase : Sine.easeOut,
            minScale : 1
        }
    };


    const init = ( _options ) =>{
        // console.log("/TransitionMixin/ -init ", _options );

        els.el = _options.el;
        props.id = _options.id;
    };

    const showHide = ( _f ) =>{

        // console.log("/TransitionMixin/ -showHide ", _f );

        //( _f ) ? el.classList.add( "is-active" ) : el.classList.remove( "is-active" ); // *** native // RESTORE

        if( _f ){

            TweenMax.to( els.el, props.animation.showTime,
                {
                    scale : 1,
                    opacity : 1,
                    delay : props.animation.showDelay,
                    ease : props.animation.showEase,
                    onStart : function () {
                        // console.log("/TransitionMixin/ -onStart ", props.id );
                        els.el.classList.add( "is-active" )
                    }
                } );
        } else {

            TweenMax.to( els.el, props.animation.hideTime,
                {
                    scale : props.animation.minScale,
                    opacity : 0,
                    delay : props.animation.hideDelay,
                    ease : props.animation.hideEase,
                    overwrite : true,
                    onComplete : function () {
                        // console.log("/TransitionMixin/ -onComplete ", props.id );
                        els.el.classList.remove( "is-active" )
                    }
                } );
        }

    };

    return {
        props : props,
        init : init,
        showHide : showHide
    }
}