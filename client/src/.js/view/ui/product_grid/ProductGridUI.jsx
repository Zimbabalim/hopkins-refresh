"use strict";

/**
 * Zimbabalim
 * 12/05/2016
 */

import zz from "core/zz";
import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";
import classNames from "classnames";

import User from "model/User"; // my swatches only

import ProductItemUI from "view/ui/product_grid/ProductItemUI";
import MySwatchesProductItemUI from "view/ui/product_grid/MySwatchesProductItemUI";

export default function ProductGridUI( api ) {

    let events = {

    };

    let els = {
        el : null,
        reactEl : null
    };

    let props = {
        dataCached : null,
        mode : null, //*** 'catalogue' || 'mySwatches' - determine item type in render
        itemType : null,

        paginator : {
            chunks : [],
            numChunks : 0,
            currChunk : 0
        }
    };

    let uis = {
        component : null,
        paginatorReference : null
    };

    let _react = {
        component : null
    };

    const init = function ( _config ) {

        props.mode = _config.mode;

        if( props.mode === "catalogue" ){
            props.itemType = ProductItemUI;
        }

        if( props.mode === "mySwatches" ){
            props.itemType = MySwatchesProductItemUI;
        }

        create();

        /*let c = _.find( zz.getNodeByUid( api.info.parentUid ).children, function ( _v ) {
            return _v.name === "paginatorControlUI"
        });

        let paginatorNode = zz.getNodeByUid( c.uid );

        ////console.log("/ProductGridUI/ -init ", paginatorNode );*/
    };

    const create = function () {

        let i = 0,
            j = 0;

        _react.component = React.createClass({

            getInitialState : function () {
                return {
                    data : []
                }
            },

            componentDidMount : function () {
                uis.component = this;
                els.reactEl = ReactDOM.findDOMNode( this );
            },

            update : function ( _data ) {

                let data;

                if( !_data.data ){
                    _data.data = []; // *** ensure array exists
                }

                _.map( _data, function ( _values, _key ) {
                    data = _values;
                });

                this.setState({ data : data });
            },

            render : function () {

                j = 0;

                let label,
                    data;

                const create = ( _data ) => {

                    // if( !_data.data ){
                    //     ////console.log("/ProductGridUI/ -create FUCKED", _data );
                    // }

                    let item = new props.itemType;

                    item.init();
                    item.events.Sg_PRODUCT_ITEM_ACTION.add( actionRunner );

                    i++;

                    return React.createElement( item.getComponent(),
                        {
                            data: _data,
                            key : api.info.name + i + ":" + Date.now(),
                            uid : api.info.name + i + ":" + Date.now()
                            //index : i // *** TODO for animation maybe?
                        });
                };


                let noDataMsg;

                //////console.log("/ProductGridUI/ -render ", this.state.data );



                if( this.state.data.length === 0 ){

                    let text = "";

                    if( props.mode === "catalogue" ){
                        text = "No results available. Please make a new selection."
                    }

                    if( props.mode === "mySwatches" ){
                        text = "You don't have any swatches saved."
                    }

                    noDataMsg = <p className="no-results-msg">{ text }</p>;
                }

                let classes = classNames({
                    "product-grid" : true,
                    "catalogue" : ( props.mode === "catalogue" ),
                    "my-swatches" : ( props.mode === "mySwatches" )
                });


                return(
                    <div className={ classes }>
                        <ul className="products">{ this.state.data.map( create ) }</ul>

                        { noDataMsg }
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

        // ////console.log("/ProductGridUI/ -actionRunner ", _action, _data );

        switch( _action ){

            // *** TODO reset child indices so we can do some fancy staggered transition..?


            case "Sg_ROUTER_SHOW":

                // ////console.log("/ProductGridUI/ -actionRunner ????", _data.options.paginatorIndex );

                if( _data.options && _data.options.paginatorIndex ){
                    ////console.log("\n/ProductGridUI/ -actionRunner HAS INDEX", _data.options.paginatorIndex );

                    if( uis.paginatorReference ){
                        uis.paginatorReference.node.actionRunner( "force-index", { index : _data.options.paginatorIndex } );
                    }
                }


                break;

            case "update":

                ////console.log("/ProductGridUI/ -actionRunner UPDATE***", _data );

                paginator().init( _data );
                props.dataCached = _data;

                if( !uis.paginatorReference ){

                    let c = _.find( zz.getNodeByUid( api.info.parentUid ).children, function ( _v ) {
                        return _v.name === "paginatorControlUI"
                    });

                    if( props.mode === "catalogue" ){
                        uis.paginatorReference = zz.getNodeByUid( c.uid );
                        ////console.log("/ProductGridUI/ -*********** ", uis.paginatorReference );
                    }
                }


                /*window.c = function ( _n ) {
                    paginator().sendChunk( _n );
                };*/

                break;



            case "on-paginator-request":
                // ////console.log("/ProductGridUI/ -actionRunner ", _action, _data.index );

                if( _data.index === "view-all" ){

                    //////console.log("/ProductGridUI/ -actionRunner VIEW-ALL", props.dataCached.data[ 0 ] );
                    actionRunner( "update-from-paginator", { data : props.dataCached.data } );

                } else {
                    actionRunner( "update-from-paginator", { data : props.paginator.chunks[ _data.index ]} );
                }

                break;

            // TODO
            case "update-from-paginator":

                //////console.log("/ProductGridUI/ -actionRunner ", _action );

                let pre = 0;

                TweenMax.to( els.reactEl, 0.3,
                    { opacity : 0,
                        delay : pre,
                        ease : Sine.easeInOut,
                        onComplete : function () {

                            // ***************************
                            uis.component.update( _data );
                            // ***************************

                            TweenMax.to( els.reactEl, 0.2,
                                { opacity : 1,
                                    ease : Sine.easeOut,});
                        } } );

                break;



            case "on-image-clicked":

                /*let c = _.find( zz.getNodeByUid( api.info.parentUid ).children, function ( _v ) {
                 return _v.name === "paginatorControlUI"
                 });

                 let paginatorNode = zz.getNodeByUid( c.uid );*/

                // ////console.log("=========== /ProductGridUI/ -actionRunner ", c.uid, paginatorNode.node.props.currIndex );

                api.dispatchRequest({
                    action : "on-navigation-request",
                    data : {
                        caller : api.info.name,
                        target : zz.store.getRoute().byName( "details:" + _data.link )
                    }
                });

                break;


            case "remove-item-requested":

                User.remove( _data.link );

                actionRunner( "update", { // *** update self
                    data : User.getMySwatches()
                });

                break;

        }
    };

    const paginator = function(){

        return {

            init : function ( _data ) {

                let numChunks = ( Globals.viewport.isMobile ) ? Globals.paginator.mobileChunks : Globals.paginator.desktopChunks;

                //////console.log("/ProductGridUI/ -init NUM CHUNKS:", numChunks );

                props.paginator.chunks = _.chunk(  _data.data, numChunks );
                props.paginator.numChunks = props.paginator.chunks.length;
                props.paginator.currChunk = 0;

                api.dispatchRequest({
                    action : "init-paginator",
                    data : {
                        caller : api.info.name,
                        data : props.paginator
                    }
                });

                // ////console.log("**** /ProductGridUI/ paginator --init ");

                paginator().sendChunk( 0 );
            },

            sendChunk : function ( _index ) {
                actionRunner( "update-from-paginator", { data : props.paginator.chunks[ _index ]} );
            }
        }
    };


    return{
        els : els,
        init : init,
        getComponent : getComponent,
        actionRunner : actionRunner
    }
}