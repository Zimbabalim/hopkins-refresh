"use strict";

/**
 * Zimbabalim
 * 31/05/2016
 */

import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";
import signals from "signals";

import Products from "model/Products";
import TestResourceExists from "utils/TestResourceExists";


export default function MySwatchesProductItemUI() {

    let events = {
        Sg_PRODUCT_ITEM_ACTION : new signals.Signal
    };

    let els = {
        el : null, // *** raw dom element
        reactEl : null
    };

    let props = {
        isFirstRun : true,
        index : null
    };

    let uis = {
        component : null
    };

    let _react = {
        component : null
    };

    const init = function ( _config ) {

        // ////console.log("/MySwatchesProductItemUI/ -init ");

        create();
    };

    const create = function () {

        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    code : null,
                    designName : null,
                    colourName : null,
                    imageUri : null,
                    references : []
                }
            },

            componentWillMount : function () {
                // //////console.log("/MySwatchesProductItemUI/ -componentWillMount ", this );
                this.update();
            },

            componentDidMount : function () {
                uis.component = this;
                els.reactEl = ReactDOM.findDOMNode( this );
                TweenMax.from( els.reactEl, 0.2, { scale : 1.05, ease : Sine.easeOut } );
            },


            update : function () {

                // *** set state
                this.setState({
                    code : this.props.data.code,
                    designName : Products.methods().getDesignNameFromCode( this.props.data.code ),
                    fabricName : Products.methods().getFabricNameFromCode( this.props.data.code ),
                    colourName : Products.methods().getColourNameFromCode( this.props.data.code ),
                    imageUri :  Globals.paths.product_images + "A/" + Products.methods().replaceSlashes( this.props.data.code ) + "_a.jpg"
                });
            },

            onRemoveClicked : function ( e ) {
                actionRunner( "on-remove-btn-clicked", this.state.code );
            },

            imageClicked : function ( e ) {
                //////console.log("/ProductItemUI/ -imageClicked ", this.state.code );
                actionRunner( "on-image-clicked", this.state.code );
            },


            render : function () {

                let image;

                image = <img src={ this.state.imageUri } title={ this.state.code } alt={ this.state.code }/>;

                return(
                    <div className="product-item" key={ this.props.uid }>

                        <div className="image-area" onClick={ this.imageClicked }>
                            { image }

                            <p>{ this.state.code }</p>
                        </div>

                        <div className="text-area">
                            <h4>{ this.state.designName || this.state.code }</h4>
                            <h5>{ this.state.fabricName }</h5>
                        </div>
                        
                        <p className="remove-btn">
                            <span onClick={ this.onRemoveClicked }>remove</span>
                        </p>

                    </div>
                )

            }
        })
    };

    const getComponent = function () {
        return _react.component;
    };



    const actionRunner = function( _action, _data ){

        switch( _action ){


            case "on-remove-btn-clicked":

                // ////console.log("/MySwatchesProductItemUI/ -actionRunner ", _action, _data );
                
                events.Sg_PRODUCT_ITEM_ACTION.dispatch( "remove-item-requested", {
                    link : _data
                } );

                break;


            case "on-image-clicked":

                events.Sg_PRODUCT_ITEM_ACTION.dispatch( _action, {
                    link : _data
                } );

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