"use strict";

/**
 * Zimbabalim
 * 09/05/2016
 */

import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";
import signals from "signals";


export default function CheckBoxUI() {

    let events = {
        Sg_CHECKBOX_CHANGED : new signals.Signal
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

        // type = radio || check
        
        // //////console.log("/CheckboxUI/ -init ");

        create();
    };

    const create = function () {

        //let foo = false;

        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    id : null,
                    uid : null,
                    isSelected : false
                    //isCheckedTest : false
                }
            },

            componentDidMount : function () {

            },

            componentDidUpdate : function () {
                // console.warn("/CheckboxUI/ -componentDidUpdate ", this.state.uid, this.state.isSelected );
            },


            onChange : function ( e/*, _f = null*/ ) {

                // //////console.log("------------- /CheckboxUI/ -onChange ", this.state.uid );

                let checked;
                checked = e.target.checked;

                //////console.log("/CheckboxUI/ -onChange ", this.state.uid, checked );

                this.setState({
                    isSelected: checked
                });

                let d = this.props.data[ _.keys( this.props.data ) ],
                    uid = d.uid;

                /*if( d.context ){
                    uid += ":" + d.context;
                }*/

                //////console.log("****** /CheckboxUI/ -onChange ", d.uid, d.context );

                events.Sg_CHECKBOX_CHANGED.dispatch({
                    // id : this.state.uid,
                    id : uid,
                    selected : checked
                });


            },

            // *** TODO extend this to accept ids to match against
            update : function ( _isChecked ) {

                    this.setState({
                        isSelected: _isChecked
                    }, function () {
                        //////console.log("/CheckboxUI/ - STATE", this.state.isSelected );
                    });
            },

            getCheckedState : function () {

                /*let d = this.props.data[ _.keys( this.props.data ) ],
                    uid = d.uid;*/

              ////console.log("/CheckboxUI/ -getCheckedState ", this.state.isSelected );
                return this.state.isSelected;
            },

            render : function () {

                let key,
                    data;

                _.map( this.props.data, function ( _values, _key ) {
                    key = _key;
                    data = _values;
                });


                /**
                 * FIXIT
                 * random number thing fixes the weird checkbox binding across fabric selectors
                 * can't seem to pass a fabricKey that is correct onChange
                 * need this to update the session model properly
                 * will also need to be a predictable value like fabricKey so that we can append it the props.itemUids ->
                 * in fabric selector that passes when 'all' clicked
                 */

                this.state.uid = data.uid + ":" + Math.random(); // *** NOTE seem to need the random number!

                if( data.context ){
                    this.state.uid += ":" + data.context;
                }

                // ////console.log("/CheckboxUI/ -render ", data.context );

                return(
                    <li className="standard-checkbox" key={ this.state.uid }>
                        <input type="checkbox" id={ this.state.uid } onChange={ this.onChange } checked={ this.state.isSelected } />
                        <label htmlFor={ this.state.uid }>{ data.label }</label>
                    </li>
                );
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
        events : events,
        els : els,
        init : init,
        getComponent : getComponent,
        actionRunner : actionRunner
    }
}