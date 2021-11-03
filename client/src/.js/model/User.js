"use strict";

/**
 * Zimbabalim
 * 30/05/2016
 */

import Products from "model/Products";
import CookieManager from "service/CookieManager";
import UserSwatchesToDbSv from "service/UserSwatchesToDbSv"

let User = {

    data : {
        userDetails : {}, // *** populated from gatewayview with data from db
        swatches : []
    },

    test : function () {
        //User.data.swatches = User.dummyData;
        // ////////console.log26.("/User/ -test ", User.data.swatches );
    },

    init : function () {
        // console.warn("/User/ -init STARTUP - error probably originates here - add delay?");
        //User.data.swatches = CookieManager.getData().swatches || []; // *** TODO deprecate

        CookieManager.addProperty( "swatches", "#" ); // *** NOTE tidy up deprecated cookie swatches
    },

    setUserData : function ( _userData ) {
        
        User.data.userDetails = _userData;
        User.data.userDetails.friendly_name = User.data.userDetails.full_name.split(" ")[ 0 ];
        User.data.swatches = User.data.userDetails.swatches;
        
        CookieManager.addProperty( "email", User.data.userDetails.email );

        User.userSwatchesToDbMethods.initialPopulation();
    },


    userSwatchesToDbMethods : {

        initialPopulation: function () {
            // ////console.log26.("/User/ -initialPopulation ", User.data.userDetails );

            UserSwatchesToDbSv.events.Sg_SERVICE_RESPONSE.addOnce( function ( _result ) {
                // *** do nothing // ////console.log26.("/User/ - initial-population service result:", _result.data );
            });

            UserSwatchesToDbSv.call( "initial-population", {
                uid : User.data.userDetails._id,
                swatches : User.data.swatches
            } );
        },

        writeSwatches : function () { // *** deprecated

            // //console.log("/User/ -writeSwatches ", User.data.swatches );

            UserSwatchesToDbSv.events.Sg_SERVICE_RESPONSE.addOnce( function ( _result ) {
                // console.log("/User/ - write-swatches service result:", _result.data );
            });

            UserSwatchesToDbSv.call( "write-swatches", {
                uid : User.data.userDetails._id,
                swatches : User.data.swatches
            } );
        },
        
        // *** added Nov 2020
        writeRichSwatches: function (method, swatch) {
            //console.log26.('..../User/ -writeRichSwatches', User.data.richSwatches, '<<<<<', swatch);
            
            UserSwatchesToDbSv.call( "write-rich-swatches", {
                uid: User.data.userDetails._id,
                method: method,
                swatch: swatch
            } );
        }
    },


    add : function ( _data ) {
        
        if( !User.data.swatches ){
            //////console.log26.("/User/ -add SHOULD FIX ARRAY");
            User.data.swatches = [];
        } else {
            //////console.log26.("/User/ -add ALL OK");
        }
        
        User.data.swatches.push( _data );
        //User.writeToCookie(); // *** deprecated

        User.userSwatchesToDbMethods.writeSwatches();  // RESTORE!
        User.userSwatchesToDbMethods.writeRichSwatches('add', _data);  // RESTORE!
    },

    remove : function ( _data ) {
        let tgt = [ _data ];
        User.data.swatches = _.pullAll( User.data.swatches, tgt );
        //User.writeToCookie(); // *** deprecated

        User.userSwatchesToDbMethods.writeSwatches();  // RESTORE!
        User.userSwatchesToDbMethods.writeRichSwatches('remove', _data); // RESTORE!
    
    },

    getMySwatches : function () {
        return Products.methods().getMySwatchesFromCodes( User.data.swatches );
    },

    checkHasBeenAddedFromCode : function ( _code ) {

        let z = _.find( User.data.swatches, function ( _v ) {
            return _v === _code
        } );

        return !!z
    },


    // *** deprecated
    writeToCookie : function () {
        CookieManager.addProperty( "swatches", User.data.swatches );
    }

};

export default User
