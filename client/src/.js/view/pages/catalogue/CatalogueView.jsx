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
import SideBarUI from "view/pages/catalogue/SideBarUI";
import ProductGridUI from "view/ui/product_grid/ProductGridUI";

import Products from "model/Products";
import classNames from "classnames";
import Session from "model/Session";
import PaginatorControlUI from "view/ui/product_grid/PaginatorControlUI";

import MutationObserver from "utils/MutationObserver";


export default function CatalogueView( api ) {

    let events = {

    };

    let els = {
        el : null,
        sideBar : null,
        //sideBarInner : null, // *** for mobile nav
        reactEl : null
    };

    let props = {
        data : null,
        transitionMixin : null,
        isFirstRun : true,

        mobile : {
            isMenuOpen : false,
            scroll : {
                currY : null,
                productY : null,
                menuY : null,

                mainYOnOpen : null,
                mainYOnClose : null
            }
        }
    };

    let uis = {
        component : null,
        sideBar : null
    };

    let _react = {
        component : null
    };

    const init = function ( _config ) {

        els.el = _config.el;

        props.transitionMixin = _config.mixins[ 0 ];
        props.transitionMixin.init( { id : api.info.name, el : els.el } );

        Products.events.Sg_PRODUCT_MODEL_CHANGED.add( function ( _props ) {
            actionRunner( _props.action, _props.data );
        } );

        create( this );
        ( _config.render ) ? render() : null;
    };


    const create = function ( _scope ) {

        uis.sideBar = new zz.Node( _scope, SideBarUI, { name : "sideBar" });
        uis.sideBar.init( { el : null, render : false } );
        let SideBar = uis.sideBar.getComponent();

        // els.sideBar = uis.sideBar.els.reactEl;
        // ////console.log("/CatalogueView/ -create SIDEBAR", els.sideBar );

        uis.productGrid = new zz.Node( _scope, ProductGridUI, { name : "productGrid-catalogue" });
        uis.productGrid.init( { el : null, render : false, mode : "catalogue" } );
        let ProductGrid = uis.productGrid.getComponent();

        uis.paginatorControlUI = new zz.Node( _scope, PaginatorControlUI, { name : "paginatorControlUI" });
        uis.paginatorControlUI.init( { el : null, render : false } );
        let PaginatorControl = uis.paginatorControlUI.getComponent();

        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    isMobileMenuActive : false
                }
            },

            componentDidMount : function () {
                els.reactEl = ReactDOM.findDOMNode( this );


            },

            update : function () {

            },

            onShowMobileMenuBtnClicked : function ( e ) {
                actionRunner( "mobile-show-menu", null );

                // this.setState({ isMobileMenuActive: props.isMenuOpen }); // *** causes issues - removed
            },

            render : function () {

                let classes = classNames({
                    "hbox" : true,
                    "is-mobile-menu" : this.state.isMobileMenuActive // REMOVE???
                });

                return (

                    <div>

                        <div className="mobile-only show-menu-btn" onClick={ this.onShowMobileMenuBtnClicked }>
                            <span>
                                <i className="icon icon-right-arrow"/>
                            </span>
                        </div>

                        <div className={ classes }>

                            <SideBar/>

                            <div className="content-area">
                                <PaginatorControl/>
                                <ProductGrid/>
                            </div>

                        </div>

                    </div>

                )
            }

        });

        //{ ( this.state.isMobileMenuActive ) ? "CLOSE" : "REFINE" }
    };

    const render = function () {

        uis.component = ReactDOM.render(
            React.createElement( _react.component ), els.el
        );
    };


    // TODO not working, might be because of images not loading. look for css solution
    const resizeSidebar = function () {

        let hboxEl = els.el.querySelector( ".hbox" ),
            sidebarEl = els.el.querySelector( ".sidebar" );

        let m = new MutationObserver();
        m.watch( els.reactEl, function ( _rect ) {
            ////console.log("/CatalogueView/ - ", _rect.height );
            sidebarEl.style.minHeight = _rect.height + "px";
        });

    };
    

    const actionRunner = function( _action, _data ){
        // console.log("======= /CatalogueView/ -actionRunner ", _action, _data  );

        switch( _action ){

            case "update-fabric-selection":

                // ////console.log("\n/CatalogueView/ -actionRunner UPDATE", _data );


                if( !Session.overrides.getDefeatUpdateCatalogue() ){ // TEST REMOVE

                    // ***
                    // *** TODO - dont rerender if nothing changed
                    uis.productGrid.actionRunner( "update", {
                        data : _data
                    });

                    api.dispatchCommand({ // *** notify others - should be passing through anyway?
                        action : "on-product-model-change",
                        data : {
                            metrics : Products.methods().getTotalNumberOfFabrics()
                        }
                    });
                    // ***

                    // Session.overrides.setDefeatUpdateCatalogue( false );
                } else {
                    ////console.log("/CatalogueView/ -actionRunner ======= DEFEAT =======");
                }


                break;

            case "reset-fabric-selector":

                api.dispatchCommand({
                    action : "reset-fabric-selector",
                    data : {}
                });

                break;


            case "select-all-fabrics-request":

                api.dispatchCommand({
                    action : "force-fabric-selector-select-all",
                    data : {}
                });

                break;

            case "show":

                Session.clearAll( api.info.name ); // TEST

                if( !_data/* || !_data.query*/ ){
                    //////console.log("/CatalogueView/ -actionRunner QUERY ERROR! SHOULD USE HISTORY");
                    /*_data = {
                        query : null
                    };*/
                }

                api.dispatchCommand({
                    action : "update-fabric-selector",
                    data : {
                        query : _data.options.query || null
                    }
                });


                api.dispatchCommand({
                    action : "show-from-parent",
                    data : {
                        isFirstRun : props.isFirstRun
                    }
                });

                if( props.isFirstRun ){
                    props.isFirstRun = false;
                }

                props.transitionMixin.showHide( true );

                break;

            case "hide":
                props.transitionMixin.showHide( false );
                break;


            case "mobile-show-menu" :

                let sbel = uis.sideBar.els.reactEl,
                    sbinner = uis.sideBar.els.inner;

                //////console.log("/CatalogueView/ -actionRunner SIDEBAR", sbinner );

                if( props.mobile.isMenuOpen ){ // *** NOTE -close

                    els.el.classList.remove( "is-mobile-menu" );
                    props.mobile.isMenuOpen = false;
                    props.mobile.scroll.mainYOnClose = Math.abs( els.el.getBoundingClientRect().top );

                    TweenMax.to( sbel, 0.3, {
                        left : "-100%" ,
                        ease : Sine.easeIn,
                        onComplete : function () {
                        TweenMax.to( sbel, 0, { top : 0 });
                    }});

                    document.body.classList.remove( "scroll-defeat" );

                } else { // *** NOTE -open

                    els.el.classList.add( "is-mobile-menu" );
                    props.mobile.isMenuOpen = true;

                    let r = sbel.getBoundingClientRect(),
                        sidebarY = ( r.top > 0 ) ? -Math.abs( r.top ) : Math.abs( r.top );

                    props.mobile.scroll.mainYOnOpen = Math.abs( els.el.getBoundingClientRect().top );

                    TweenMax.to( sbel, 0, { top : sidebarY });
                    TweenMax.to( sbel, 0.3, { left : 0, ease : Sine.easeInOut });
                    sbinner.scrollTop = 0;

                    document.body.classList.add( "scroll-defeat" );
                }

                break;

            case "init-paginator":
                uis.paginatorControlUI.actionRunner( _action, _data );
                break;

            case "on-paginator-request":
                //////console.log("/CatalogueView/ -actionRunner ", _action );

                api.dispatchCommand({
                    action : "on-paginator-request",
                    data : _data
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
