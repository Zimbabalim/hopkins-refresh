"use strict";

/**
 * Zimbabalim
 * 09/05/2016
 */


let Model = {

    data : {
        configVO : null,
        dataForUI : null
    },

    setData : function ( _data ) {
        Model.data.configVO = _data;
        //////console.log("/Model/ -setData ", Model.data.configVO );

        Model.wrapDataForUI();
    },

    /**
     *
     * @param _key
     * @param _clone = if true pass cloned copy otherwise return original
     * @returns {*}
     */
    getVObyKey : function ( _key, _clone = true ) {
        return ( _clone ) ? _.clone( Model.data.configVO[ _key ] ) : Model.data.configVO[ _key ];
    },

    getUIDataByKey : function ( _key, _clone = true ) {
        return ( _clone ) ? _.clone( Model.data.dataForUI[ _key ] ) : Model.data.dataForUI[ _key ];
    },


    wrapDataForUI : () => {

        /*Model.data.dataForUI = {};
        // *** calls below wrap

        const wrap = ( _name, _refs, _dataSrc ) => {

            Model.data.dataForUI[ _name ] = {};

            _.each( _refs, function ( _v ) {

                _.each( _v, function ( _vv, _label ) {

                    Model.data.dataForUI[ _name ][ _label ] = {};

                    _.each( _vv, function ( _vvv ) {

                        _.each( _dataSrc, function ( _data, _key ) {

                            if( _data.code === _vvv ){
                                Model.data.dataForUI[ _name ][ _label ][ _data.name ] = _data;
                            }
                        });

                    } )
                })
            });

            // //////console.log("/Model/ -wrap ", Model.data.dataForUI );
        };*/

        //Model.data.dataForUI = [];


        // let vo = [];

        Model.data.dataForUI = {};

        const wrap = ( _name, _refs, _dataSrc ) => {

            let vo = [];
            Model.data.dataForUI[ _name ] = vo;

            _.each( _refs, function ( _v ) {

                _.each( _v, function ( _vv, _label ) {

                    let outer = {};
                    outer[ _label ] = [];
                    vo.push( outer );

                    _.each( _vv, function ( _vvv ) {

                        _.each( _dataSrc, function ( _data, _key ) {

                            if( _data.code === _vvv ){

                                let inner = {};
                                inner[ _data.uid ] = _data;
                                outer[ _label ].push( inner );
                            }
                        });

                    } )
                })
            });
        };



        wrap(
            "fabrics",
            Model.getVObyKey( "code_fragment_lookup" )[ "fabrics_for_ui" ],
            Model.getVObyKey( "code_fragment_lookup" )[ "fabrics" ]
        );


        // //////console.log("/Model/ -getWrappedFabricDataForUI >>>> OLD", Model.getVObyKey( "fabrics", true ) );
        // //////console.log("/Model/ -getWrappedFabricDataForUI >>>> NEW", Model.getUIDataByKey( "fabric_test", true ) );


    }
};

export default {
    setData : Model.setData,
    getVObyKey : Model.getVObyKey,
    getUIDataByKey : Model.getUIDataByKey

    //getWrappedFabricDataForUI : Model.getWrappedFabricDataForUI
}
