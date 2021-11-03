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

import FindDesignInputUI from "view/ui/FindDesignInputUI";
import FindColourPanelUI from "view/ui/FindColourPanelUI";
import FabricListUI from "view/ui/FabricListUI";

import Session from "model/Session";


export default function SideBarUI( api ) {

    let events = {

    };

    let els = {
        reactEl : null
    };

    let props = {
        data : null
    };

    let uis = {
        component : null,
        findDesignInputUI : null,
        findColourPanelUI : null,
        fabricListUI : null
    };

    let _react = {
        component : null
    };

    const init = function ( _config ) {
        create( this );
    };

    const create = function ( _scope ) {

        /*uis.findDesignInputUI = new FindDesignInputUI();
         uis.findDesignInputUI.init();
         let FindDesignInput = uis.findDesignInputUI.getComponent();*/

        uis.findDesignInputUI  = new zz.Node( _scope, FindDesignInputUI, { name : "findDesignInputUI-sidebar" });
        uis.findDesignInputUI .init( { el : null, render : false } );
        let FindDesignInput = uis.findDesignInputUI .getComponent();

        uis.findColourPanelUI = new zz.Node( _scope, FindColourPanelUI, { name : "findColourPanelUI" });
        uis.findColourPanelUI.init( { el : null, render : false } );
        let FindColourPanel = uis.findColourPanelUI.getComponent();

        uis.fabricListUI = new zz.Node( _scope, FabricListUI, { name : "fabricListUI" });
        uis.fabricListUI.init( { el : null, render : false } );
        let FabricList = uis.fabricListUI.getComponent();



        _react.component = React.createClass({

            getInitialState : function () {
                return null
            },

            componentDidMount : function () {
                els.reactEl = ReactDOM.findDOMNode( this );
                els.inner = els.reactEl.getElementsByClassName( "inner" )[ 0 ];
                //////console.log("/SideBarUI/ -componentDidMount -----------", els.inner );

                if( Globals.viewport.isMobile ){
                    TweenMax.set( els.inner, { height : window.innerHeight });
                }

                TweenMax.set( els.reactEl, { left : "-100%" }); // *** for initial animation in catalogueview
            },

            update : function () {

            },

            resetFilterBtnClicked : function ( e ) {
                //////console.log("/SideBarUI/ -resetFilterBtnClicked ");

                actionRunner( "on-reset-btn-clicked", null );
            },

            render : function () {

                //<FindDesignInput/>

                return (
                    <div className="sidebar">

                        <div className="inner">

                            <p className="reset-filter-btn" onClick={ this.resetFilterBtnClicked }>
                                reset filter<span>x</span>
                            </p>
                            <FindDesignInput/>
                            <FindColourPanel/>
                            <FabricList/>

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

    const getComponent = function () {
        return _react.component;
    };

    const update = function () {

    };

    const actionRunner = function( _action, _data ){

        switch( _action ){

            case "on-reset-btn-clicked":

                // Session.overrides.setDefeatUpdateCatalogue( false ); // *** NOTE is this the best spot?
                api.dispatchRequest( { action : "reset-fabric-selector", data : {} } );

                break;

            case "show-from-parent":
                //////console.log("/SideBarUI/ -actionRunner ", _action, _data.isFirstRun );

                if( _data.isFirstRun ){
                    TweenMax.from( els.reactEl, 0.3, { opacity : 0, delay : 0.5 } );
                }

                break;

            // *** TODO when coming back from detail page it looks like it is necessary for the selectors be refreshed, when one is interacted with
            case "force-update":
                //console.log("/SideBarUI/ -actionRunner ", _action );

                api.dispatchCommand({
                    action : _action,
                    data : _data
                });

                break;
        }

    };

    return{
        els : els,
        init : init,
        getComponent : getComponent,
        actionRunner : actionRunner
    }
}