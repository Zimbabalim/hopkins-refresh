"use strict";

/**
 * Zimbabalim
 * 09/05/2016
 */

import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";

import Model from "model/Model";
import Session from "model/Session";
import CheckBoxUI from "view/ui/CheckBoxUI";

import MutationObserver from "utils/MutationObserver";


export default function FindColourPanelUI( api ) {

    let events = {

    };

    let els = {
        el : null, // *** raw dom element
        reactEl : null
    };

    let props = {
        //defaultSelectionScope : "scoped", // *** scoped || all
        defaultSelectionScope : Session.defaults.colourSelectionScope,
        currSelectionScope : null,

        checkboxProps : {
            numCheckboxes : 0, // TEST
            numCheckboxesChecked : 0 // TEST
        },

        expandProps : {
            isExpanded : false,
            expandedHeight : null,
            collapsedHeight : null,
            expandTime : 0.3,
            collapseTime : 0.2,
            expandDelay : 0.3,
            collapseDelay : 0
        }
    };

    let uis = {
        component : null
    };

    let _react = {
        component : null
    };

    const init = function ( _config ) {
        props.data = Model.getVObyKey( "colours", true );
        create();
    };

    const create = function () {

        let i = 0;

        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    defaultCheckedItem : Session.defaults.colourSelectionScope // *** NOTE!
                }
            },

            componentDidMount : function () {
                els.reactEl = ReactDOM.findDOMNode( this );
                uis.component = this;
            },

            update : function ( _metrics ) {

                // *** FIXIT causes ui error - checkbox won't update if colour selected
                // *** NOTE possibly not worth fixing
                /*if( !_metrics.all ){
                    let cb = this.refs["radio-btn-all"];
                    cb.checked = false;
                    //////console.log("/FindColourPanelUI/ -update SHOULD CHANGE RADIO BTN TO 'SCOPED'");
                }*/

            },

            onSelectionScopeChanged : function ( e ) {

                // //////console.log("/FindColourPanelUI/ -onSelectionScopeChanged ", e.nativeEvent.target.checked );

                let v = ( e.nativeEvent.target.checked ) ? "all" : "scoped";

                // actionRunner( "on-scope-changed", e.nativeEvent.target.value );
                actionRunner( "on-scope-changed", v );
            },

            onHeaderClicked : function () {
                expandCollapse();
            },


            // ***

            forceSelectAll : function ( _f, _update = true ) {

                _.map( this.refs, function ( _v, _key ) {

                    if( _key.indexOf( "checkbox" ) > -1 ){
                        // ////////console.log("/FabricSelectorPanelUI/ - ", _key );
                        _v.update( _f )
                    }
                });
            },



            render : function () {

                props.checkboxProps.numCheckboxes = 0;

                let label,
                    data;

                _.map( props.data, function ( _values, _key ) {
                    label = _key;
                    data = _values;
                });

                let create = function ( _data ) {

                    let item = new CheckBoxUI();
                    item.init();

                    item.events.Sg_CHECKBOX_CHANGED.add( function ( _data ) {
                        actionRunner( "on-selection-changed", _data );
                    } );

                    props.checkboxProps.numCheckboxes ++;

                    //i++;

                    let Checkbox = item.getComponent();

                    return (
                        <Checkbox
                            data={ _data }
                            key={ i }
                            ref={ "checkbox_" + ( i ++ ) }
                        />
                    )
                };


                return(
                    <div className="find-colour-panel">


                        <div className="header">
                            <h3 onClick={ this.onHeaderClicked }>FIND COLOUR <span><i className="icon icon-down-arrow"></i></span></h3>
                        </div>


                        <ul className="colours">{ props.data.map( create ) }</ul>

                        <ul className="context">

                            <li>
                                    <input ref={ "radio-btn-all" } id="radio-btn-all"
                                           type="checkbox" name="context"
                                           onChange={ this.onSelectionScopeChanged }/>

                                <label htmlFor="radio-btn-all">
                                    <span>SHOW ALL FABRICS IN SELECTED COLOUR</span>
                                </label>
                            </li>

                        </ul>

                    </div>
                );
            }
        })
    };

    const getComponent = function () {
        return _react.component;
    };

    const examineReactEl = () => {

        let m = new MutationObserver();
        m.watch( els.reactEl, function ( _rect ) {

            let totalHeight = _rect.height,
                headerHeight = els.reactEl.querySelector( ".header" ).getBoundingClientRect().height,
                collapsedHeight = totalHeight - headerHeight,
                z = 8; // *** offset to close gap

            props.expandProps.collapsedHeight = ( headerHeight - z );
            props.expandProps.expandedHeight = ( totalHeight - z );

            els.icon = els.reactEl.querySelector( ".icon" );

            actionRunner( "on-react-ready", null );
        } );
    };


    const expandCollapse = ( _f = null, _time = null ) => {

        // ////////////console.log("/FabricSelectorPanelUI/ -expandCollapse ", _f );

        let expandTime = ( _time !== null ) ? _time : props.expandProps.expandTime,
            collapseTime = ( _time !== null ) ? _time : props.expandProps.collapseTime,
            expandDelay = 0,
            collapseDelay = 0;

        if( _f === null ){

            props.expandProps.isExpanded = !props.expandProps.isExpanded;
            _f = props.expandProps.isExpanded;

            ////////////console.log("/FabricSelectorPanelUI/ -expandCollapse ", _f );

        } else {
            // //////////////console.log("/FabricSelectorPanelUI/ -expandCollapse EXPLICIT", props.expandProps );
            expandDelay = props.expandProps.expandDelay;
            collapseDelay = props.expandProps.collapseDelay;

            props.expandProps.isExpanded = _f;
        }

        ( _f ) ?
            tween( expandTime, props.expandProps.expandedHeight, expandDelay, "0deg" ) :
            tween( collapseTime, props.expandProps.collapsedHeight, collapseDelay, "-180deg" );


        function tween( _tm, _height, _delay, _rotation, _ease = Sine.easeInOut ) {


            TweenMax.to( els.reactEl, _tm,
                {
                    height : _height,
                    ease : _ease,
                    delay : _delay
                } );

            TweenMax.to( els.icon, _tm / 2,
                {
                    rotation : _rotation,
                    ease : _ease,
                    delay : _delay * 2
                } );

        }
    };


    const setHasSelectionClass = ( _f ) =>{

        ////////console.log("******* /FabricColourPanelUI/ -setHasSelectionClass ", props.checkboxProps.numCheckboxesChecked );

        if( props.checkboxProps.numCheckboxesChecked > 0 ){
            els.reactEl.classList.add("has-selection"); // TEST
        } else {
            els.reactEl.classList.remove("has-selection"); // TEST
        }


        if( _f === false ){ // *** force off
            els.reactEl.classList.remove("has-selection"); // TEST
        }
    };



    const update = function () {

    };

    const actionRunner = function( _action, _data ){

        // ////console.log("/FindColourPanelUI/ -actionRunner ", _action, _data );

        switch( _action ){

            case "Sg_ROUTER_SHOW":

                // FIXIT on back button fucks up - data is already passing "FIXME!" from router

                if( _data.options.name === "catalogue" && !props.isReactElReady ){
                    //////////console.log("/FindColourPanelUI/ -actionRunner ", _action );
                    examineReactEl();
                }

                if( _data.options.name === "catalogue" ){
                    actionRunner( "reset-fabric-selector", null );
                }

                break;

            case "on-react-ready": // *** once we have a bounding rectangle

                props.isReactElReady = true;
                expandCollapse( false, 0 );

                break;

            case "on-selection-changed":

                if( Session.overrides.getDefeatUpdateCatalogue() ){

                    api.dispatchRequest({
                        action : "force-update",
                        data : {
                            caller : api.info.uid
                        },
                        special : {
                            relay : false
                        }
                    });
                }


                props.checkboxProps.numCheckboxesChecked = ( _data.selected ) ?
                    props.checkboxProps.numCheckboxesChecked +=1 : props.checkboxProps.numCheckboxesChecked -=1;

                props.currSelectionScope = props.currSelectionScope || props.defaultSelectionScope;

                if( props.currSelectionScope === "all" ){

                    api.dispatchRequest({
                        action : "select-all-fabrics-request",
                        data : {
                            caller : api.info.name
                        }
                    });
                }

                // console.log("/FindColourPanelUI/ -actionRunner *************", _data );

                Session.addSelection( {
                    data : _data,
                    scope : props.currSelectionScope || props.defaultSelectionScope,
                    context : "colour-selector"
                } );

                setHasSelectionClass();

                break;


            // *** NOTE currently disabled
            case "on-scope-changed":

                //console.log("/FindColourPanelUI/ -actionRunner ", _action, _data );

                props.currSelectionScope = _data;

                if( props.checkboxProps.numCheckboxesChecked > 0 ){ // *** ???

                    if( props.currSelectionScope === "all" ){

                        // TEST
                        api.dispatchRequest({
                            action : "select-all-fabrics-request",
                            data : {
                                caller : api.info.name
                            }
                        });
                    }

                    Session.updateSelectionScope( "colour", props.currSelectionScope );

                } else {
                    // //////////console.log("/FindColourPanelUI/ -actionRunner SCOPE CHANGE DEFEATED");
                }

                break;


            // *** TODO possibly debounce this?
            case "on-product-model-change": // *** so we can change the context if fabric selection has changed, i.e from all to scoped if a fabric has been deselected

                //console.log("/FindColourPanelUI/ -actionRunner ", _action, _data.metrics.all );

                if( !_data.metrics.all ){
                    uis.component.update( _data.metrics ); // TEST RESTORE
                }

                break;


            case "reset-fabric-selector":

                //console.log("/FindColourPanelUI/ -actionRunner ", _action );


                if( !Session.overrides.getDefeatUpdateCatalogue() ) { // *** NOTE === prevent update if coming back from detail view
                    uis.component.forceSelectAll( false );
                    expandCollapse( false );

                    setHasSelectionClass( false ); // *** this is not bound to checkbox updating which is bad, but works TODO improve this!

                    // ***************
                    Session.clearVOByKey( "colourSelections", api.info.name );
                }


                /*uis.component.forceSelectAll( false );
                expandCollapse( false );

                setHasSelectionClass( false ); // *** this is not bound to checkbox updating which is bad, but works TODO improve this!

                // ***************
                Session.clearVOByKey( "colourSelections", api.info.name );*/
                // ***************

                break;

            case "force-update":

                if( _data.caller !== api.info.uid ){
                    //console.log("/FindColourPanelUI/ -actionRunner ", _action, _data.caller, api.info.uid, _data.caller === api.info.uid );
                }

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