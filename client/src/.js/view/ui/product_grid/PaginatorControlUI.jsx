"use strict";

/**
 * Zimbabalim
 * 21/07/2016
 */

import zz from "core/zz";
import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";
import classNames from "classnames";

import Model from "model/Model";
import FabricSelectorPanelUI from "view/ui/FabricSelectorPanelUI";

import Session from "model/Session";


export default function PaginatorControlUI( api ) {

    let events = {

    };

    let els = {
        el : null // *** raw dom element
    };

    let props = {
        currIndex : 0
    };

    let uis = {
        component : null
    };

    let _react = {
        component : null
    };

    const init = function ( _config ) {

        create( this );
    };

    const create = function ( _scope ) {

        let i = 0,
            j = 0;

        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    data : null,
                    currIndex : 0
                }
            },

            componentDidMount : function () {
                uis.component = this;
                els.reactEl = ReactDOM.findDOMNode( this );
            },

            update : function ( _data ) {
                ////console.log("********** /PaginatorControlUI/ -update ", _data );

                props.currIndex = 0;
                this.setState({ data : _data, currIndex : 0 });
            },

            onClicked : function ( e ) {

                let index = parseInt( e.target.dataset.index, 10 );
                // props.currIndex = index;
                this.setState({ currIndex : index });

                actionRunner( "dispatch-request", { index : index });
            },

            forceSetIndex : function ( _index ) {
                ////console.log("/PaginatorControlUI/ -forceSetIndex ", _index );

                // props.currIndex = _index;
                this.setState({ currIndex : _index });
                actionRunner( "dispatch-request", { index : _index });
            },

            onArrowClicked : function ( e ) {

                //////console.log("/PaginatorControlUI/ -onArrowClicked ", e.target, this.state.currIndex );

                if( _.isString( this.state.currIndex ) ){
                    //////console.log("/PaginatorControlUI/ -onArrowClicked NAN");
                    // props.currIndex = 0;
                    this.setState({ currIndex : 0 });
                    actionRunner( "dispatch-request", { index : 0 });
                    return;
                }


                let type = e.target.dataset.arrow,
                    ci = this.state.currIndex,
                    pass = false;

                if( type === "prev" && this.state.currIndex > 0 ){
                    ci --;
                    pass = true;
                }

                if( type === "next" && this.state.currIndex < ( this.state.data.data.numChunks - 1 ) ){
                    ci ++;
                    pass = true;
                }

                // ////console.log("/PaginatorControlUI/ -onArrowClicked PASS?", type, pass );

                if( pass ){
                    // props.currIndex = ci;
                    ////console.log("/PaginatorControlUI/ -onArrowClicked ", ci );
                    this.setState({ currIndex : ci });
                    // actionRunner( "dispatch-request", { index : this.state.currIndex });
                    actionRunner( "dispatch-request", { index : ci });
                }
            },

            onViewAllBtnClicked : function ( e ) {
                this.setState({ currIndex : "#" });
                actionRunner( "dispatch-request", { index : "view-all" });
            },

            render : function () {

                let items_$ = [],
                    shouldEnable = ( this.state.data && this.state.data.data.numChunks >= 2 );

                if( shouldEnable ){

                    if( !Globals.viewport.isMobile ){ // *** DESKTOP

                        for( var i = 0; i < this.state.data.data.numChunks; i ++ ){
                            items_$.push(
                                <li
                                    className={ ( this.state.currIndex === i ) ? "is-active" : "" }
                                    onClick={ this.onClicked }
                                    data-index={ i }>{ i + 1 }
                                </li>
                            );
                        }
                    } else { // *** MOBILE

                        let text = ( _.isString( this.state.currIndex ) ) ? "* / " + this.state.data.data.numChunks :
                            ( this.state.currIndex + 1 ) + " / " + this.state.data.data.numChunks;

                        items_$.push(
                            <li className="is-mobile-indicator">{ text }</li>
                        );

                        //<li className="is-mobile-indicator">{ ( this.state.currIndex + 1 ) } &#47; { this.state.data.data.numChunks }</li>
                    }
                }

                let classes = classNames({
                    "paginator-control" : true,
                    "is-enabled" : shouldEnable
                });

                let viewAllClasses = classNames({
                    "view-all-btn" : true,
                    "view-all-selected" : ( _.isString( this.state.currIndex ) )
                });


                return(
                    <div className={ classes }>

                        <ul>
                            <li className={ viewAllClasses } onClick={ this.onViewAllBtnClicked }><span>VIEW ALL</span></li>
                            <li className="arrow">
                                <i className="icon icon-left-arrow" onClick={ this.onArrowClicked } data-arrow="prev"></i>
                            </li>
                            { items_$ }
                            <li className="arrow">
                                <i className="icon icon-right-arrow" onClick={ this.onArrowClicked } data-arrow="next"></i>
                            </li>
                        </ul>


                        <ul className="bottom-paginator">
                            <li className={ viewAllClasses } onClick={ this.onViewAllBtnClicked }><span>VIEW ALL</span></li>
                            <li className="arrow">
                                <i className="icon icon-left-arrow" onClick={ this.onArrowClicked } data-arrow="prev"></i>
                            </li>
                            { items_$ }
                            <li className="arrow">
                                <i className="icon icon-right-arrow" onClick={ this.onArrowClicked } data-arrow="next"></i>
                            </li>
                        </ul>


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


        switch( _action ){

            case "init-paginator":

                uis.component.update( _data );
                Session.paginatorBridge.setRef( props );

                break;

            case "dispatch-request":

                props.currIndex = _data.index;
                // ////console.log("/PaginatorControlUI/ -actionRunner DISPATCH", props.currIndex );

                api.dispatchRequest({
                    action : "on-paginator-request",
                    data : _data
                });

                break;

            case "force-index":
                uis.component.forceSetIndex( _data.index );

                break;
        }
    };

    return{
        props : props,
        els : els,
        init : init,
        getComponent : getComponent,
        actionRunner : actionRunner
    }
}