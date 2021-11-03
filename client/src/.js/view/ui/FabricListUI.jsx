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

import Model from "model/Model";
import FabricSelectorPanelUI from "view/ui/FabricSelectorPanelUI";


export default function FabricListUI( api ) {

    let events = {

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

        props.data = Model.getUIDataByKey( "fabrics", true );

        // console.log('>>>>> /FabricListUI/ -init', props.data);

        // //console.log("/FabricListUI/ -init ", props.data = [props.data[0]] ); // REMOVE!!!

        create( this );
    };

    const create = function ( _scope ) {

        let i = 0,
            j = 0;

        _react.component = React.createClass({

            getInitialState : function () {
                return null
            },

            componentDidMount : function () {
                // ////console.log("**** /FabricListUI/ -componentDidMount ", props.data.length );

                Globals.ui_info.numFabricSelectorComponents = props.data.length; // *** experiment - use this value to defer spamming model on 'all' updates
            },

            update : function () {

            },

            render : function () {

                let create = function ( _data ) {


                    let item = new zz.Node( _scope, FabricSelectorPanelUI, { name : "fabricSelectorPanelUI_" + i });
                    item.init();


                    let FabricSelectorPanel = item.getComponent();

                    return (
                        <FabricSelectorPanel
                            data={ _data }
                            key={ i++ }
                            index={ j ++ }
                            totalNumSelectors={ props.data.length }
                        />
                    )

                };

                //<div>{ props.data.map( create ) }</div>
                //<div>{ _.each( props.data, function( _v ){ create( _v ) } ) }</div>

                return(
                    <div className="fabric-selectors">
                        <h3>FABRIC</h3>
                        <div>{ props.data.map( create ) }</div>
                    </div>
                )

            }
        })
    };

    const getComponent = function () {
        return _react.component;
    };


    const update = function () {

    };

    const actionRunner = function( _action, _data ){

    };

    return{
        els : els,
        init : init,
        getComponent : getComponent,
        actionRunner : actionRunner
    }
}
