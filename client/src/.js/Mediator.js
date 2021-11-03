"use strict";

/**
 * Zimbabalim
 * 05/05/2016
 */

import zz from "core/zz";
import Globals from "Globals";
import MainLayout from "view/MainLayout";

import Session from "model/Session";
import Products from "model/Products";
import User from "model/User";

import BreakpointEnquire from "utils/BreakpointEnquire";
import CookieManager from "service/CookieManager";

import GatewayView from "view/gateway/GatewayView";

import TweenMax from "gsap";


export default function Mediator( api ){

    let props = {
        currentRouteOptions : {
            name : null,
            query : null
        },

        testOptionsStack : [],

        cachedCatalogueRoute : null, // *** NOTE implementing quick fix for back button from detailspage

        SHOW_GATEWAY : true // *** DEBUGGING ONLY! set to true for production!!!
    };

    let els = {
        spinner : null,
        appContainer : null,
        whiteout : null,
        gateway : null
    };

    let uis = {
        gatewayView : null
    };

    let _scope;


    const init = function(){

        _scope = this; // *** for the zz nodes...

        BreakpointEnquire.init();
        CookieManager.init(); // TEST
        User.init(); // *** NOTE user model will be responsible for writing/reading to cookiemanager from here

        els.spinner = document.getElementById( "spinner" );
        els.appContainer = document.getElementById( "app-container" );
        els.whiteout = document.getElementById( "whiteout" );
        els.gateway = document.getElementById( "gateway-view" );

        // *** debugging switch
        if( props.SHOW_GATEWAY ){
            actionRunner( "init-gateway", null );
        } else {
            actionRunner( "init-main-application", null );
        }
    };




    const actionRunner = function( _action, _data ){

        // console.warn("==== \n/Mediator/ -actionRunner ", _action, _data );

        // FIXIT TODO get route change event here (why don't we already have it?) so we can catch popstate events (back button)

        switch( _action ){

            case "init-gateway":

                ////console.log("/Mediator/ -actionRunner ", _action );

                uis.gatewayView = new zz.Node( _scope, GatewayView, { name : "gatewayView" });
                uis.gatewayView.init( { el : els.gateway, render : true } );

                showHideSpinnerWhiteout( false );

                /*window.z = function () {
                 actionRunner( "on-gateway-passed", null );
                 };*/

                break;


            case "on-gateway-passed":

                showHideSpinnerWhiteout( true );

                _.delay( function () {
                    uis.gatewayView.actionRunner( "dispose", null ); // TODO
                    actionRunner( "init-main-application", null );
                }, 666 );

                break;


            case "init-main-application":

                // //console.log("/Mediator/ -actionRunner ", _action, _data );

                var mainLayout = new zz.Node( _scope, MainLayout, { name : "mainLayout" } );
                mainLayout.init();

                zz.router.target( "homeView", { name : "home", url : "/", default : true } );
                zz.router.target( "catalogueView", { name : "catalogue", url : "catalogue", default : false } );
                zz.router.target( "detailView", { name : "details", url : "details" } );
                zz.router.target( "sundriesView", { name : "sundries", url : "sundries" } );
                zz.router.target( "mySwatchesView", { name : "mySwatches", url : "my-swatches" } );

                zz.start();
                zz.store.log().all();

                actionRunner( "start-main-application", null ); // TEST ONLY

                break;

            case "start-main-application":

                showHideSpinnerWhiteout( false );
                els.appContainer.classList.remove( "is-initialising" );

                Products.init(); // *** start product model

                actionRunner( "on-navigation-request", {
                    caller : api.info.name,
                    target : zz.store.getRoute().byDefault()
                } );

                /*let c = _.find( zz.getNodeByUid( api.info.parentUid ).children, function ( _v ) {
                 return _v.name === "paginatorControlUI"
                 });

                 let paginatorNode = zz.getNodeByUid( c.uid );*/


                /*let c = _.find( zz.getNodeByUid( api.info.parentUid ).children, function ( _v ) {
                 return _v.name === "paginatorControlUI"
                 });*/

                // let c = zz.getNodeByUid( api.info.parentUid );
                //
                // //console.log("/Mediator/ -actionRunner ", api.info );


                break;

            case "on-navigation-request":

                const isEqual = function( _now, _before ) {
                    return _now === _before
                };

                const setCachedOptions = function( _options ) {
                    props.currentRouteOptions = _.clone( _options );
                };

                let pass = false;

                if( _data.target ){

                    if( _data.target.options.name === "catalogue" ) {
                        pass = !isEqual(_data.target.options.query, props.currentRouteOptions.query);
                        // ***************
                        Session.clearAll(api.info.name); // TODO test
                        // props.cachedCatalogueRoute.target.options.scrollY = 0; // TEST

                        /*if (_data.target.options["scrollY"]){
                            _data.target.options["scrollY"] = 0;
                        }*/
                        // ***************
                    } else {
                        ////console.log("/Mediator/ -actionRunner NOT CATALOGUE", props.currentRouteOptions );
                        pass = !isEqual( _data.target.options.name, props.currentRouteOptions.name );
                    }

                    if( _data.target.options.name !== "details" ){
                        props.cachedCatalogueRoute = _data;
                        ////console.log("/Mediator/ -actionRunner SHOULD CACHE ROUTE", props.cachedCatalogueRoute.target.options );

                    } else {
                        ////console.log("/Mediator/ -actionRunner NAVIGATE TO DETAILS PAGE", props.cachedCatalogueRoute.target.options );

                        props.cachedCatalogueRoute.target.options.scrollY = window.scrollY;
                        ////console.log("/Mediator/ -actionRunner SCROLLY", props.cachedCatalogueRoute.target.options.scrollY );
                    }

                    if( pass ){
                        setCachedOptions( _data.target.options );
                        // _data.target.route.go();

                        props.cachedCatalogueRoute.target.options.paginatorIndex = 0; // TEST
                        // props.cachedCatalogueRoute.target.options.scrollY = 0;

                        if( _data.caller === "mainNavUI" || _data.caller === "footerUI" ){
                            //console.log("/Mediator/ -actionRunner CLEAR SCROLL");
                            Session.overrides.setDefeatUpdateCatalogue( false, api.info.uid ); // TEST
                            _data.target.options.scrollY = 0;
                        }

                        if( _data.target.options["scrollY"] ){
                            ////console.log("/Mediator/ -actionRunner HAS SCROLL POSITION", props.cachedCatalogueRoute.target.options.scrollY );

                            _.delay( function () {
                                ////console.log("/Mediator/ - SCROLL?");
                                window.scroll( 0, props.cachedCatalogueRoute.target.options.scrollY );
                                // TweenMax.to( window, 1, { scrollTo : props.cachedCatalogueRoute.target.options.scrollY } ); // TODO this would be nice
                            }, 444 );
                        }

                        // *********************
                        _data.target.route.go();
                        // *********************

                    } else {
                        ////console.log("/Mediator/ -actionRunner NAVIGATE DEFEAT");
                    }
                }

                // //console.log("/Mediator/ -actionRunner NAV BBBBB", Session.cache.cachedVOs );
                //zz.router.setPushStateData( "session", Session.cache.cachedVOs ); // *** TEST

                break;


            case "on-back-button-request":

                if( _data.caller === "detailView" ){
                    // //console.log("/Mediator/ -actionRunner BACK FROM DETAIL VIEW", props.cachedCatalogueRoute.target.options.paginatorIndex );

                    props.cachedCatalogueRoute.target.options.paginatorIndex = Session.paginatorBridge.getIndex();

                    props.cachedCatalogueRoute.caller = _data.caller;
                    //console.log("/Mediator/ -actionRunner BACK!", props.cachedCatalogueRoute );


                    // Session.overrides.defeatUpdateCatalogue = true; // TEST REMOVE!!!
                    Session.overrides.setDefeatUpdateCatalogue( true, api.info.uid  );

                    actionRunner( "on-navigation-request", props.cachedCatalogueRoute );

                    // //console.log("/Mediator/ -actionRunner ", props.cachedCatalogueRoute );


                    /*_.delay( function () {
                        Session.dispatchCachedSessionVOs(); // TEST doesn't work
                    }, 999 );*/


                    // window.scroll( 0, 0)
                }
                break;

            case "on-paginator-request":

                window.scroll( 0, 0 );

                break;


            /*case "on-paginator-request":
             //console.log("******************** /Mediator/ -actionRunner ", _action, _data  );
             props.cachedCatalogueRoute.target.options.paginatorIndex = _data.index;
             break;*/


            // // *** TODO when coming back from detail page it looks like it is necessary for the selectors be refreshed, when one is interacted with
            // case "force-update":
            //     //console.log("/Mediator/ -actionRunner ", _action );
            //     break;

        }
    };


    const showHideSpinnerWhiteout = function ( _f ) {

        if( _f ){ // *** SHOW

            // FIXIT
            TweenMax.to( els.spinner, 0.3,
                {
                    opacity : 1,
                    onStart : function () {
                        els.spinner.classList.add( "is-initialising" );

                        TweenMax.to( els.whiteout, 0.3,
                            {
                                opacity : 1,
                                delay : 0.3,
                                onStart : function () {
                                    els.whiteout.classList.add( "is-initialising" );
                                }
                            } )
                    }
                });

        } else { // *** HIDE

            TweenMax.to( els.spinner, 0.3,
                {
                    opacity : 0,
                    onComplete : function () {
                        els.spinner.classList.remove( "is-initialising" );

                        TweenMax.to( els.whiteout, 0.3,
                            {
                                opacity : 0,
                                delay : 0.3,
                                onComplete : function () {
                                    els.whiteout.classList.remove( "is-initialising" );
                                }
                            } )
                    }
                });
        }
    };



    return {
        init : init,
        actionRunner : actionRunner
    }
}
