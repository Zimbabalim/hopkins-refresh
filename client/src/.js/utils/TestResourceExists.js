"use strict";

/**
 * Zimbabalim
 * 23/05/2016
 */


let TestResourceExists = {
    
    test : ( _url ) => {

        var http = new XMLHttpRequest();

        http.open('HEAD', _url, false);
        http.send();

        // console.log("/TestResourceExists/ -test ", _url, http.status != 404 );

        return http.status != 404;
    }
    
};

export default TestResourceExists