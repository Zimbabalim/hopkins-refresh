"use strict";

/**
 * Zimbabalim
 * 12/05/2016
 */

import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";

import SundriesSv from "service/SundriesSv";


export default function SundriesView( api ) {

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

        getData(); // *** TODO only load this when page is hit (first time), rather than loading in up front
    };


    const getData = () =>{

        /*DummySundriesDataSv.events.Sg_SERVICE_RESPONSE.add( function ( _data ) {

            props.data = _data.data.items;

            // *****
            create();
            render();
            // *****
        } );

        DummySundriesDataSv.call();*/


        SundriesSv.events.Sg_SERVICE_RESPONSE.addOnce( function ( _result ) {

            //////console.log("/SundriesView/ - ***INIT*** GOT DATA", _result.data );

            props.data = _result.data;

            create();
            render();

            //uis.component.update( _result.data );
        });

        SundriesSv.call( "get-all", null );
    };


    const create = function () {

        _react.component = React.createClass({

            getInitialState : function () {
                return null
            },

            componentDidMount : function () {

            },

            update : function () {

            },

            render : function () {

                let i = 0;

                const create = ( _item ) => {

                    let images = <span dangerouslySetInnerHTML={{__html: "&nbsp;" }} />, // *** to stop el collapse if no images
                        j = 0;

                    if( _item.images.length > 0 ){

                        images = [];

                        _.each( _item.images, function ( _v ) {
                            images.push(
                                <img src={ Globals.paths.sundries_images + _v } key={ j++ }/>
                            )
                        } );
                    }


                    return(
                        <li className="article" key={ i++ }>
                            <div className="hbox">

                                <div>
                                    { images }
                                </div>

                                <div>
                                    <div className="headline-panel">
                                        <h4>
                                            { _item.headline }
                                            <span>
                                                { _item.date }
                                            </span>
                                        </h4>
                                    </div>

                                    <div className="copy-panel">
                                        <p dangerouslySetInnerHTML={{__html: _item.copy }} />
                                    </div>
                                </div>
                            </div>
                        </li>
                    )

                };


                return (
                    <div className="hbox">

                        <div className="sidebar">
                            <h3 className="solo-item">SUNDRIES</h3>
                        </div>

                        <div className="content-area">
                            <ul className="articles">{ props.data.map( create ) }</ul>
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

        switch( _action ){

            case "show":
                props.transitionMixin.showHide( true );
                break;

            case "hide":
                props.transitionMixin.showHide( false );
                break;

        }

    };

    return{
        els : els,
        init : init,
        actionRunner : actionRunner
    }
}