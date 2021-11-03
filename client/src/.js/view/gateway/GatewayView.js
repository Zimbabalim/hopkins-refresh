"use strict";

/**
 * Zimbabalim
 * 02/06/2016
 */

import React from "react";
import ReactDOM from "react-dom";
import Globals from "Globals";
import TweenMax from "gsap";
import classNames from "classnames";

import GatewaySv from "service/GatewaySv";
import User from "model/User";

import CookieManager from "service/CookieManager";


export default function GatewayView( api ) {
    
    let events = {
    
    };
    
    let els = {
        el : null,
        reactEl : null
    };
    
    let props = {
        data : null,
        transitionMixin : null
    };
    
    let uis = {
        component : null
    };
    
    let _react = {
        component : null
    };
    
    const init = function ( _config ) {
        
        els.el = _config.el;
        
        /*props.transitionMixin = _config.mixins[ 0 ];
         props.transitionMixin.init( { id : api.info.name, el : els.el } );*/
        
        create();
        ( _config.render ) ? render() : null;
    };
    
    const create = function () {
        
        _react.component = React.createClass({
            
            getInitialState : function () {
                return {
                    loginEmailState : "valid",
                    loginServiceState : "ok",
                    fullNameState : "valid",
                    emailState : "valid",
                    registerState : "fail"
                }
            },
            
            componentDidMount : function () {
                els.reactEl = ReactDOM.findDOMNode( this );
                
            },
            
            update : function () {
            
            },
            
            onLoginBtnClicked : function ( e ) {
                
                let email = this.refs["login"].value;
                
                //this.onLoginServiceUpdate( "ok" );
                
                if( validateEmail( email ) ){
                    this.setState( { loginEmailState : "valid" } );
                    actionRunner( "on-login-btn-clicked", { email : email } );
                } else {
                    this.setState( { loginEmailState : "invalid" } );
                }
            },
            
            onLoginServiceUpdate : function ( _state ) {
                ////////console.log("/GatewayView/ -onLoginServiceUpdate ", _state );
                
                this.setState( { loginServiceState: _state } );
            },
            
            onRegisterClicked : function ( e ) {
                
                let fullName = document.getElementById( "register-full-name" ),
                    company = document.getElementById( "register-company" ),
                    email = document.getElementById( "register-email" );
                
                // TODO validate!!!
                
                let count = 0,
                    required = 2;
                
                if( fullName.value.length >= 2 ){ // name
                    count ++;
                    this.setState( { fullNameState : "valid" } );
                } else {
                    this.setState( { fullNameState : "invalid" } );
                }
                
                if( validateEmail( email.value ) ){ // email
                    count ++;
                    this.setState( { emailState : "valid" } );
                } else {
                    this.setState( { emailState : "invalid" } );
                }
                
                if( count === required ) {
                    
                    // this.setState( { registerState : "ok" } );
                    
                    actionRunner( "on-register-submit", {
                        fullName : fullName.value,
                        company : company.value,
                        email : email.value
                    } )
                }
                
                ////////console.log("/GatewayView/ -onRegisterClicked ", count );
            },
            
            
            onRegisterServiceUpdate : function ( _state ) {
                //console.log("/GatewayView/ -onRegisterServiceUpdate ", _state );
                
                this.setState( { registerState : _state } );
            },
            
            
            onCookieNoticeClicked : function () {
                
                let el = this.refs["cookie-notice"];
                //////console.log("/GatewayView/ -onCookieNoticeClicked ", el );
                
                TweenMax.to( el, 0.3, { opacity : 0, onComplete : function () {
                        el.style.visibility = "hidden";
                    } });
                
                CookieManager.addProperty( "cookie_consent", true );
                
            },
            
            render : function () {
                
                let loginClasses = classNames({
                    "login-fail-message" : true,
                    "has-failed" : this.state.loginServiceState === "fail"
                });
                
                /*let registerClasses = classNames({
                    "register-success-message" : true,
                    "has-succeeded" : this.state.registerState === "ok"
                });*/
                
                let getRegisteredEmailInputEl = () => {
                    
                    let d = CookieManager.getData().email,
                        r;
                    
                    if( d.length > 0 ){
                        r = <input type="text" defaultValue={ d } ref={ "login" } className={ this.state.loginEmailState }
                                   onKeyDown={(e) => onKeyDown(e)}
                        />
                    } else {
                        r = <input type="text" placeholder="your email..." ref={ "login" } className={ this.state.loginEmailState }
                                   onKeyDown={(e) => onKeyDown(e)}
                        />
                    }
                    
                    const onKeyDown = (e) => {
                        if (e.key === 'Enter') {
                            this.onLoginBtnClicked();
                        }
                    }
                    
                    return r
                };
                
                //CookieManager.getData().swatches || [];
                
                //////console.log("/GatewayView/ -render ", CookieManager.getData().cookie_consent );
                
                
                let classes = classNames({
                    "cookie-notice" : true,
                    "show-cookie-consent" : !CookieManager.getData().cookie_consent,
                });
                
                
                let getRegisterResultMessage = () => {
                    
                    //console.log("/GatewayView/ -getRegisterResultMessage ", this.state.registerState );
                    
                    let ok = <p>We will send you an email shortly confirming your registration.</p>,
                        exists = <p>This email address is already registered with us. Please login.</p>;
                    
                    let r = <p></p>;
                    
                    switch( this.state.registerState ){
                        case "ok":
                            r = ok;
                            break;
                        
                        case "exists":
                            r = exists;
                            break;
                    }
                    
                    return r;
                    
                };
                
                //<p className={ registerClasses }>We will send you an email shortly confirming your registration</p>
                
                return (
                    
                    <div>
                        
                        <div className={ classes } ref={ "cookie-notice" }>
                            <p>This site uses browser cookies to tailor your experience. <span onClick={ this.onCookieNoticeClicked }>OK</span></p>
                        </div>
                        
                        <div className="background">
                            <p>TRADE ONLY</p>
                        </div>
                        
                        <div className="form-container">
                            
                            <div className="inner">
                                
                                <div className="border"></div>
                                
                                <div className="top-panel">
                                    <div className="logo"></div>
                                </div>
                                
                                <div className="hbox">
                                    
                                    <div ref={ "registration" }>
                                        <h2>REGISTER</h2>
                                        
                                        <input type="text" placeholder="your full name..."
                                               id="register-full-name"
                                               className={ this.state.fullNameState }/>
                                        <input type="text" placeholder="your company..."
                                               id="register-company"/>
                                        <input type="text" placeholder="your email..."
                                               id="register-email"
                                               className={ this.state.emailState }/>
                                        
                                        { getRegisterResultMessage() }
                                        <div className="btn" onClick={ this.onRegisterClicked }><span>SUBMIT</span></div>
                                    
                                    </div>
                                    
                                    
                                    <div>
                                        <h2>Already Registered?</h2>
                                        { getRegisteredEmailInputEl() }
                                        <div className="btn" onClick={ this.onLoginBtnClicked }><span>LOGIN</span></div>
                                        <p className={ loginClasses }>We're sorry, we couldn't find you in the database. Please try again or register with us.</p>
                                    </div>
                                
                                </div>
                            
                            </div>
                        
                        </div>
                    
                    </div>
                );
                
                //<p>TRADE ONLY</p>
            }
            
        })
    };
    
    const render = function () {
        
        uis.component = ReactDOM.render(
            React.createElement( _react.component ), els.el
        );
        
    };
    
    
    /**
     * check if email via regex, call service and request procession if success
     * @param _data
     */
    const validateLogin = function ( _data ) {
        
        GatewaySv.events.Sg_SERVICE_RESPONSE.addOnce( function ( _result ) {
            
            //console.log("/GatewayView/ - RESPONSE", _result.data[ 0 ]);
            
            if( _result.data[ 0 ] ){
                actionRunner( "on-login-success", { userData : _result.data[ 0 ] } );
            } else {
                actionRunner( "on-login-fail", null );
            }
        });
        
        // **************************************
        GatewaySv.call( "validate-login", _data );
        // **************************************
    };
    
    const validateEmail = function( email ) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test( email );
    };
    
    
    const registerUser = ( _data ) => {
        
        //console.log("/GatewayView/ -registerUser ", _data );
        
        GatewaySv.events.Sg_SERVICE_RESPONSE.addOnce( function ( _result ) {
            
            //console.log("/GatewayView/ - >>>>", _result.data );
            
            if( _result.data[ 0 ] ){
                actionRunner( "registration-user-exists" );
            } else {
                actionRunner( "registration-send-email", _data );
            }
        });
        
        // **************************************
        GatewaySv.call( "validate-login", _data );
        // **************************************
    };
    
    
    const actionRunner = function( _action, _data ){
        
        // //////console.log("/GatewayView/ -actionRunner ", _action, _data );
        
        switch( _action ){
            
            case "show":
                // props.transitionMixin.showHide( true );
                break;
            
            case "dispose":
                ////////console.log("/GatewayView/ -actionRunner DISPOSE");
                ReactDOM.unmountComponentAtNode( els.el );
                els.el.style.display = "none";
                
                break;
            
            
            case "on-login-btn-clicked":
                validateLogin( _data );
                break;
            
            case "on-login-success":
                
                User.setUserData( _data.userData );
                
                api.dispatchRequest({
                    action : "on-gateway-passed",
                    data : null
                });
                
                uis.component.onLoginServiceUpdate( "ok" );
                
                break;
            
            
            case "on-login-fail":
                
                ////////console.log("/GatewayView/ -actionRunner ", _action, _data );
                
                uis.component.onLoginServiceUpdate( "fail" );
                
                break;
            
            
            case "on-register-submit":
                registerUser( _data );
                break;
            
            
            case "registration-user-exists":
                //console.log("/GatewayView/ -actionRunner ", _action );
                uis.component.onRegisterServiceUpdate( "exists" );
                break;
            
            
            case "registration-send-email":
                
                //console.log("/GatewayView/ -actionRunner ", _action, _data );
                
                uis.component.onRegisterServiceUpdate( "ok" );
                
                let emailString =
                    "mailto:" +
                    Globals.gateway.mailto +
                    "?subject=" +
                    encodeURIComponent( Globals.gateway.subject ) +
                    "&body=" +
                    encodeURIComponent(
                        Globals.gateway.message + "\n\n" +
                        "Full name: " + _data.fullName +
                        "\nCompany: " + _data.company +
                        "\nEmail: " + _data.email
                    );
                
                ////////console.log("/GatewayView/ -actionRunner **************", emailString );
                
                document.location.href = emailString;
                
                break;
            
        }
    };
    
    return{
        els : els,
        init : init,
        actionRunner : actionRunner
    }
}
