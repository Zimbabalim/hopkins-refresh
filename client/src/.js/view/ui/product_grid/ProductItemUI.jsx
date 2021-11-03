"use strict";

/**
 * Zimbabalim
 * 12/05/2016
 */

import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";
import signals from "signals";

import Products from "model/Products";
import User from "model/User";

import ColourThumbSelectorUI from "view/ui/ColourThumbSelectorUI";
import TestResourceExists from "utils/TestResourceExists";


export default function ProductItemUI() {

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
        create();
    };

    const create = function () {

        uis.colourThumbSelectorUI =  new ColourThumbSelectorUI();
        uis.colourThumbSelectorUI.init();
        let ColourThumbSelector = uis.colourThumbSelectorUI.getComponent();

        uis.colourThumbSelectorUI.events.Sg_COLOUR_THUMB_ACTION.add( actionRunner );

        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    code : null,
                    designName : null,
                    colourName : null,
                    imageUri : null,
                    references : [],
                    hasBeenAddedToMySwatches : null
                }
            },

            componentWillMount : function () {
                this.update();
            },

            componentDidMount : function () {
                uis.component = this;
                els.reactEl = ReactDOM.findDOMNode( this );

                if( !Globals.viewport.isMobile ){
                    TweenMax.from( els.reactEl, 0.2, { scale : 1.05, ease : Sine.easeOut } );
                }

                this.imageLoadHelper();
            },


            update : function ( _data ) {

                let context; // *** initial load, and thumb selection action offer data in different format, plus we only want 'references' once

                if( !_data ){
                    context = this.props.data.design;
                    this.state.references = this.props.data.references; // *** just set references once

                } else {
                    context = _data;
                }

                // *** set state
                this.setState({
                    code : context.code,
                    designName : Products.methods().getDesignNameFromCode( context.code ),
                    fabricName : Products.methods().getFabricNameFromCode( context.code ),
                    colourName : Products.methods().getColourNameFromCode( context.code ),
                    imageUri :  Globals.paths.product_images + "A/" + Products.methods().replaceSlashes( context.code ) + "_a.jpg",
                    hasBeenAddedToMySwatches : User.checkHasBeenAddedFromCode( context.code )
                });
            },


            // *** NOTE unused - see component instead
            /*onColourThumbClicked : function ( e ) {

                /!*let img = this.refs["product-image"];
                img.classList.add( "is-loading" );

                *!/

                ////console.log("/ProductItemUI/ -onColourThumbClicked ============================");

                actionRunner( "on-colour-thumb-clicked", {
                    link : e.target.dataset.link
                });
            },*/

            imageClicked : function ( e ) {

                actionRunner( "on-image-clicked", this.state.code );
            },
            
            // *** TODO add to imageLoadHelper
            // *** FIXIT use setstate!
            unloadImageOnColourThumb : function () {

                let img = this.refs["product-image"],
                    spacer = this.refs["product-loading"],
                    spinner = this.refs["product-loading-spinner"];

                // img.classList.add( "is-loading" );
                // spacer.classList.add( "is-loading" );
                spinner.classList.add( "is-loading" );
                
                ////console.log("/ProductItemUI/ -unloadImageOnColourThumb ");
            },

            // *** TODO encapsulate and use also for detail view
            imageLoadHelper : function () {

                let img = this.refs["product-image"],
                    spacer = this.refs["product-loading"],
                    spinner = this.refs["product-loading-spinner"];

                img.onload = function () {
                    // ////console.log("/ProductItemUI/ -onload LOADED");
                    img.classList.remove( "is-loading" );
                    spacer.classList.remove( "is-loading" );
                    spinner.classList.remove( "is-loading" )
                }

            },

            render : function () {

                let image,
                    mySwatchAddedIcon;

                image = <img
                    ref={ "product-image" }
                    className="product-image is-loading"
                    src={ this.state.imageUri }
                    title={ this.state.code }
                    alt={ this.state.code }/>;

                if( this.state.hasBeenAddedToMySwatches ){
                    mySwatchAddedIcon = <span className="myswatch-added-icon"/>
                }

                /*<p>{ this.state.code }</p>*/

                return(
                    <div className="product-item" key={ this.props.uid }>

                        <div className="image-area" onClick={ this.imageClicked }>

                            <div className="inner">
                                { mySwatchAddedIcon }

                                    <div ref={ "product-loading-spinner" } className="product-loading-spinner is-loading"></div>

                                    <img
                                    ref={ "product-loading" }
                                    className="product-loading is-loading"
                                    src="./assets/images/products/product-item-background.png"
                                    alt=""/>

                                { image }

                            </div>

                        </div>

                        <div className="text-area">
                            <h4>{ this.state.designName || this.state.code }</h4>
                            <h5>{ this.state.fabricName }</h5>

                            <p className="available-in">AVAILABLE IN { this.state.references.length } COLOUR{ ( this.state.references.length > 1 ) ? "S" : "" }</p>
                            <ColourThumbSelector data={ this.state.references } selected={ this.state.code }/>

                        </div>

                    </div>
                );

                /*
                 <div className="image-area" onClick={ this.imageClicked }>
                 { mySwatchAddedIcon }
                 { image }
                 <p>{ this.state.code }</p>
                 </div>
                 */
            }
        })
    };

    const getComponent = function () {
        return _react.component;
    };


    const update = function () {

    };

    const actionRunner = function( _action, _data ){

        switch( _action ){

            case "on-colour-thumb-clicked":

                ////console.log("/ProductItemUI/ -actionRunner THUMB ======================");

                // uis.component.unloadImageOnColourThumb(); // *** FIXIT sometimes fails - should be using setstate

                // ***************************

                _.delay( function () {

                    let newProduct = Products.methods().searchByProductCode( _data.link ); // *** TODO error check
                    uis.component.update( newProduct );
                    uis.colourThumbSelectorUI.actionRunner( "update-selected", _data.link ); // *** pass back in to set selected

                }, 0 );

                /*let newProduct = Products.methods().searchByProductCode( _data.link ); // *** TODO error check
                uis.component.update( newProduct );
                uis.colourThumbSelectorUI.actionRunner( "update-selected", _data.link ); // *** pass back in to set selected*/
                // ***************************

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