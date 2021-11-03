"use strict";

/**
 * Zimbabalim
 * 10/05/2016
 */


import zz from "core/zz";
import signals from "signals";
import Globals from "Globals";

/**
 * keeps track of filter/form changes from ui
 * fires event on change passing all data to be consumed by listening object(s)
 */
let Session = {

    events : {
        Sg_SESSION_MODEL_CHANGED : new signals.Signal()
    },

    defaults : {
        colourSelectionScope : "scoped" // *** 'scoped' || 'all' - consumed by colour selector
    },

    vos : {
        fabricSelections : [],
        designSelection : {},
        colourSelections : [],

        info : null, //*** TEST special info object

        currentContext : null, // *** e.g. 'colour-selector', 'fabric-selector', 'design-selector'

        selectionScopes : { // *** FIXIT this is a bit unclear
            fabric : null,
            colour : null
        }
    },

    cache : {
        cachedVOs : null // *** TEST
    },

    addSelection : function ( _vo ) {

        Session.vos.currentContext = _vo.context;
        Session.vos.info = null;

        switch( _vo.context ){

            case "fabric-selector":

                Session.add( _vo.data, "fabricSelections" );
                break;

            case "colour-selector":

                Session.vos.selectionScopes.colour = _vo.scope; // RESTORE
                Session.add( _vo.data, "colourSelections" );

                break;

            case "design-selector":
                
                Session.vos.designSelection = _vo.data;
                
                if( _vo.caller ){
                    Session.vos.info = {};
                    Session.vos.info.caller = _vo.caller;
                }

                Session.dispatchNotification( "addSelection-design" );

                break;
        }
    },

    /**
     * this one is to make it a bit easier to pass in bulk data without having to screw around with wrappers
     * @param _data
     */
    addDataAsSimpleArray : function ( _data, _remove = false ) {

        Session.vos.currentContext = "";
        Session.vos.info = null; // RESTORE

        switch( _data.context ){

            case "fabric-selector":

                if( !_remove ){

                    if( Session.vos.fabricSelections.length > 0 ){
                        Session.vos.fabricSelections.push( _data.data );
                        Session.vos.fabricSelections = _.flatten( Session.vos.fabricSelections );
                    } else {
                        Session.vos.fabricSelections = _data.data;
                    }
                }

                if( _remove ){
                    Session.vos.fabricSelections = _.pullAll( Session.vos.fabricSelections, _data.data );
                }

                break;
        }

        if( _data.process.isBatchProcess ){

            if( _data.process.index === Globals.ui_info.numFabricSelectorComponents - 1 ){
                console.warn("/Session/ -addDataAsSimpleArray FINISHED BATCH PROCESS, NOT DISPATCHING?");
            }

            // *** NOTE don't think we need to dispatch from here - 'add' or'updateColourSelection' do the job for us...

        } else {
            Session.dispatchNotification( "addDataAsSimpleArray-normal" );
        }
    },

    /**
     * NOTE currently disabled! 260916
     * i.e. 'find colour' ui has 'selected fabric' and 'all fabrics' option
     * @param _scope
     * @param _key
     */
    updateSelectionScope : function ( _key, _scope ) {

        Session.vos.selectionScopes[ _key ] = _scope;
        Session.dispatchNotification( "updateSelectionScope" );
    },


    add : function ( _data, _voKey ) {

        if( _data.selected ){
            Session.vos[ _voKey ].push( _data.id )
        } else {
            let tgt = [ _data.id ]; // *** wrap in array to feed lodash method - safer than indexOf?
            Session.vos[ _voKey ] = _.pullAll( Session.vos[ _voKey ], tgt );
        }

        Session.dispatchNotification( "add" );
    },

    // *** reset on every catalogue show request
    clearAll : function ( _callerName = null ) {
        Session.vos.fabricSelections = []; // *** TODO add others
        Session.vos.colourSelections = []; // *** FIXIT issues with when changing catalogue pages?
    },

    clearVOByKey : function ( _key, _callerName = null ) {
        Session.vos[ _key ] = []
    },

    /**
     * whomever is listening can handle the data..? Need some kind of query parser
     */
    dispatchNotification : function ( _caller ) {

        Session.cache.cachedVOs = Session.vos; // *** TEST

        // TODO uinq fabricSelections!!!

        Session.events.Sg_SESSION_MODEL_CHANGED.dispatch({
            action : "Sg_SESSION_MODEL_CHANGED",
            data : Session.vos
        });
    },

    paginatorBridge :  {

        props : null,

        setRef : function ( _props ) {

            if( !this.props ){
                this.props = _props;
            }
        },

        getIndex : function () {
            return this.props.currIndex;
        }

    },

    overrides : {

        defeatUpdateCatalogue : false,

        setDefeatUpdateCatalogue : function ( _f, _caller ) {
            this.defeatUpdateCatalogue = _f;
        },

        getDefeatUpdateCatalogue : function () {
            return this.defeatUpdateCatalogue;
        }
    }

};

export default {
    events : Session.events,
    cache : Session.cache,
    defaults : Session.defaults,
    addSelection : Session.addSelection,
    addDataAsSimpleArray : Session.addDataAsSimpleArray,
    updateSelectionScope : Session.updateSelectionScope,
    clearAll : Session.clearAll,
    clearVOByKey : Session.clearVOByKey,

    paginatorBridge : Session.paginatorBridge,

    overrides : Session.overrides
}