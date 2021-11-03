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
import Session from "model/Session";
import Autosuggest from 'react-autosuggest';

export default function FindDesignInputUI( api ) {

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

        props.data = Model.getVObyKey( "code_fragment_lookup" )["designs"];

        Session.events.Sg_SESSION_MODEL_CHANGED.add( function ( _args ) {
            actionRunner( _args.action, _args.data );
        });

        create();
    };


    const create = function () {

        _react.component = React.createClass({

            getInitialState : function () {
                return{
                    value: '',
                    suggestions: getSuggestions('')
                }
            },

            componentDidMount : function () {
                uis.component = this;
            },

            update : function ( _label ) {

                this.setState({
                    value: _label
                });

            },

            onChange : function (event, {newValue} ) {

                this.setState({
                    value: newValue
                });
            },

            onSuggestionsUpdateRequested : function( {value} ){

                this.setState({
                    suggestions: getSuggestions( value )
                });
            },


            render : function () {

                const { value, suggestions } = this.state;
                const inputProps = {
                    placeholder: 'e.g. egerton...',
                    value,/* : this.state.value,*/
                    onChange: this.onChange
                };


                return(

                    <div className="find-design-input">

                        <h3>FIND DESIGN</h3>

                        <Autosuggest suggestions={ suggestions }
                                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                                     getSuggestionValue={getSuggestionValue}
                                     renderSuggestion={renderSuggestion}
                                     inputProps={inputProps}
                                     onSuggestionSelected={ onSuggestionSelected }
                        />

                    </div>

                )

            }
        })
    };


    const getSuggestions = (value) => {

        const inputValue = value.trim().toLowerCase(),
            inputLength = inputValue.length;

        let r = (inputLength === 0) ? [] : props.data.filter(lang =>
            lang.label.toLowerCase().slice(0, inputLength) === inputValue
        );

        return r
    };

    const getSuggestionValue = (suggestion) => { // when suggestion selected, this function tells
        return suggestion.label;                 // what should be the value of the input
    };

    const renderSuggestion = ( suggestion ) => {

        return (
            <span>{ suggestion.label }</span>
        );
    };

    // --

    const onSuggestionSelected = ( event, { suggestion, suggestionValue, sectionIndex, method }) => {
        actionRunner( "on-selection", suggestion );
    };

    // ***

    const getComponent = function () {
        return _react.component;
    };



    const actionRunner = function( _action, _data ){

        switch( _action ){

            case "on-selection":

                Session.overrides.setDefeatUpdateCatalogue( false, api.info.uid );

                Session.addSelection( {
                    data : _data,
                    context : "design-selector",
                    caller : api.info.name
                } );


                api.dispatchRequest({
                    action : "on-navigation-request",
                    data : {
                        caller : api.info.name,
                        target : zz.store.getRoute().byName( "catalogue:" )
                    }
                });

                break;

            case "Sg_SESSION_MODEL_CHANGED":

                if( _data.currentContext === "design-selector" ){

                    if( _data.info.caller !== api.info.name ){ // *** NOTE display value in OTHER control in this one
                        uis.component.update( _data.designSelection.label );
                    }
                }

                break;

            case "reset-fabric-selector":

                uis.component.update( "" );

                Session.addSelection( {
                    data : {
                        code : "", name : "", label : ""
                    },
                    context : "design-selector",
                    caller : api.info.name
                } );

                break;

            case "force-update":

                if( _data.caller !== api.info.uid ){
                    //console.log("/FindDesignInputUI/ -actionRunner ", _action, _data.caller, api.info.uid, _data.caller === api.info.uid );
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