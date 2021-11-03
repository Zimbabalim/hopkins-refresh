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


export default function FooterUI( api ) {

    let events = {

    };

    let els = {
        el : null // *** raw dom element
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

        props.transitionMixin = _config.mixins[ 0 ];
        props.transitionMixin.init( { id : api.info.name, el : els.el } );

        // props.transitionMixin.props.animation.showDelay *= 1.1;
        props.transitionMixin.props.animation.showTime /= 1.5;
        props.transitionMixin.props.animation.showEase = Sine.easeOut;

        props.data = Model.getVObyKey( "nav_items", true );

        // *** add element TODO describe this in config.json
        /*props.data.push({
         "label" : "my swatches",
         "uri" : "/my-swatches"
         });*/


        els.el = _config.el;
        create();
        ( _config.render ) ? render() : null;
    };

    const create = function () {

        let i = 0;

        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    currSelected : null
                }
            },

            componentDidMount : function () {

            },

            update : function ( _name ) {

                this.setState({ currSelected : _name }, function () {
                });
            },

            onClicked : function ( e ) {

                actionRunner( "on-clicked", {
                    link : e.target.dataset.link
                });
            },

            onMySwatchesClicked : function () {
                actionRunner( "on-myswatches-clicked", null );
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
                    <div>
                        <ul>
                            { props.data.map( create ) }
                            <li key="my-swatches" className="link my-swatches" onClick={ this.onMySwatchesClicked }>MY SWATCHES</li>
                        </ul>
                        <p>@ 2020 The Hopkins Shop LLP</p>
                    </div>
                );

                /*
                 <div>
                 <ul>{ props.data.map( create ) }</ul>
                 <p>@ 2016 The Hopkins Shop LLP</p>
                 </div>
                 */

                /*props.data.push({
                 "label" : "my swatches",
                 "uri" : "/my-swatches"
                 });*/
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

        // ////console.log("#### /FooterUI/ -actionRunner ", _data.name );

        switch( _action ){

            case "Sg_ROUTER_SHOW":


                let name = _data.name;

                if( _data.name === "catalogue" ){
                    //////console.log("/MainNavUI/ -actionRunner SPECIAL", _data.options.query );

                    name = _data.options.query;
                }

                uis.component.update( name );
                props.transitionMixin.showHide( true );

                break;

            case "hide":
                // if( _data.name !== "catalogue" ){
                props.transitionMixin.showHide( false );
                // }
                break;

            case "on-clicked":

                //////console.log("/FooterUI/ -actionRunner ", _data.link );

                api.dispatchRequest({
                    action : "on-navigation-request",
                    data : {
                        caller : api.info.name,
                        target : zz.store.getRoute().byName( _data.link )
                    }
                });


                break;


            case "on-myswatches-clicked":

                //////console.log("/HeaderUI/ -actionRunner ", _action );

                let rr = zz.store.getRoute().byName( "mySwatches" );

                api.dispatchRequest({
                    action : "on-navigation-request",
                    data : {
                        caller : api.info.name,
                        target : rr
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
