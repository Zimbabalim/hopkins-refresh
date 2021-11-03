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
import classNames from "classnames";
import FindDesignInputUI from "view/ui/FindDesignInputUI";
import User from "model/User";

export default function HeaderUI( api ) {

    let events = {

    };

    let els = {
        el : null, // *** raw dom element
        findDesignInput : null// *** NOTE for tweenmax only!!!
    };

    let props = {

     };

    let uis = {
        component : null,
        findDesignInputUI : null
    };

    let _react = {
        component : null
    };

    const init = function ( _config ) {


        //props.id = _config;
        els.el = _config.el;
        create( this );
        ( _config.render ) ? render() : null;
    };

    const create = function ( _scope ) {

        uis.findDesignInputUI  = new zz.Node( _scope, FindDesignInputUI, { name : "findDesignInputUI-header" });
        uis.findDesignInputUI.init( { el : null, render : false } );
        let FindDesignInput = uis.findDesignInputUI .getComponent();


        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    isHomePage : null
                }
            },

            componentDidMount : function () {
                uis.component = this;
            },

            update : function ( _f ) {
                this.setState({ isHomePage : _f }, function () {
                    // //////console.log("/HeaderUI/ - IS HOME PAGE", this.state.isHomePage );
                });
            },
            
            onLogoClicked : function ( e ) {
                actionRunner( "on-logo-clicked", null );
            },

            onMySwatchesClicked : function () {
                actionRunner( "on-myswatches-clicked", null );
            },

            render : function () {

                let classes = classNames({
                    "hbox" : true,
                    "is-home-page" : this.state.isHomePage
                });

                return(
                    <div className={ classes }>

                        <div>
                            <div className="logo" onClick={ this.onLogoClicked } ref={ "logo" }></div>
                        </div>

                        <div>
                            <FindDesignInput/>
                            <div className="text-group" ref={ "text-group" }>
                                <p>
                                    <a href="mailto:hopkinsfabrics@hotmail.co.uk">hopkinsfabrics@hotmail.co.uk</a>
                                    <span className="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>

                                    <span className="phone-line"><i className="icon icon-phone"></i><a href="tel:0207 4287 569">020 7428 7569</a></span>


                                </p>
                                <p>
                                    <span className="username">Hello { User.data.userDetails.friendly_name }</span>
                                    <span
                                        className="link my-swatches"
                                        onClick={ this.onMySwatchesClicked }>
                                        MY SWATCHES</span></p>
                            </div>
                        </div>

                    </div>
                )
//<a href="tel:0207 4287 569"><i className="icon icon-phone"></i>020 7428 7569</a>
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

    const resizeHeader = ( _isHomePage ) =>{


        if( !els.findDesignInput ){
            els.findDesignInput = els.el.querySelector( ".find-design-input" );
        }

        // *** MOBILE
        if( Globals.viewport.isMobile ){
            //////console.log("/HeaderUI/ -resizeHeader DEFEAT");

            if( _isHomePage ){
                TweenMax.to( els.findDesignInput, 0.3, { scale : 1, opacity : 1 } );
            } else {
                TweenMax.to( els.findDesignInput, 0.2, { scale : 1, opacity : 0 } );
            }

            return;
        }

        // *** NOT MOBILE
        if( _isHomePage ){
            TweenMax.to( els.el, 0.3, { height : "12rem" } );
            TweenMax.to( uis.component.refs["logo"], 0.2, { scale : 1, left : "10%", top : "0" } );
            TweenMax.to( uis.component.refs["text-group"], 0.2, { top : "2.5rem" } );
            TweenMax.to( els.findDesignInput, 0.3, { scale : 1, opacity : 1 } );
        } else {
            TweenMax.to( els.el, 0.2, { height : "9rem" } );
            TweenMax.to( uis.component.refs["logo"], 0.2, { scale : 0.8, left : "16%", top : "-1.5rem" } );
            TweenMax.to( uis.component.refs["text-group"], 0.2, { top : "0" } );
            TweenMax.to( els.findDesignInput, 0.2, { scale : 1, opacity : 0 } );
        }

    };

    const actionRunner = function( _action, _data ){

        // //////console.log("/HeaderUI/ -actionRunner ", _action );

        switch( _action ){

            case "Sg_ROUTER_SHOW":

                let f = _data.name === "home";
                resizeHeader( f );
                uis.component.update( f );

                break;


            case "on-logo-clicked":

                // TEST ONLY
                let r = zz.store.getRoute().byName( "home" );
                // //////console.log("/HeaderUI/ -actionRunner ", z );

                api.dispatchRequest({
                    action : "on-navigation-request",
                    data : {
                        caller : api.info.name,
                        target : r
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