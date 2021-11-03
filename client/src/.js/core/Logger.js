/**
 * Zimbabalim
 */
"use strict";

define([],
    function(){

        var defaults = {
            colour : "lime",
            margin : "0.5rem"
        };

        var log = function( _name, _prop ){

            _name = ( _name !== undefined ) ? _name : "";
            _prop = ( _prop !== undefined ) ? _prop : "";

            var s1 = "%c /zz/ " + _name,
                s2 = "color: " + defaults.colour;

            console.warn( s1, s2, _prop );
        };

        var logo = function(){

            //console.log("%c _____      ", "color:" + rnd() );
            //console.log("%c ____/___   ", "color:" + rnd() );
            //console.log("%c    /___/___", "color:" + rnd() );
            //console.log("%c       /____", "color:" + rnd() );

            function rnd(){
                return "#" + Math.floor( Math.random() * 16777215 ).toString( 16 );
            }
        };

        return {
            log : log,
            logo : logo
        }

} );