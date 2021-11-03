"use strict";

/**
 * Zimbabalim
 * 09/05/2016
 */

import zz from "core/zz";
import Globals from "Globals";
import React from "react";
import ReactDOM from "react-dom";

import HeaderUI from "view/shell/HeaderUI";
import MainNavUI from "view/shell/MainNavUI";
import FooterUI from "view/shell/FooterUI";
//
import HomeView from "view/pages/home/HomeView";
import CatalogueView from "view/pages/catalogue/CatalogueView";
import DetailView from "view/pages/detail/DetailView";
import SundriesView from "view/pages/sundries/SundriesView";
import MySwatchesView from "view/pages/my_swatches/MySwatchesView";

import TransitionMixin from "utils/TransitionMixin";


export default function MainLayout( api ){

    let els = {
        header : document.getElementById( "header" ),
        mainNav : document.getElementById( "main-nav" ),
        content : document.getElementById( "content" ),
        footer : document.getElementById( "footer" ),

        homeView : document.getElementById( "home-view" ),
        catalogueView : document.getElementById( "catalogue-view" ),
        detailView : document.getElementById( "detail-view" ),
        sundriesView : document.getElementById( "sundries-view" ),
        mySwatchesView : document.getElementById( "myswatches-view" )
    };


    const init = function(){
        create( this ); // *** NOTE 'this' scope differs in es6, have to pass in from here, don't know why
    };


    const create = function ( _scope ) {

        // *** HEADER
        var headerUI = new zz.Node( _scope, HeaderUI, { name : "headerUI" });
        headerUI.init( { el : els.header, render : true } );

        // *** MAIN NAV
        var mainNavUI = new zz.Node( _scope, MainNavUI, { name : "mainNavUI" });
        mainNavUI.init( { el : els.mainNav, render : true } );

        // *** FOOTER
        var footerUI = new zz.Node( _scope, FooterUI, { name : "footerUI" });
        footerUI.init( { el : els.footer, render : true, mixins : [ new TransitionMixin() ] } );

        // *** CONTENT *****************************************************

        // *** HOME
        var homeView = new zz.Node( _scope, HomeView, { name : "homeView" });
        homeView.init( { el : els.homeView, render : true, mixins : [ new TransitionMixin() ] } ); // *** TEST mixin

        // *** CATALOGUE
        var catalogueView = new zz.Node( _scope, CatalogueView, { name : "catalogueView" });
        catalogueView.init( { el : els.catalogueView, render : true, mixins : [ new TransitionMixin() ] } );

        // *** DETAIL
        var detailView = new zz.Node( _scope, DetailView, { name : "detailView" });
        detailView.init( { el : els.detailView, render : true, mixins : [ new TransitionMixin() ] } );

        // *** SUNDRIES
        var sundriesView = new zz.Node( _scope, SundriesView, { name : "sundriesView" });
        sundriesView.init( { el : els.sundriesView, render : null, mixins : [ new TransitionMixin() ] } );

        // *** MY SWATCHES RESTORE!
        var mySwatchesView = new zz.Node( _scope, MySwatchesView, { name : "mySwatchesView" });
        mySwatchesView.init( { el : els.mySwatchesView, render : true, mixins : [ new TransitionMixin() ] } );

        ////////console.log("/MainLayout/ -create FINISHED?");
    };


    const actionRunner = function( _action, _data ){
        //////console.log("/MainLayout/ -actionRunner ", _action, _data );
    };

    return {
        init : init,
        actionRunner : actionRunner
    }
}