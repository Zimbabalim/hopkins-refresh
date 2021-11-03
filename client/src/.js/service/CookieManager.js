"use strict";

/**
 * Zimbabalim
 * 31/05/2016
 */

import signals from "signals";
import Cookies from "../../.libs/js.cookie.js" // *** non-npm libs here

let CookieManager = {

    events : {
        Sg_COOKIE_STATUS : new signals.Signal()
    },

    els : {

    },

    props : {
        cookieName : "hopkins_shop_cookie",
        trueValue : "yes",
        falseValue : "no",
        blankSymbol : "+",
        sessionVars_$ : [],
        hasCookie : false,
        cookieObject : null,
        parsedData : null,

        expiration : 365, // *** one year

        data : {
            email : "",
            swatches : [],
            cookie_consent : false
        }
    },


    init : function(){
        CookieManager.checkCookieExists();
    },

    
    checkCookieExists : function () {

        var c = Cookies.get( CookieManager.props.cookieName );
        CookieManager.props.hasCookie = !!c;

        //console.log("/CookieManager/ -checkCookieExists ", CookieManager.props.hasCookie );

        if( !CookieManager.props.hasCookie ){
            //console.log("/CookieManager/ -checkCookieExists --create blank cookie");

            //{ expires: 7 }
            // Cookies.set( CookieManager.props.cookieName, JSON.stringify( CookieManager.props.data ), { expires : CookieManager.props.expiration } );
            CookieManager.setCookie( JSON.stringify( CookieManager.props.data ) );

        } else {
            CookieManager.props.data = JSON.parse( c );
            //console.log("/CookieManager/ -checkCookieExists DATA:", CookieManager.props.parsedData );
        }
    },


    addProperty : function ( _key, _value ) {

        CookieManager.props.data[ _key ] = _value;
        // console.log("/CookieManager/ -addProperty ", _key, _value );
        //console.log("/CookieManager/ -addProperty error?", CookieManager.props.data );

        CookieManager.write();
    },

    write : function () {

        var d = JSON.stringify( CookieManager.props.data );
        //console.log("/CookieManager/ -write ", d );
        // Cookies.set( CookieManager.props.cookieName, d, { expires : CookieManager.props.expiration } );
        CookieManager.setCookie( d );
    },


    getData : function () {
        // return CookieManager.props.parsedData
        return CookieManager.props.data
    },

    setCookie : function ( _data ) {
        //console.log("/CookieManager/ -setCookie ");
        Cookies.set( CookieManager.props.cookieName, _data, { expires : CookieManager.props.expiration } );
    }


};

export default {
    events : CookieManager.events,
    props : CookieManager.props,
    init : CookieManager.init,
    getData : CookieManager.getData,
    flush : CookieManager.flush,
    writeCookie : CookieManager.writeCookie,
    deleteCookie : CookieManager.deleteCookie,
    addSessionVar : CookieManager.addSessionVar,
    addProperty : CookieManager.addProperty
}


