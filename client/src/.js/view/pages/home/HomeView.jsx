"use strict";

/**
 * Zimbabalim
 * 10/05/2016
 */

import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";

import Model from "model/Model";


export default function HomeView( api ) {

    let events = {

    };

    let els = {
        el : null,
        reactEl : null
    };

    let props = {
        data : null,
        transitionMixin : null
    };

    let uis = {
        component : null
    };

    let _react = {
        component : null
    };

    const init = function ( _config ) {

        els.el = _config.el;
        
        // ////console.log("/HomeView/ -init ", _config.mixins );

        props.transitionMixin = _config.mixins[ 0 ];
        props.transitionMixin.init( { id : api.info.name, el : els.el } );
        // ////console.log("/HomeView/ -init ", props.transitionMixin );

        create();
        ( _config.render ) ? render() : null;
    };

    const create = function () {
        
        _react.component = React.createClass({

            getInitialState : function () {
                return null
            },

            componentDidMount : function () {
                els.reactEl = ReactDOM.findDOMNode( this );

            },

            update : function () {

            },

            render : function () {

                let imagePath = Globals.paths.shell_images + "home-page-image.png";

                return (
                    <div>
                        <div className="centred-wrapper">
                            <img src={ imagePath } alt="hopkins homepage image"/>
                            <p>TRADE ONLY</p>
                        </div>



                    </div>
                )
            }

        })
    };

    const render = function () {

        uis.component = ReactDOM.render(
            React.createElement( _react.component ), els.el
        );

    };

    const update = function () {

    };

    const actionRunner = function( _action, _data ){
        // ////console.log("/HomeView/ -actionRunner ", _action, _data );

        switch( _action ){

            /*case "Sg_ROUTER_SHOW":
                // ////console.log("/HomeView/ -actionRunner ???", _action, _data.options.query );
                break;*/

            case "show":
                props.transitionMixin.showHide( true );
                break;

            case "hide":
                props.transitionMixin.showHide( false );
                break;

        }
    };

    return{
        els : els,
        init : init,
        actionRunner : actionRunner
    }
}