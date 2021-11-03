"use strict";

/**
 * Zimbabalim
 * 13/05/2016
 */

import signals from "signals";
import Model from "model/Model";
import Session from "model/Session";
import ProductDataSv from "service/ProductDataSv";

let Products = {

    events : {
        Sg_PRODUCT_MODEL_CHANGED : new signals.Signal
    },

    props : {
        symbols : {
            delimiter : "/" // *** code delimiter symbol
        },

        //fabric/design/colour, e.g. SILWOO/EUS/PURBLK
        codeFragmentIndices : {
            fabric : 0,
            design : 1,
            colour : 2
        },

        mode : "client", // *** client || server - either process everything in one chunk on the client, or allow multiple roundtrips to the server TODO


        metrics : {
            totalNumProducts : null,
            totalNumFabrics : null,
            currNumFabricsSelected : 0
        },

        cache : {
            allFabricNamesAsArray : null,
            allProductsAsArray : null
        }


    },

    data : {

        lookupVO : null,

        productsVO : null, // *** all products? if we use client, yes, otherwise load in requests from server

        temp : { // *** cache results of running methods
            splitByDesign : null,
            allVariations : null
        },

        currentOutputVO : null // *** unused?
    },

    init : () => {

        Products.data.lookupVO = Model.getVObyKey( "code_fragment_lookup" );

        ProductDataSv.events.Sg_SERVICE_RESPONSE.add( function ( _data ) {

            Products.data.productsVO = _data.data.designs;
            Products.dispatch( "data-is-loaded", null );

            // Products.methodTest(); // REMOVE
        } );

        Session.events.Sg_SESSION_MODEL_CHANGED.add( function ( _vo ) {

            // ////console.log("********** /Products/ - SESSION", _vo.data.currentContext );

            if( _vo.data.currentContext === "design-selector" ){
                Products.queryFromDesignSelector( _vo );
            } else {
                //_vo.data.designSelection = {}; // TEST
                Products.queryRunner( _vo );
            }
        });

        ProductDataSv.call();
    },


    queryFromDesignSelector : ( _vo ) => {

        // console.log("/Products/ -queryFromDesignSelector ", Products.methods().searchByDesignName( _vo.data.designSelection.label ) );


        /*let r = Products.methods().searchByDesignName( _vo.data.designSelection.label ), // *** match 'friendly_name' in data - safe?
         rr = Products.methods().getDefaultProductAndVariationReferences( r );*/

        let r = Products.methods().searchByDesignName( _vo.data.designSelection.label ), // *** match 'friendly_name' in data - safe?
            rr;

        if( r ){
            rr = [ Products.methods().getDefaultProductAndVariationReferences( r ) ];
        } else {
            rr = [];
        }

        // console.log("/Products/ -queryFromDesignSelector RESULT", rr );

        Products.dispatch( "update-fabric-selection", rr );

        // console.log("/Products/ -queryFromDesignSelector ALL PRODUCTS" );
    },


    // *** TODO inform mediator that query is running so that it can lock ui, especially if we are going to hit the server
    queryRunner : ( _vo ) => {

        // FIXIT BUG - interact with colour selector, change catalogue page, interact with colour selector again, returns no data!
        //////console.log("******* /Products/ -queryRunner FABRIC", _vo.data );

        let fabrics = _vo.data.fabricSelections,
            designs = _vo.data.designSelection,
            colours = _vo.data.colourSelections,
            colourScope = _vo.data.selectionScopes.colour; // 'scoped' || 'all'

        fabrics = _.uniq( fabrics ); // *** TODO is this safe here?

        Products.props.metrics.currNumFabricsSelected = ( fabrics.length );
        let fabricResults = Products.methods().queryFabrics( fabrics );

        if( colours.length > 0 ){

            let filtered = Products.methods().filterScopedByColourTags( fabricResults, colours );
            Products.data.currentOutputVO = filtered;
            Products.dispatch( "update-fabric-selection", filtered );

        } else {
            Products.data.currentOutputVO = fabricResults;
            Products.dispatch( "update-fabric-selection", fabricResults );
        }

        // console.log("/Products/ -queryRunner ", colours );
    },

    methodTest : () => {

        // METHOD TESTS

        // let d = Products.methods().splitByDesign( Products.data.productsVO );
        // ////////console.log("/Products/ -onData --splitByDesign", d );
        //
        // let allV = Products.methods().getAllVariations( d );
        // ////////console.log("/Products/ -onData --getAllVariations", allV );
        //
        // let singleV = Products.methods().getVariationsFromDesign( d[ 1 ] );
        // ////////console.log("/Products/ -onData --getVariationsFromDesign", singleV );

        // let designNames = Products.methods().getAllDesignNames( Products.data.productsVO );
        // ////////console.log("/Products/ -onData --designNames", designNames );

        // let searchByProductCode = Products.methods().searchByProductCode( "SILWOO/EUS/PURBLK" );
        // ////////console.log("/Products/ -onData --searchByProductCode", searchByProductCode );

        // let searchByCodeFragment = Products.methods().searchByCodeFragment( "SILWOO/EUS/PURBLK", 2 ); -OR-
        // let searchByCodeFragment = Products.methods().searchByCodeFragment( "SILWOO/EUS/PURBLK", Products.props.codeFragmentIndices.colour );
        // ////////console.log("/Products/ -onData --searchByCodeFragment", searchByCodeFragment );


        /*let searchByTag = Products.methods().searchByTag( [ "purple", "metallic"/!*, "damask"*!/ ] );
         ////////console.log("/Products/ -onData --searchByTag", searchByTag );*/

        /*let searchByDesignName = Products.methods().searchByDesignName( "chancery" );
         ////////console.log("/Products/ -onData --searchByDesignName", searchByDesignName );*/

        // let getDefaultProductAndVariationReferences = Products.methods().getDefaultProductAndVariationReferences( "chancery" ); -OR-
        // let getDefaultProductAndVariationReferences = Products.methods().getDefaultProductAndVariationReferences( Products.methods().searchByDesignName( "chancery") );
        // ////////console.log("/Products/ -onData --getDefaultProductAndVariationReferences", getDefaultProductAndVariationReferences );


        /*let resolveNameOrCode = Products.methods().resolveNameOrCode( "silk_wool", "fabrics" );
         ////////console.log("/Products/ -methodTest --resolveNameOrCode", resolveNameOrCode );*/



        /*let findFabricTest = function () { // *** really testing 'extractCodeFragmentByIndex'

         ////////console.log("/Products/ -findFabricTest ");

         let fabrics = ["silk_damask", "silk_wool"];

         let array = [];

         _.each( fabrics, function ( _v ) {
         let code = Products.methods().resolveNameOrCode( _v, "fabrics", "code" );
         let searchByCodeFragment = Products.methods().searchByCodeFragment( code, null, true );
         array.push( searchByCodeFragment );
         } );

         array = _.flatten( array );

         let getUniqueDesignNames = Products.methods().extractCodeFragmentByIndex( array, Products.props.codeFragmentIndices.design, true  );
         let designs = Products.methods().splitByDesign( Products.data.productsVO );
         let defaults = [];

         _.each( getUniqueDesignNames, function ( _v ) {

         let name = Products.methods().resolveNameOrCode( _v, "designs", "name" );
         let matchingDesign = _.find( designs, function ( _v ) {
         return ( _v.friendly_name === name ) ? _v : null
         });

         let d = Products.methods().getDefaultProductAndVariationReferences( matchingDesign );
         defaults.push( d );
         } );

         ////////console.log("/Products/ -findFabricTest ", defaults );

         }; findFabricTest();*/
    },

    methods : () => {

        return {

            splitByDesign : function( _data ) {

                let designs = [];

                _.map( _data, function ( _v, _k ) {
                    _.map( _v, function ( _vv, _kk ) {
                        designs.push( _vv );
                    });
                });

                return designs
            },

            // *** TODO optimise to cache this and clear on new data set
            getAllVariations : function( _designs ) {

                let variations = [];

                _.filter( _designs, function ( _v, _k ) {
                    variations.push( _v.variations );
                } );

                return _.flatten( variations )
            },

            getVariationsFromDesign : function ( _design ) {
                return _design.variations
            },

            // *** useful for 'search by design'
            getAllDesignNames : function ( _data ) {

                let r = [];

                _.each( this.splitByDesign( _data ), function ( _v ) {
                    r.push( _v.friendly_name )
                });

                return r
            },

            searchByProductCode : function ( _code ) {

                // ////////console.log("/Products/ -searchByProductCode ", _code );

                let v = this.getAllVariations( this.splitByDesign( Products.data.productsVO )),
                    r = _.find( v, function ( _v ) {
                        return _v.code === _code
                    });

                return r
            },

            replaceSlashes : function ( _string, _char = "-" ) {
                _string = _string.replace(/\//g, _char );
                // ////////console.log("/Products/ -replaceSlashes ", _string );
                return _string
            },

            // *** fabric/design/colour, e.g. SILWOO/EUS/PURBLK
            /*            searchByCodeFragment : function ( _code, _index ) {

             ////////console.log("/Products/ -searchByCodeFragment ", _code, _index );

             let v = this.getAllVariations( this.splitByDesign( Products.data.productsVO ));

             var fragments_$ = _code.split( Products.props.symbols.delimiter ),
             fragment = fragments_$[ _index ];

             // ////////console.log("/Products/ -searchByCodeFragment ", fragments_$, fragment );

             _.each( v, function ( _v ) {
             // ////////console.log("/Products/ - ", _v.code );

             if( _v.code.indexOf( fragment ) !== -1 ){
             ////////console.log("/Products/ - MATCH?", fragment, _v.code );
             }
             } );

             }*/

            // *** TODO this ONLY WORKS FROM Products.data.productsVO - better to provide dataset here instead?
            // *** fabric/design/colour, e.g. SILWOO/EUS/PURBLK
            // *** single so that we can just search by passing in a single bit rather that the whole code, e.g. SILWOO
            searchByCodeFragment : function ( _code, _index, _single = false ) {


                let v = this.getAllVariations( this.splitByDesign( Products.data.productsVO )),
                    fragments_$,
                    fragment,
                    r = [];

                if( !_single ){
                    fragments_$ = _code.split( Products.props.symbols.delimiter );
                    fragment = fragments_$[ _index ];
                } else {
                    fragment = _code;
                }


                _.each( v, function ( _v ) {

                    let f = _v.code;

                    // *** 211016 - fixes exotic bug
                    // *** e.g. SILJAQ/FRO/REDGLD matches DGL
                    // *** force focus on correct fragment.
                    // *** TODO still room for it to fuck up though - use regex insteadex
                    if( _index && !_single ){
                        let p = _v.code.split("/");
                        f = p[ _index ];
                    }

                    if( f.indexOf( fragment ) !== -1 ){
                        r.push( _v )
                    }
                } );

                return r;
            },


            /**
             * returns array of products matching ANY TAG passed in as array
             * TODO do i need another method/extend this one, to only match if all tags are present?
             * @param _tags
             */
            searchByTag : function ( _tags ) { // ** array?

                let v = this.getAllVariations( this.splitByDesign( Products.data.productsVO )),
                    r = [];

                _.each( _tags, function ( _v ) {
                    run( _v );
                } );

                run( _tags[ 0 ]);

                function run( _tag ) {

                    _tag = _tag.toLowerCase( _tag );

                    _.each( v, function ( _v ) {

                        let t = _v.tags.toLowerCase( _v.tags );

                        if( t.indexOf( _tag ) !== -1 ){
                            r.push( _v );
                        }
                    })
                };

                return  _.uniq( r )
            },


            searchByDesignName : function ( _name ) {

                _name = _name.toLowerCase( _name );

                let design = _.find( this.splitByDesign( Products.data.productsVO ), function ( _v ) {

                    // console.log("/Products/ - ", _v.friendly_name.toLowerCase( _v.friendly_name ), ">", _name, _v.friendly_name.toLowerCase( _v.friendly_name ) === _name );

                    return ( _v.friendly_name.toLowerCase( _v.friendly_name ) === _name ) ? _v : null
                });

                // console.log("/Products/ -searchByDesignName PRODUCTS", Products.data.productsVO );
                // console.log("/Products/ -searchByDesignName RESULT", design );

                // *** TEST DEBUG

                return design
            },


            /**
             * FIXIT rename - turns out this is only useful for 'design-selector'
             * @param _design = string or object
             */
            getDefaultProductAndVariationReferences : function ( _design ) {

                // console.warn("/Products/ -getDefaultProductAndVariationReferences ERROR IS HERE FIXIT!");

                //////console.log("/Products/ -getDefaultProductAndVariationReferences ", _design );

                let design,
                    defaultDesign,
                    references = [];

                if( typeof( _design ) === "string" ){
                    design = this.searchByDesignName( _design );
                }

                if( typeof( _design ) === "object" ){
                    design = _design;
                }

                defaultDesign = this.searchByProductCode( design.default_product_code );

                if( !defaultDesign ){
                    defaultDesign = design.variations[ 0 ];
                }

                _.each( design.variations, function ( _v ) { // *** but excluding defaultdesign!

                    // if( _v.code !== defaultDesign.code ) {

                        let vo = {
                            code: _v.code,
                            colour: _v.colour
                        };
                        references.push(vo);

                    // } else {
                    //     console.log("/Products/ - getDefaultProductAndVariationReferences OMIT:", _v.code );
                    // }
                } );

                return {
                    design : defaultDesign, // *** changed to match normal name - TODO tidy up to avoid confusion!
                    references : references
                };
            },



            /**
             * resolve name against code or vice-versa
             * e.g.
             * Products.methods().resolveNameOrCode( "silk_wool", "fabrics", "code" );
             * Products.methods().resolveNameOrCode( "SILWOO", "fabrics", "name" );
             */
            resolveNameOrCode : function ( _term, _type, _property = "code" ) {

                let lookup = Products.data.lookupVO[ _type ],
                /*p = ( _property === "code" ) ? "name" : "code",*/
                    p = ( _property === "code" ) ? "uid" : "code",
                    r = null;

                if( lookup ){
                    r = _.find( lookup, function ( _v ) {
                        // ////////console.log("/Products/ - ", _v );
                        return ( _v[ p ] === _term ) ? _v : null
                    });
                }

                if( r ){
                    // ////////console.log("/Products/ -resolveNameOrCode ", _term, ">", r[ _property ]);
                    return r[ _property ]
                } else {
                    // console.warn("/Products/ -resolveNameOrCode: '" + _term + "' NOT FOUND - check lookup table!");
                    return null
                }
            },

            extractCodeFragmentByIndex : function ( _data, _index, _unique = true ) {
                // ////////console.log("/Products/ -extractCodeFragmentByIndex ", _data );

                let r = [];

                _.each( _data, function ( _v ) {
                    // ////////console.log("/Products/ - ", _v.code );

                    let c = _v.code.split( Products.props.symbols.delimiter );
                    // ////////console.log("/Products/ - ", c );

                    r.push( c[ _index ]);
                });

                if( _unique ){
                    r = _.uniq( r );
                }

                // ////////console.log("/Products/ -extractCodeFragmentByIndex ", a );

                return r

            },

            /**
             * simple util to retrieve fragment from code
             * @param _code
             * @param _index
             * @returns {Array|*}
             */
            getCodeFragment : function ( _code, _index ) {

                var d = _code.split("/");
                // ////////console.log("/Products/ -getCodeFragment ", d[ _index ]);
                return d[ _index ]
            },

            // *** TODO TIDY UP
            // *** this is a macro type thing to be called by the queryrunner

            // *** FIXIT not taking account of 'also available in!'
            /*
             queryFabrics : function ( _fabrics ) {

             let array = [];

             _.each( _fabrics, function ( _v ) {
             let code = Products.methods().resolveNameOrCode( _v, "fabrics", "code" );
             let searchByCodeFragment = Products.methods().searchByCodeFragment( code, null, true );
             array.push( searchByCodeFragment );
             } );

             array = _.flatten( array );

             let getUniqueDesignNames = Products.methods().extractCodeFragmentByIndex( array, Products.props.codeFragmentIndices.design, true  );
             let designs = Products.methods().splitByDesign( Products.data.productsVO );
             let defaults = [];

             _.each( getUniqueDesignNames, function ( _v ) {

             let name = Products.methods().resolveNameOrCode( _v, "designs", "name" );
             let matchingDesign = _.find( designs, function ( _v ) {
             return ( _v.friendly_name === name ) ? _v : null
             });

             //////////console.log("%c /Products/ - MATCHING", "color:#00ff00", matchingDesign );

             Products.methods().getDefaultFabricVariation( matchingDesign );

             //let d = Products.methods().getDefaultProductAndVariationReferences( matchingDesign );
             //defaults.push( d );
             } );

             // ////////console.log("/Products/ -findFabricTest ", defaults );

             return defaults

             }
             */


            /**
             *
             * @param _data = dataset
             * @param _fragment = e.g."EUS"
             * @param _property = e.g. "code"
             * @returns {Array}
             */
            /*searchByCodeFragmentFrom : function ( _data, _fragment, _property ) {

             let r = _.filter( _data, function ( _v ) {
             return ( _v[ _property ].indexOf( _fragment ) !== -1 )
             });

             ////console.log("/Products/ -searchByCodeFragmentFrom ", _fragment, r );

             return r
             },*/


            searchByCodeFragmentFrom : function ( _data, _fragment, _property ) {

                let otherFabrics = [];

                let r = _.filter( _data, function ( _v ) {

                    if( _v[ _property ].indexOf( _fragment ) !== -1 ){
                        return _v
                    } else {
                        otherFabrics.push( _v );
                    }
                });

                // ////console.log("/Products/ -searchByCodeFragmentFrom ", _fragment, r, otherFabrics );

                return {
                    results : r,
                    others : otherFabrics
                }
            },



            getFabricDefaultsAndReferences : function ( _fabric ) {

                // ////////console.log("/Products/ -getFabricDefaultsAndReferences ", _fabric );

                let r = [];

                // *** get array of design code fragments, e.g. ["EUS", "CHA"] that we can use to group by design
                _.each( Products.methods().extractCodeFragmentByIndex( _fabric, 1, true ), function ( _v ) {

                    let bydesign = Products.methods().searchByCodeFragmentFrom( _fabric, _v, "code" ).results; // *** TEST added '.results'

                    let vo = {
                        design : null,
                        references : []
                    };

                    // *** NOTE determine if any item in this design has default_by_fabric_type set to true
                    let hasDefaultByFabricType = !!_.find( bydesign, function ( _v ) {
                        return ( _v.default_by_fabric_type === true )
                    });

                    // *** NOTE if no default_by_fabric_type (through unset or data entry error) set first item as default
                    if( !hasDefaultByFabricType ){
                        bydesign[ 0 ].default_by_fabric_type = true;
                        //////console.log("/Products/ - SHOULD INTERVENE", bydesign[ 0 ].default_by_fabric_type );
                    }


                    _.each( bydesign, function ( _v ) {

                        if( _v.default_by_fabric_type === true ){

                            // hasDefaultByFabricType = true;

                            vo.design = _v;

                            // *** we may as well add this to references to make it easier for the colour thumb selector ui to consume
                            vo.references.push({
                                code: _v.code,
                                //colour: _v.colour
                                tags: _v.tags.toLowerCase()
                            });

                            _v._references = vo; // TEST * cache this

                        } else {

                            vo.references.push({
                                code: _v.code,
                                //colour: _v.colour
                                tags: _v.tags.toLowerCase()
                            });

                            _v._references = vo.references; // TEST  * cache this
                        }

                    } );

                    if( !vo.design ){
                        console.error("/Products/ - ***ERROR*** design code: '" + _v + "'. Must be data error - check 'default_by_fabric_type' boolean is correct!\n Item has been excluded." );

                        //////console.log("/Products/ - ERROR --use?:", bydesign[ 0 ] );

                    } else {
                        r.push( vo );
                    }

                });


                // *** almost works, but need to split into designs first
                /*_.each( _fabric, function ( _v ) {

                 if( _v.default_by_fabric_type === true ){
                 // ////////console.log("/Products/ - DEFAULT IS", _v.code, _v.default_by_fabric_type );

                 vo.defaultDesign = _v;

                 } else {
                 // ////////console.log("/Products/ - OTHER", _v.code, _v.default_by_fabric_type );

                 vo.references.push({
                 code: _v.code,
                 colour: _v.colour
                 });
                 }
                 });*/

                //return vo

                return r;
            },

            // *** FIXIT need a way to just get the references from a design object for detail view
            /*getDesignReferences : function ( _design ) {

             let fabricName = Products.methods().getFabricNameFromCode( _design.code );

             ////////console.log("/Products/ -getDesignReferences ", fabricName );
             },*/

            /**
             * called directly from 'productitemui' to populate fabric field with friendly name - negates having to store this value in db as it is easy enough to infer
             * @param _code
             * @returns {*}
             */
            getFabricNameFromCode : function ( _code ) {

                let c = _code.split( Products.props.symbols.delimiter ),
                    r = Products.methods().resolveNameOrCode( c[ 0 ], "fabrics", "label" );

                return r
            },

            getDesignNameFromCode : function ( _code ) {

                let c = _code.split( Products.props.symbols.delimiter ),
                    r = Products.methods().resolveNameOrCode( c[ 1 ], "designs", "label" );

                return r
            },

            getColourNameFromCode : function ( _code ) {

                let c = _code.split( Products.props.symbols.delimiter ),
                    r = Products.methods().resolveNameOrCode( c[ 2 ], "colours", "label" );

                return r
            },


            /**
             * 'COT' returns all designs with code starting with 'COT' - won't return 'SILCOT' for example
             *
             * @param _codeFragment
             * @returns {Array}
             */
            getDesignsByFabricCode : function ( _codeFragment ) {

                let v = this.getAllVariations( this.splitByDesign( Products.data.productsVO )),
                    r = [];

                _.each( v, function ( _v ) {

                    let p = _v.code.split( Products.props.symbols.delimiter )[ 0 ];

                    if( p === _codeFragment ){
                        // //////console.log("/Products/ - MATCH?", p, _codeFragment );
                        r.push( _v )
                    }

                } );

                return r;
            },



            // *** use for find colour selector to switch from 'all fabrics' to 'selected fabrics' if a fabric deselected
            getTotalNumberOfProducts : function () {

                if( !Products.props.metrics.totalNumProducts ){
                    _.each( Products.data.productsVO, function ( _v, _key ) {
                        let z = _.find( _v, "variations" );
                        Products.props.metrics.totalNumProducts += z.variations.length;
                    });
                }

                return {
                    total : Products.props.metrics.totalNumProducts,
                    selected : Products.data.currentOutputVO.length,
                    all : ( Products.data.currentOutputVO.length === Products.props.metrics.totalNumProducts )
                }
            },


            getTotalNumberOfFabrics : function () {

                if( !Products.props.metrics.totalNumFabrics ){
                    Products.props.metrics.totalNumFabrics = Products.data.lookupVO.fabrics.length;
                }

                // ////console.log("/Products/ -getTotalNumberOfFabrics ", Products.props.metrics.currNumFabricsSelected, Products.props.metrics.totalNumFabrics );

                return {
                    total : Products.props.metrics.totalNumFabrics,
                    selected : Products.props.metrics.currNumFabricsSelected,
                    all : ( ( Products.props.metrics.currNumFabricsSelected ) === Products.props.metrics.totalNumFabrics )
                }
            },


            getAllFabricNamesAsArray : function () {

                if( !Products.props.cache.allFabricNamesAsArray ){

                    Products.props.cache.allFabricNamesAsArray = _.map( Products.data.lookupVO.fabrics, function ( _v ) {
                        return _v.uid;
                    });
                }

                return Products.props.cache.allFabricNamesAsArray
            },


            /**
             *
             * @param _fabrics
             * @returns {Array}
             */
            queryFabrics : function ( _fabrics ) {

                let byFabricType = [];

                _.each( _fabrics, function ( _v ) {

                    // //////console.log("/Products/ - FABRICS???", _v );

                    let code = Products.methods().resolveNameOrCode( _v, "fabrics", "code" ),
                        searchByCodeFragment = Products.methods().getDesignsByFabricCode( code ),
                        sorted = Products.methods().getFabricDefaultsAndReferences( searchByCodeFragment );

                    byFabricType.push( sorted );
                } );

                // //////console.log("/Products/ -queryFabrics ", code );

                byFabricType = _.flatten( byFabricType );
                byFabricType = _.uniq( byFabricType );

                // return _.flatten( byFabricType );
                return byFabricType;
            },


            /**
             * works for detail view
             * @param _code
             * @returns {{design: *, references: Array}}
             */
            queryDesignByCode : function ( _code ) {

                let product = Products.methods().searchByProductCode( _code ), // *** get product vo
                    siblingDesigns = Products.methods().searchByCodeFragment( _code, Products.props.codeFragmentIndices.design ), // *** get all from design group

                    // *** filter by same fabric as selection
                    filteredByFabricType = Products.methods().searchByCodeFragmentFrom( siblingDesigns, Products.methods().getCodeFragment( _code, 0 ), "code" );

                // console.log("/Products/ -queryDesignByCode _code", _code );
                // console.log("/Products/ -queryDesignByCode product", product );
                // console.log("/Products/ -queryDesignByCode siblingDesigns", siblingDesigns );
                // console.log("/Products/ -queryDesignByCode filteredByFabricType", filteredByFabricType );

                let vo = {
                    design : product,
                    references : [],
                    otherFabrics : []
                };

                _.each( filteredByFabricType.results, function ( _v ) {
                    vo.references.push({
                        code: _v.code
                        //colour: _v.colour
                    });
                });

                _.each( filteredByFabricType.others, function ( _v ) {
                    // ////console.log("/Products/ - OTHERS", _v.code, _v.default_by_fabric_type );

                    if( _v.default_by_fabric_type ){
                        vo.otherFabrics.push( { code : _v.code } );
                    }

                });

                // ////console.log("/Products/ -queryDesignByCode ", vo );

                return vo
            },


            filterScopedByColourTags : function ( _data, _colours ) {
                // console.log("/Products/ -filterScopedByColourTags ", _colours );

                let r = [];

                _.each( _data, function ( _v ) {

                    let tags = _v.design.tags.toLowerCase();
                    // console.log("/Products/ - tags:", _v.design.code, _v.references );

                    // console.log("/Products/ - ", _v );

                    _.each( _colours, function ( _vv ) {

                        // console.log("/Products/ - each", _vv );

                        let rg = new RegExp("\\b" + _vv + "\\b").test( tags );

                        // console.log("/Products/ - ???", rg );

                        if( rg ){
                            // console.log("/Products/ - ", _v.design );
                            r.push( _v );
                        } else {
                            // NOTE if design is blue and doesn't match white, check if there is a sibling that is white
                            // NOTE iterate references
                            // works! 051016
                            _.each( _v.references, function ( _ref ) {
                                // console.log("/Products/ - REFS:", _r.tags );

                                let rg = new RegExp("\\b" + _vv + "\\b").test( _ref.tags );
                                // console.log("/Products/ - ", _ref.code, rg );

                                if( rg ){
                                    let result = Products.methods().searchByProductCode( _ref.code );
                                    // console.log("/Products/ - MATCH", result );
                                    r.push( { design : result, references : result._references } );
                                }
                            } )
                        }



                    } );
                });

                r = _.uniqBy( r, "design.code" );

                return r;
            },

            // *** MY SWATCHES
            getMySwatchesFromCodes : function ( _codes ) {

                // *** if not cached iterate everything
                if( !Products.props.cache.allProductsAsArray ){

                    let allProducts = _.map( Products.data.productsVO, function ( _v ) {
                        return _.find( _v, "variations" ).variations
                    });

                    Products.props.cache.allProductsAsArray = _.flatten( allProducts );
                }

                let r = _.map( _codes, function ( _code ) {
                    return _.find( Products.props.cache.allProductsAsArray, function ( _v ) {
                        return _v.code === _code
                    });
                });

                return _.uniq( r );
            }
        }
    },

    dispatch : ( _action, _data ) => {

        // console.log("/Products/ -dispatch ", _action, _data );

        Products.events.Sg_PRODUCT_MODEL_CHANGED.dispatch({
            action : _action,
            data : _data
        });
    }
};

export default {
    events : Products.events,
    init : Products.init,
    methods : Products.methods
}