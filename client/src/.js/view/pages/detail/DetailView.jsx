"use strict";

/**
 * Zimbabalim
 * 10/05/2016
 */

import zz from "core/zz";
import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";

import Model from "model/Model";
import Products from "model/Products";
import User from "model/User";

import ColourThumbSelectorUI from "view/ui/ColourThumbSelectorUI";

import classNames from "classnames";

import TestResourceExists from "utils/TestResourceExists";


export default function DetailView( api ) {

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

        props.transitionMixin = _config.mixins[ 0 ];
        props.transitionMixin.init( { id : api.info.name, el : els.el } );

        create();
        ( _config.render ) ? render() : null;
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
                    imageUri1 : null,
                    references : [],
                    otherFabrics : [],
                    hasBeenAddedToMySwatches : null
                }
            },

            componentDidMount : function () {
                uis.component = this;
                els.reactEl = ReactDOM.findDOMNode( this );
            },

            updateAddToSwatches : function () {

                this.setState({
                    hasBeenAddedToMySwatches : User.checkHasBeenAddedFromCode( this.state.code )
                });
            },


            update : function ( _data ) {

                let context; // *** initial load, and thumb selection action offer data in different format, plus we only want 'references' once

                if( _data.design ){
                    context = _data.design;
                    this.state.references = _data.references; // *** just set references once
                } else {
                    context = _data;
                }

                if( _data.otherFabrics ){
                    this.state.otherFabrics = _data.otherFabrics;
                }

                // *** set state
                this.setState({
                    code : context.code,
                    designName : Products.methods().getDesignNameFromCode( context.code ),
                    fabricName : Products.methods().getFabricNameFromCode( context.code ),
                    colourName : Products.methods().getColourNameFromCode( context.code ),
                    imageUri1 :  Globals.paths.product_images + "B/" + Products.methods().replaceSlashes( context.code ) + "_b.jpg",
                    imageUri2 :  Globals.paths.product_images + "C/" + Products.methods().replaceSlashes( context.code ) + "_c.jpg",
                    width : context.details.width,
                    repeats : context.details.repeats,
                    hasBeenAddedToMySwatches : User.checkHasBeenAddedFromCode( context.code )
                });
            },

            onBackBtnClicked : function ( e ) {
                //////////console.log("/DetailView/ -onBackBtnClicked ");

                // FIXIT IMPORTANT doesn't work properly!
                //window.history.back();

                actionRunner( "on-back-button-clicked" );
            },

            onAddToMySwatchesClicked : function ( e ) {

                if( !this.state.hasBeenAddedToMySwatches ){
                    actionRunner( "add-to-myswatches", this.state.code );
                }
            },

            onOtherFabricClicked : function ( _code ) {
                actionRunner( "on-other-fabric-clicked", _code );
            },

            render : function () {

                let image1,
                    image2,
                    mySwatches;

                image1 = <img src={ this.state.imageUri1 } title={ this.state.code } alt="product image 1"/>,
                image2 = <img src={ this.state.imageUri2 } title={ this.state.code } alt="product image 2"/>;

                if( this.state.hasBeenAddedToMySwatches ){
                    mySwatches = "ADDED TO MY SWATCHES"
                } else {
                    mySwatches = "MY SWATCHES"
                }

                const createOtherFabric = ( _data ) => {

                    let onOtherFabricClicked = this.onOtherFabricClicked, // *** alias it
                        fabricName = Products.methods().getFabricNameFromCode( _data.code );

                    return <li key={ _data.code } onClick={ function() { onOtherFabricClicked( _data.code ); } }>
                        { fabricName }
                    <span>
                        <i className="icon icon-right-arrow"></i>
                    </span>
                    </li>
                };

                const getDetail = ( _label, _data ) => {
                    if( _data ){
                        return <p className="details-text">{ _label }&nbsp;&nbsp;{ _data }</p>
                    }
                };

                let mySwatchesClasses = classNames({
                    "link" : true,
                    "add-myswatches" : true,
                    "is-added" : this.state.hasBeenAddedToMySwatches
                });

                let mySwatchesIconClasses = classNames({
                    "icon" : true,
                    "icon-tick" : this.state.hasBeenAddedToMySwatches,
                    "icon-plus" : !this.state.hasBeenAddedToMySwatches,
                });

                let getContentAreaLayout = () => {

                    const desktop =
                        <div className="hbox inner">
                        <div>
                            <div className="image-area">
                                { image1 }
                            </div>
                            <div className="text-area">
                                <p className="design-text">{ this.state.designName }</p>
                                <p className="colour-text">{ ( this.state.colourName ) ? this.state.colourName : "#" }</p>
                                <p className="fabric-text">{ this.state.fabricName }</p>
                                <p className="details-text">WIDTH&nbsp;&nbsp;{ this.state.width }</p>

                                { getDetail( "REPEATS", this.state.repeats )}

                            </div>
                        </div>

                        <div>

                            <div className="image-area">
                                { image2 }
                            </div>

                            <div className="text-area">
                                <ColourThumbSelector data={ this.state.references } selected={ this.state.code }/>
                                <span className={ mySwatchesClasses }
                                      onClick={ this.onAddToMySwatchesClicked }>
                                            <i className={ mySwatchesIconClasses }></i>
                                    { mySwatches }
                                        </span>
                            </div>

                        </div>

                    </div>;

                    // ****************************************

                    const mobile =
                        <div className="hbox inner">
                        <div>
                            <div className="image-area">
                                { image1 }
                            </div>
                        </div>

                        <div>

                            <div className="image-area">
                                { image2 }
                            </div>

                            <div className="text-area">
                                <ColourThumbSelector data={ this.state.references } selected={ this.state.code }/>

                                <p className="design-text">{ this.state.designName }</p>
                                <p className="colour-text">{ ( this.state.colourName ) ? this.state.colourName : "#" }</p>
                                <p className="fabric-text">{ this.state.fabricName }</p>
                                <p className="details-text">WIDTH&nbsp;&nbsp;{ this.state.width }</p>

                                { getDetail( "REPEATS", this.state.repeats )}

                                <span className={ mySwatchesClasses }
                                      onClick={ this.onAddToMySwatchesClicked }>
                                            <i className={ mySwatchesIconClasses }></i>
                                    { mySwatches }
                                        </span>

                            </div>

                        </div>

                    </div>;


                    return ( Globals.viewport.isMobile ) ? mobile : desktop;
                };


                return (
                    <div className="hbox">

                        <div className="sidebar">
                            <span className="link back solo-item" onClick={ this.onBackBtnClicked }>
                                <i className="icon icon-left-arrow"></i>BACK</span>
                        </div>

                        <div className="content-area">

                            { getContentAreaLayout() }

                            <div className="bottom-panel">
                                <p>{ ( this.state.otherFabrics.length > 0 ) ? "Also available in:" : "" }</p>
                                <ul>{ this.state.otherFabrics.map( createOtherFabric ) }</ul>
                            </div>


                        </div>

                    </div>
                );

            }

        })
    };

    const render = function () {

        uis.component = ReactDOM.render(
            React.createElement( _react.component ), els.el
        );

    };



    const actionRunner = function( _action, _data ){

        switch( _action ){

            case "show":

                let product = Products.methods().queryDesignByCode( _data.options.query );
                uis.component.update( product );
                uis.colourThumbSelectorUI.actionRunner( "update-selected", _data.options.query );
                props.transitionMixin.showHide( true );

                break;

            case "hide":
                props.transitionMixin.showHide( false );
                break;

            case "on-colour-thumb-clicked":

                let newProduct = Products.methods().searchByProductCode( _data.link ); // *** TODO error check
                uis.component.update( newProduct );
                uis.colourThumbSelectorUI.actionRunner( "update-selected", _data.link ); // *** pass back in to set selected

                break;

            case "add-to-myswatches":

                //////console.log("/DetailView/ -actionRunner ", _action, _data );
                User.add( _data );
                uis.component.updateAddToSwatches();

                break;


            case "on-other-fabric-clicked":
                // ////////console.log("/DetailView/ -actionRunner ", _action, _data );

                // *** update in place
                /*let pp = Products.methods().queryDesignByCode( _data );
                 uis.component.update( pp );
                 uis.colourThumbSelectorUI.actionRunner( "update-selected", _data );*/



                TweenMax.to( els.reactEl, 0.2,
                    { opacity : 0.6,
                        ease : Sine.easeInOut,
                        onComplete : function () {

                            // ***************************
                            let pp = Products.methods().queryDesignByCode( _data );
                            uis.component.update( pp );
                            uis.colourThumbSelectorUI.actionRunner( "update-selected", _data );
                            // ***************************

                            TweenMax.to( els.reactEl, 0.2,
                                { opacity : 1,
                                    ease : Sine.easeOut });
                        } } );



                break;

            case "on-back-button-clicked":


                // ////console.log("/DetailView/ -actionRunner BACK BUTTON", api.info.name );

                api.dispatchRequest({
                    action : "on-back-button-request",
                    data : {
                        caller : api.info.name,
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