"use strict";

/**
 * Zimbabalim
 * 09/05/2016
 */


import zz from "core/zz";
import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";

import Model from "model/Model";


export default function MainNavUI( api ) {

    let events = {

    };

    let els = {
        el : null // *** raw dom element
    };

    let props = {
        data : null
    };

    let uis = {
        component : null
    };

    let _react = {
        component : null
    };

    const init = function ( _config ) {

        props.data = Model.getVObyKey( "nav_items" );

        els.el = _config.el;
        create();
        ( _config.render ) ? render() : null;
    };


    const create = function () {

        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    currSelected : null
                }
            },

            componentDidMount : function () {

            },

            update : function ( _name ) {

                // //////console.log("/MainNavUI/ -update ", _name );

                this.setState({ currSelected : _name }, function () {
                });
            },

            onClicked : function ( e ) {

                actionRunner( "on-clicked", {
                    link : e.target.dataset.link
                });
            },

            render : function () {

                const create = ( _item ) => {
                    return <li key={ _item.uri }
                               onClick={ this.onClicked }
                               data-link={ _item.uri }
                               className={ ( this.state.currSelected === _item.label ) ? "is-active" : "" }>
                        { _item.label }
                    </li>
                };

                return (
                    <ul>{ props.data.map( create ) }</ul>
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

        switch( _action ){

            case "Sg_ROUTER_SHOW":

                let name = _data.name;

                if( _data.name === "catalogue" ){
                    //////console.log("/MainNavUI/ -actionRunner SPECIAL", _data.options.query );

                    name = _data.options.query;
                }

                uis.component.update( name );


                break;

            case "on-clicked":

                ////console.log("/MainNavUI/ -actionRunner ", _data.link );

                api.dispatchRequest({
                    action : "on-navigation-request",
                    data : {
                        caller : api.info.name,
                        target : zz.store.getRoute().byName( _data.link )
                    }
                });


                break;

        }

    };

    return{
        els : els,
        init : init,
        actionRunner : actionRunner
    }
}
