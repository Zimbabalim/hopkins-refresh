"use strict";

/**
 * Zimbabalim
 * 16/05/2016
 */

import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";
import signals from "signals";

import Products from "model/Products";


export default function ColourThumbSelectorUI() {

    let events = {
        Sg_COLOUR_THUMB_ACTION : new signals.Signal
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

        create();
    };

    const create = function () {

        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    currentSelectedCode : this.props.selected // *** yeah i know you're not supposed to do this
                }
            },

            componentDidMount : function () {
                uis.component = this;
            },

            update : function ( _data ) {
                // ////console.log("/ColourThumbSelectorUI/ -update ", _data );

                this.setState({
                    currentSelectedCode : _data
                });
            },

            onChange : function ( e ) {

                events.Sg_COLOUR_THUMB_ACTION.dispatch({
                    id : this.state.uid,
                    selected : e.target.checked
                });
            },

            onClicked : function ( e ) {

                actionRunner( "on-clicked", {
                    link : e.target.dataset.link
                });

            },

            render : function () {

                // ////console.log("**************/ColourThumbSelectorUI/ -render ", this.props.selected );

                const create = ( _item ) => {

                    // ////console.log("/ColourThumbSelectorUI/ -create ", _item );

                    let image_url = Globals.paths.product_images + "thumbnails/" + Products.methods().replaceSlashes( _item.code ) + "_a.jpg";

                    return(
                        <li className={ ( this.state.currentSelectedCode === _item.code ) ? "is-selected" : "" }
                            key={ _item.code }
                            data-link={ _item.code }
                            onClick={ this.onClicked }
                        style={{ backgroundImage : "url(" + image_url +")" }}></li>
                    )
                };

                return(
                    <ul className="colour-thumb-selector">
                        { this.props.data.map( create ) }
                    </ul>



                )
            }
        })
    };

    const getComponent = function () {
        return _react.component;
    };


    const update = function ( _data ) {
        // ////console.log("/ColourThumbSelectorUI/ -update ", _data );
        // uis.component.update( _data );
    };

    const actionRunner = function( _action, _data ){

        switch( _action ){

            case "on-clicked":

                // ////console.log("/ColourThumbSelectorUI/ -actionRunner ", _action, _data );

                events.Sg_COLOUR_THUMB_ACTION.dispatch(
                    "on-colour-thumb-clicked", _data
                );

                break;

            case "update-selected":
                // ////console.log("-------- /ColourThumbSelectorUI/ -actionRunner ", _action, _data );
                uis.component.update( _data );
                break;

        }

    };

    return{
        events : events,
        els : els,
        init : init,
        getComponent : getComponent,
        actionRunner : actionRunner
    }
}