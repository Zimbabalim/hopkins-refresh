"use strict";

/**
 * Zimbabalim
 * 30/05/2016
 */


import zz from "core/zz";
import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";

// import Model from "model/Model";
import Products from "model/Products";

import ProductGridUI from "view/ui/product_grid/ProductGridUI";
// import ColourThumbSelectorUI from "view/ui/ColourThumbSelectorUI";

import User from "model/User";
import TestResourceExists from "utils/TestResourceExists";

import PaginatorControlUI from "view/ui/product_grid/PaginatorControlUI";


export default function DetailView( api ) {

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

        // ***
        //User.test(); // REMOVE
        // ***

        create( this );
        ( _config.render ) ? render() : null;
    };

    const create = function ( _scope ) {

        uis.productGrid = new zz.Node( _scope, ProductGridUI, { name : "productGrid-myswatches" });
        uis.productGrid.init( { el : null, render : false, mode : "mySwatches" } );
        let ProductGrid = uis.productGrid.getComponent();
    
        uis.paginatorControlUI = new zz.Node( _scope, PaginatorControlUI, { name : "paginatorControlUI" });
        uis.paginatorControlUI.init( { el : null, render : false } );
        let PaginatorControl = uis.paginatorControlUI.getComponent();

        _react.component = React.createClass({

            getInitialState : function () {
                return null
            },

            componentDidMount : function () {
                uis.component = this;
            },

            update : function ( _data ) {

            },

            render : function () {


                return (
                    <div>
                        <div className="hbox">

                            <div className="sidebar">
                                <h3 className="solo-item">MY SWATCHES</h3>
                            </div>

                            <div className="content-area">
                                <PaginatorControl/>
                                <ProductGrid/>
                            </div>

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

        // console.log("/MySwatchesView/ -actionRunner ",  _action, _data );

        switch( _action ){

            case "show":

                props.transitionMixin.showHide( true );

                uis.productGrid.actionRunner( "update", {
                    data : User.getMySwatches()
                });

                break;

            case "hide":
                props.transitionMixin.showHide( false );
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
