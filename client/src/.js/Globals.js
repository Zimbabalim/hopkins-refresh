"use strict";

/**
 * Zimbabalim
 * 05/05/2016
 */

let Globals = {

    paths : {
        shell_images : "/assets/images/",
        product_images : "/assets/images/products/",
        sundries_images : "/assets/images/sundries/"
    },

    dom : {
        el : null // *** set in bootstrap
    },

    viewport : {
        currentBreakpoint : null,
        isMobile : null
    },

    client : {
      isIOS : false
    },

    ui_info : {
        numFabricSelectorComponents : null
    },

    paginator : {
        desktopChunks : 18,
        mobileChunks : 18 // TODO smaller chunks means more paginator pages - need to consider alternative mobile paginatorui
    },

    gateway : {
        mailto : "hopkinsfabrics@hotmail.co.uk",
        subject : "Hopkinsfabrics.co.uk | Registration request",
        message : "Hello,\nI would like to register for access to hopkinsfabrics.co.uk.\nMy details are below."
    }

};

export default Globals;