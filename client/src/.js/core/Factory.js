/**
 * Zimbabalim
 */
"use strict";


//_, Validator, Node, Store, Constants


import Node from "core/Node";
import Validator from "core/Validator";
import Store from "core/Store";
import Constants from "core/Constants";

let Factory = {

    metrics : {
        counter : 0,
        rootCounter : 0
    },

    /**
     * create a concrete node object by extending provided class and options with abstract node object
     * @param _parent
     * @param _class
     * @param _config
     * @returns {{}}
     */
    createNode : function( _parent, _class, _config ){

        // console.log("/Factory/ -createNode ", _config[ "name" ] );
        // console.log("/Factory/ -createNode --PARENT?", _parent );

        var meta = createMetaVO(),
            node = new Node( meta ),
            client = new _class( node.api ),
            result = {};

        if( !Validator.validate( "node", { child : client, config : _config } ) ){ return }

        result = _.extend( client, node );
        meta.node = result; // TEST - rather not have circular refs to this in abstract node
        result._init();
        Store.add().node( meta ); // *** TODO memory profiling and mutability check..? NOTE - maybe store the whole lot in one place? Then lookup if needed?

        subscribeToEventStream();

        function createMetaVO(){

            var vo = {},
                hasName = ( _config && _config.name ),// OPTIMISE
                hasSlug = ( _config && _config.slug ),// OPTIMISE
                hasParent = ( !!_parent );

            //vo.name = _.snakeCase( ( hasName ) ? _config.name : "zzNode" + Factory.metrics.counter );
            vo.name = ( hasName ) ? _config.name : "zzNode" + Factory.metrics.counter; // *** TODO is snake case really necessary? - should leave it to the user
            vo.slug = ( hasSlug ) ? _config.slug : _.kebabCase( vo.name );
            vo.uid = ( vo.name + "@" ) + Factory.metrics.counter++;

            if( hasParent ){
                var d =_parent.api.info.depth;
                vo.depth = d +=1;
            } else {
                vo.depth = 0;
            }

            vo.isRoot = !hasParent;
            vo.parentUid =  ( hasParent ) ? _parent.api.info.uid : null;
            vo.children = [];


            if( hasParent ){

                // console.log("/Factory/ -createMetaVO --hasParent");

                //_parent._update( "children", vo.uid );

                _parent._update( "children", { // *** virtually the same as a router vo, but not used there - this is for lookups only
                    name : vo.name,
                    uid : vo.uid,
                    slug : vo.slug,
                    depth : vo.depth
                } );

                vo.rootUid = _parent.api.info.rootUid;
            } else {
                vo.rootUid = "root@" + ( Factory.metrics.rootCounter ++ );
            }

            return vo;
        }


        function subscribeToEventStream(){

            if( _parent && _parent._events ){
                node._commandSubscription( _parent._events._Sg_COMMAND );
                _parent._requestSubscription( node._events._Sg_REQUEST );
            }

            node._privateCoreEventSubscription(
                Constants.core_events[ "Sg_STORE_MUTATION" ].event
            );
        }

        return result
    }

};

export default {
    createNode : Factory.createNode
}
