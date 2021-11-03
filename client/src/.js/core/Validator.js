/**
 * Zimbabalim
 * pass every created core object (AbstractNode, components) through here and ensure compatibility
 */
"use strict";


 // define([ "Logger" ],

let Validator = {

    init: function (_props) {

    },

    validate: function (_type, _props) {

        // console.log("/Validator/ -validate " );

        var pass = true,
            msg = "some descriptive error message";

        switch (_type) {

            case "node":

                //////////console.log("/Validator/ -validate ", _props.child );

                if (!_props.child.actionRunner) {
                    pass = false;
                    msg = "your class ['" + _props.config.name + "'] requires an exposed 'actionRunner' method";
                }

                break;

            // ***

            case "viewstack":

                //////////console.log("/Validator/ -validate VS");

                if (!_props.child.show) {
                    pass = false;
                    msg = "viewstack child requires an exposed 'show' method";
                }

                if (!_props.child.hide) {
                    pass = false;
                    msg = "viewstack child requires an exposed 'hide' method";
                }

                if (!_props.child.reset) {
                    pass = false;
                    msg = "viewstack child requires an exposed 'reset' method";
                }

                // enter, exit etc?


                break;
        }

        if (!pass) {
            console.error("/Validator/ -validate ***ERROR***", _type, _props);
            //Logger.log( "ERROR", _type, _props );
            throw new Error(msg);
        } else {
            //////////console.log("/Validator/ -validate ", _type, "valid!");
        }

        return pass;
    }
};

export default {
    validate : Validator.validate
}




