/**
 * Zimbabalim
 * main library surface - should just be an api
 */
"use strict";


import Factory from "core/Factory";
import Router from "core/router/Router";
import Store from "core/Store";

let zz = {

    defaults : {
        logLevel : 1,
        namespace : "rezzica",
        namespaceAlias : "zz"
    },

    init : function(){
        //console.log("/zz/ -init ");
        //Logger.logo();
    },

    /**
     * method to start router after some stuff has been defined by user
     */
    start : function(){
        Router.init();
    },

    /**
     *
     * @param _parent
     * @param _class
     * @param _config
     */
    createNode : function( _parent, _class, _config ){
        return Factory.createNode( _parent, _class, _config );
    },

    /**
     *
     * @param _uid
     */
    getNodeByUid : function( _uid ){
        return Store.get().byUid( _uid );
    },

    getNodeByIndex : function( _index ){
        return {
            node : Store.get().nodeByIndex( _index ),
            of : Store.props.numNodes
        }
    },

    getRootNode : function( _id ){
        return Store.get().root( _id );
    }
    
};

export default {
    defaults : zz.defaults,
    init : zz.init,
    Node : zz.createNode,
    getNodeByUid : zz.getNodeByUid,
    getNodeByIndex : zz.getNodeByIndex,
    getRootNode : zz.getRootNode,
    router : Router,
    start : zz.start,
    store : Store
}









