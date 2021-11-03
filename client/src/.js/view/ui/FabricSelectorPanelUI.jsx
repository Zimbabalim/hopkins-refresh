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

import Session from "model/Session";
import CheckBoxUI from "view/ui/CheckBoxUI";

import MutationObserver from "utils/MutationObserver";
import Model from "model/Model";


export default function FabricSelectorPanelUI( api ) {

    let events = {

    };

    let els = {
        el : null,
        reactEl : null,
        icon : null
    };

    let props = {
        fabricKey : null,
        cachedData : [], // *** pushed in by react method
        itemUids : null,
        isCurrentlyActive : false,

        index : null,
        totalNumSelectors : null,

        isAllSelected : null, // TEST

        checkboxProps : {
            numCheckboxes : 0, // TEST
            numCheckboxesChecked : 0 // TEST
        },

        isReactElReady : false,

        expandProps : {
            isExpanded : false,
            expandedHeight : null,
            collapsedHeight : null,
            expandTime : 0.3,
            collapseTime : 0.2,
            expandDelay : 0.3,
            collapseDelay : 0
        },

        pendingMethod : null,

        isBatchProcess : false // *** TEST to circumvent the model spamming effect
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

        let i = 0;

        _react.component = React.createClass({

            getInitialState : function () {

                return {
                    isExpanded : false,
                    hasSelection : false // TEST
                }
            },

            componentWillMount : function () {
                props.index = this.props.index;
                props.fabricKey = _.keys( this.props.data )[ 0 ]; // *** store name of data set (i.e. 'silk', 'cotton' etc) for use as an identifier
                props.totalNumSelectors = this.props.totalNumSelectors;
                props.fabricLabel = Model.getVObyKey( "nav_items" )[props.index].label; // NOTE updated may 2019 - careful with this!
            },

            componentDidMount : function () {

                // props.index = this.props.index;

                uis.component = this;
                els.reactEl = ReactDOM.findDOMNode( this );
                // props.fabricKey = _.keys( this.props.data )[ 0 ]; // *** store name of data set (i.e. 'silk', 'cotton' etc) for use as an identifier

                if( !props.itemUids ){ // *** create list of all possible values for easy retrieval

                    props.itemUids = [];

                    _.each( this.props.data, function ( _v ) {
                        _.each( _v, function ( _vv ) {
                            _.find( _vv, function ( _vvv ) {
                                props.itemUids.push( _vvv.uid );
                                // props.itemUids.push( _vvv.uid + ":" + props.fabricKey ); // RESTORE 1107
                            } );
                        });
                    });

                    // ////console.log("/FabricSelectorPanelUI/ -componentDidMount ", props.itemUids );
                }
            },

            componentWillUnmount : function () {

            },

            /*shouldComponentUpdate : function () {
             ////console.log("/FabricSelectorPanelUI/ -componentDidUpdate ");
             return false
             },*/

            update : function () {

            },

            forceExpand : function ( _f ) {

            },

            onHeaderClicked : function () {
                expandCollapse();
            },

            forceSelectAll : function ( _f, _update = true ) {

                let cb = this.refs[ "all-checkbox" ];
                cb.checked = _f;
                props.isAllSelected = _f; // TEST TODO looks like this is could be set twice rapidly FIXIT?

                if( _update ){
                    this.onAllChange( null, _f );
                } else {

                }
            },

            onAllChange : function ( e, _f = null ) {

                let checked = ( e ) ? e.target.checked : _f;
                //////console.log("/FabricSelectorPanelUI/ -onAllChange ", checked );

                props.isAllSelected = checked; // TEST TODO looks like this is could be set twice rapidly FIXIT?

                if( e ){ // *** must have been clicked
                    props.isCurrentlyActive = true;
                }

                _.map( this.refs, function ( _v, _key ) {

                    if( _key !== "all-checkbox" ){
                        // ////////console.log("/FabricSelectorPanelUI/ - ", _v );
                        _v.update( checked, _f )
                    }

                });

                actionRunner( "on-all-selection-changed", { selected : checked } );
            },

            // *** TEST 260916
            /*automateSelection : function ( _data ) {
             ////console.log("/FabricSelectorPanelUI/ -automateSelection ", _data );
             },*/


            /**
             * when coming back from detail view, we don't update this component. on making a selection we have to renable it (via session model)
             * however any previously selected items are ignored as we are only using change event on the checkboxes.
             * this method scans to see which items are checked and returns an array (does not include the item that was just checked/unchecked)
             * @param _currentSelected
             * @returns {Array}
             */
            getListOfCheckedItems : function ( _currentSelected ) {


                let list = [];

                _.map( this.refs, function ( _v, _key ) {

                    if( _key !== "all-checkbox" ){

                        if( _v.state.isSelected ){

                            let d = _v.props.data[ _.keys( _v.props.data ) ],
                                uid = d.uid;

                            if( _currentSelected && uid === _currentSelected.id && !_currentSelected.selected ){
                                // //console.log("ZIM /FabricSelectorPanelUI/ - SHOULD NOT INCLUDE", uid );
                            } else {
                                list.push( { id : uid, selected : _v.state.isSelected } );
                            }
                        }
                    }
                });

                // //console.log("\nZIM /FabricSelectorPanelUI/ -getListOfCheckedItems ", list, _currentSelected );

                return list;

            },

            render : function () {

                props.checkboxProps.numCheckboxes = 0;

                let label,
                    data;

                _.map( this.props.data, function ( _values, _key ) {
                    label = props.fabricLabel || _key; // NOTE updated may 2019 - careful with this!
                    data = _values;
                });

                // console.log('???? /FabricSelectorPanelUI/ -render', this.props);

                // + ":" + props.fabricKey
                // ////console.log("/FabricSelectorPanelUI/ -render ", label, data );

                const create = ( _data ) => {

                    let item = new CheckBoxUI();
                    item.init();

                    props.checkboxProps.numCheckboxes ++;

                    // item.events.Sg_CHECKBOX_CHANGED.add( onSelectionChanged );
                    item.events.Sg_CHECKBOX_CHANGED.add( function ( _data ) {
                        //uis.component.setState({ hasSelection: true }); // breaks it

                        //Session.overrides.setDefeatUpdateCatalogue( false ); // TEST

                        actionRunner( "on-selection-changed", _data );
                    } );

                    let Checkbox = item.getComponent();

                    let d = _data[ _.keys( _data ) ];
                    d.context = props.fabricKey;

                    // ////console.log("/FabricSelectorPanelUI/ -create ***", i, d.uid, props.fabricKey );

                    return (
                        <Checkbox
                            key={ d.uid + ":" + props.fabricKey }
                            data={ _data }
                            ref={ "checkbox_" + ( i ++ ) }
                        />
                    );
                };

                i = 0;

                return(

                    <div className="fabric-selector-panel">

                        <div className="header">
                            <h4 onClick={ this.onHeaderClicked }>{ label }<span><i className="icon icon-down-arrow"></i></span></h4>
                        </div>

                        <ul>
                            <li className="standard-checkbox" key={ props.fabricKey }>
                                <input type="checkbox" id={ props.fabricKey } onChange={ this.onAllChange } ref={ "all-checkbox" } />
                                <label htmlFor={ props.fabricKey }>ALL</label>
                            </li>
                            { data.map( create ) }
                        </ul>
                    </div>
                );

            }
        })
    };

    const getComponent = function () {
        return _react.component;
    };


    const update = function () {

    };


    const examineReactEl = () => {

        let m = new MutationObserver();
        m.watch( els.reactEl, function ( _rect ) {

            let totalHeight = _rect.height,
                headerHeight = els.reactEl.querySelector( ".header" ).getBoundingClientRect().height,
                collapsedHeight = totalHeight - headerHeight;

            props.expandProps.collapsedHeight = headerHeight;
            props.expandProps.expandedHeight = totalHeight + headerHeight;

            ////////////console.log("/FabricSelectorPanelUI/ -examineReactEl ????", totalHeight, headerHeight , collapsedHeight );

            els.icon = els.reactEl.querySelector( ".icon" );

            actionRunner( "on-react-ready", null );
        } );
    };


    const expandCollapse = ( _f = null, _time = null ) => {

        // //////////console.log("/FabricSelectorPanelUI/ -expandCollapse ", _f );

        let expandTime = ( _time !== null ) ? _time : props.expandProps.expandTime,
            collapseTime = ( _time !== null ) ? _time : props.expandProps.collapseTime,
            expandDelay = 0,
            collapseDelay = 0;

        if( _f === null ){

            props.expandProps.isExpanded = !props.expandProps.isExpanded;
            _f = props.expandProps.isExpanded;

            //////////console.log("/FabricSelectorPanelUI/ -expandCollapse ", _f );

        } else {
            // ////////////console.log("/FabricSelectorPanelUI/ -expandCollapse EXPLICIT", props.expandProps );
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


    const setHasSelectionClass = () =>{

        if( props.checkboxProps.numCheckboxesChecked > 0 ){
            els.reactEl.classList.add("has-selection"); // TEST
        } else {
            els.reactEl.classList.remove("has-selection"); // TEST
        }
    };



    const actionRunner = function( _action, _data ){

        // ////console.log( props.fabricKey, "/FabricSelectorPanelUI/ -actionRunner ", _action, _data, api.info.name );

        switch( _action ){

            case "Sg_ROUTER_SHOW":

                // ////////////console.log("/FabricSelectorPanelUI/ -actionRunner READY???", props.isReactElReady, props.expandProps.expandedHeight );

                if( _data.options.name === "catalogue"&& !props.isReactElReady ){
                    ////////////console.log("/FabricSelectorPanelUI/ -actionRunner SHOULD PROCESS");
                    examineReactEl();
                }

                break;

            case "on-react-ready": // *** once we have a bounding rectangle

                props.isReactElReady = true;
                expandCollapse( false, 0 );

                if( props.pendingMethod ){
                    _.delay( props.pendingMethod, 0 );
                }

                break;


            case "on-selection-changed":

                // //console.log( api.info, "/FabricSelectorPanelUI/ -actionRunner ***** UPDATE *****"/*, _data, Session.overrides.getDefeatUpdateCatalogue()*/ );

                // *** NOTE if coming back from detail page and reactivating on selection change, missing already selected items
                if( Session.overrides.getDefeatUpdateCatalogue() ){

                    let alreadySelectedItems = uis.component.getListOfCheckedItems( _data );

                    _.each( alreadySelectedItems, function ( _v ) {

                        Session.addSelection( {
                            data : _v,
                            context : "fabric-selector"
                        } );
                    } );

                    // *** NOTE only release defeatupdatecatalogue once we have traversed all of the fabric selectors
                    if( props.index === (props.totalNumSelectors-1) ){
                        Session.overrides.setDefeatUpdateCatalogue( false, api.info.uid  );
                    }
                }

                // *************************

                props.checkboxProps.numCheckboxesChecked = ( _data && _data.selected ) ?
                    props.checkboxProps.numCheckboxesChecked +=1 : props.checkboxProps.numCheckboxesChecked -=1;

                if( props.checkboxProps.numCheckboxesChecked === props.checkboxProps.numCheckboxes ){
                    uis.component.forceSelectAll( true, false ); // *** check all, but don't update
                } else {
                    uis.component.forceSelectAll( false, false ); // *** uncheck all, but don't update
                }

                setHasSelectionClass();
                props.isCurrentlyActive = true;


                if( _data ){
                    Session.addSelection( {
                        data : _data,
                        context : "fabric-selector"
                    } );
                }

                // uis.component.forceUpdate(); // TEST REMOVE - mobile version not working with offscreen


                break;


            case "on-all-selection-changed":

                Session.overrides.setDefeatUpdateCatalogue( false, api.info.uid  ); // TEST

                props.checkboxProps.numCheckboxesChecked = ( _data.selected ) ? props.checkboxProps.numCheckboxes : 0;

                if( props.isCurrentlyActive ){ // *** stops selection being cleared if this is not the active ui

                    Session.addDataAsSimpleArray( {
                        data : _.clone( props.itemUids ),
                        context : "fabric-selector",

                        process : {
                            index : props.index,
                            isBatchProcess : props.isBatchProcess
                        }

                    }, !_data.selected );
                }

                setHasSelectionClass();

                break;

            case "update-fabric-selector":

                ////console.log("**** /FabricSelectorPanelUI/ -actionRunner ", _action );

                if( !Session.overrides.getDefeatUpdateCatalogue() ){ // *** NOTE === prevent update if coming back from detail view

                    let f = ( _data.query === props.fabricKey );

                    props.isCurrentlyActive = f;
                    uis.component.forceSelectAll( f );

                    if( !props.isReactElReady ){
                        props.pendingMethod = function () { // *** need this shit
                            expandCollapse( f );
                        }
                    } else {
                        expandCollapse( f );
                    }
                }


                break;


            case "reset-fabric-selector":

                uis.component.forceSelectAll( false );
                expandCollapse( false );

                break;


            case "force-fabric-selector-select-all": // *** when colour selector scope is 'all' we want all fabrics to become selected

                ////console.log("#### /FabricSelectorPanelUI/ -actionRunner ", _action );

                // *************************
                props.isBatchProcess = true;
                // *************************

                // ////////console.log( "*****", props.fabricKey, "/FabricSelectorPanelUI/ -actionRunner ", _action, "props.isBatchProcess", props.isBatchProcess );

                props.isCurrentlyActive = true; // *** FIXIT don't know how to handle this..!

                uis.component.forceSelectAll( true );

                if( !props.isReactElReady ){
                    props.pendingMethod = function () { // *** need this shit
                        expandCollapse( true );
                    }
                } else {
                    expandCollapse( true );
                }

                // *************************
                props.isBatchProcess = false;
                // *************************

                // ////////console.log( props.fabricKey, "/FabricSelectorPanelUI/ -actionRunner ", _action, "props.isBatchProcess", props.isBatchProcess );

                break;


            case "force-update":

                // //console.log("/FabricSelectorPanelUI/ -actionRunner ", _action, _data.caller, _data.info.uid );

                if( _data.caller !== api.info.uid ){
                    //console.log("/FabricSelectorPanelUI/ -actionRunner ", _action, _data.caller, api.info.uid, _data.caller === api.info.uid );

                    actionRunner( "on-selection-changed", null ); // TEST
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
