import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';
import config from '../../config';
import utils from '../../utils';

const VariationsItem = (props) => {
  
  const [isDirtyData, setIsDirtyData] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  
  const [designCode, setDesignCode] = useState('');
  const [fabricCode, setFabricCode] = useState('');
  const [colourCode, setColourCode] = useState('');
  const [tags, setTags] = useState('');
  const [widthInches, setWidthInches] = useState('');
  const [widthCms, setWidthCms] = useState('');
  const [repeatInches, setRepeatInches] = useState('');
  const [repeatCms, setRepeatCms] = useState('');
  const [price, setPrice] = useState(''); //POA
  const [tax, setTax] = useState(''); //+VAT/M
  const [currency, setCurrency] = useState('£'); // *** if required at some point
  
  const [isDefault, setIsDefault] = useState(false); // FIXIT
  
  const [trigger, setTrigger] = useState(false); // *** image cache buster
  
  const [isPendingDelete, setIsPendingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
/*  const [newConfigFabricCode, setNewConfigFabricCode] = useState('');
  const [newConfigFabricLabel, setNewConfigFabricLabel] = useState('');*/
  
  
  
  useEffect(() => {
    init();
  }, []);
  
  useEffect(() => {
    
    if (!isFirstRender) {
      props.onDefaultChanged({
        uid: props.uid,
        isNewItem: props.isNewItem,
        data: {
          isDefault
        }
      });
    }
    setIsFirstRender(false);
    
  }, [isDefault]);
  
  useEffect(() => {
    console.log('/VariationsItem/ -TRIGGER', props.imagesUploaderTrigger);
    
    setTrigger(utils.uid());
    
  }, [props.imagesUploaderTrigger]);
  
  
  
  const init = () => {
    
    if (props.isNewItem) {
      setDesignCode(props.selectedDesign.default_product_code.match(/\/([^)]+)\//)[1]); // *** FIXIT utilise legacy config.json, sanitise somehow
      return;
    }
  
    props.data.code = props.data.code.trim(); // *** @as added pre launch, check doesn't bork
    const s1 = props.data.code.indexOf('/');
    const s2 = props.data.code.lastIndexOf('/');
    setFabricCode(props.data.code.substring(0, s1));
    setDesignCode(props.data.code.substring(s1 + 1, s2));
    setColourCode(props.data.code.substring(s2 + 1));
    
    if (props.data.tags) {
      setTags(props.data.tags);
    }
    
    // *** 9.10.22 remove this, just rely on the default_product_code TEST
    /*if (props.data.default_by_fabric_type) {
      setIsDefault(props.data.default_by_fabric_type);
    }*/
    // *** 9.10.22 seems to work
    setIsDefault(
        props.selectedDesign.default_product_code === props.data.code
    );
    
    
    console.log('/VariationsItem/ -init DEFAULT P CODE', props.selectedDesign.default_product_code === props.data.code, props.selectedDesign.default_product_code, props.data.code);
    
    const parseMeasures = (data) => {
      let v = data.split('/');
      return v.map((item) => {
        return item.replace(/[cms"]+/g, '').trim();
      });
    }
    
    if (props.data.details && props.data.details.width) {
      const r = parseMeasures(props.data.details.width);
      setWidthInches(r[0] || '...');
      setWidthCms(r[1] || '...');
    }
    
    if (props.data.details && props.data.details.repeats) {
      const r = parseMeasures(props.data.details.repeats);
      setRepeatInches(r[0] || '...');
      setRepeatCms(r[1] || '...');
    }
    
    setPrice(props.data.details.price || 'POA');
    setTax(props.data.details.tax || '+VAT/M');
  }
  
  
  const onSave = () => {
    // TODO validations
    props.onSaveFn({
      uid: props.uid,
      isNewItem: props.isNewItem,
      data: {
        code: `${fabricCode}/${designCode}/${colourCode}`,
        tags,
        details: {
          width: `${widthInches}"/${widthCms}cms`,
          repeats: `${repeatInches}"/${repeatCms}cms`,
          price: `${price}`,
          tax: `${tax}`,
          currency: `${currency}`,
        }
      }
    });
  }
  
  const onDelete = () => {
    setIsPendingDelete(!isPendingDelete);
    if (!isPendingDelete) return;
    
    setIsDeleting(true);
    
    // *** allow animation to complete
    setTimeout(() => {
      props.onDeleteFn({
        uid: props.uid,
        isNewItem: props.isNewItem,
      });
    }, 300); // *** ensure timing reflected in css
  }
  
  const onChange = (fn) => {
    // console.log('/VariationsItem/ -onChange');
  }
  
  /*const onSaveNewConfigFabric = () => {
    console.log('/VariationsItem/ -onSaveNewConfigFabric');
    // TODO validation
  }*/
  
  const createInput = (options) => {
    // console.log('/VariationsItem/ -createInput', options);
    return (
        <input className={cx('input-item', options.classes)}
               maxLength={options.maxlength || 64}
               type="text" placeholder={options.placeholder} value={options.value}
               onChange= {(e) => {
                 setIsDirtyData(true); // TODO should be optional?
                 setIsPendingDelete(false); // TODO should be optional?
                 options.change(e.target.value);
               }}
               onKeyPress={options.click}
        />
    )
  }
  
  const createSelect = (options) => {
    
    const provider = props[options.provider];
    // console.log('/VariationsItem/ -createSelect 222', options, options.currentState);
  
    return (
        // <div className="form-composite-item">
        <select className={cx('input-item')} value={options.currentState}
                onChange={(e) => {
                  // FIXIT doesn't honor all code slugs being entered
                  setIsDirtyData(true);
                  setIsPendingDelete(false);
                  options.onChangeSetter(e.target.value);
                }}>
          <option value="">...</option>
          {provider && provider.map((item) => {
            return (
                <option value={item.code} key={`option_${utils.uid()}`}>{item.code}</option>
            )
            })}
        </select>
    )
  }
  
/*
  const createNewFragmentControl = (options) => {
    return (
        <>
          {createInput({
            maxlength: 9,
            placeholder: 'CODE',
            change: (value) => {
              // setFabricCode(value.toUpperCase());
            },
            click: () => {console.log('/VariationsItem/ -click --fabric');},
            classes: 'input-item--uppercase',
          })}
  
          {createInput({
            maxlength: 9,
            placeholder: 'Label',
            change: (value) => {
              // setFabricCode(value.toUpperCase());
            },
            click: () => {console.log('/VariationsItem/ -click --fabric');},
            classes: 'input-item--uppercase',
          })}
        </>
    )
  }
*/
  
  const createImagesBlock = () => {
    return (<>
      <div className="image-wrapper">
        <div className="image-wrapper__caption"><span>A</span></div>
        <img src={`${config.api.imagesPath}/A/${fabricCode}-${designCode}-${colourCode}_a.jpg?cb=${trigger}`}/>
      </div>
      <div className="image-wrapper">
        <div className="image-wrapper__caption"><span>B</span></div>
        <img src={`${config.api.imagesPath}/B/${fabricCode}-${designCode}-${colourCode}_b.jpg?cb=${trigger}`}/>
      </div>
      <div className="image-wrapper">
        
        
        
        
        <div className="image-wrapper__caption"><span>C</span></div>
        <img src={`${config.api.imagesPath}/C/${fabricCode}-${designCode}-${colourCode}_c.jpg?cb=${trigger}`}/>
      </div>
    </>)
  }
  
  return (
      <div className={cx('variations-item',
          (props.isNewItem) ? 'variations-item--unsaved' : null,
          (isDirtyData) ? 'variations-item--has-dirty-data' : null,
          (isPendingDelete) ? 'item-will-delete' : null,
          (isDeleting) ? 'item-is-deleting' : null,
      )}>
        {/*<p>UID: {props.uid}</p>*/}
        
        <div className="form-row">
          <div className="form-group resizeable-container">
            {createImagesBlock()}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <span className="form-group__title">CODE:</span>
  
  
            {createSelect({
              provider: 'configFabrics',
              currentState: fabricCode,
              onChangeSetter: setFabricCode,
            })}
            
            
{/*
            {createInput({
              maxlength: 9,
              placeholder: 'fabric', value: fabricCode,
              change: (value) => {
                setFabricCode(value.toUpperCase());
              },
              click: () => {console.log('/VariationsItem/ -click --fabric');},
              classes: 'input-item--uppercase',
            })}
*/}
            {createInput({
              maxlength: 9,
              placeholder: 'design', value: designCode,
              change: ()=>{},
              click: ()=>{},
              classes: 'input-item--uppercase input-item--read-only',
            })}
{/*
            {createInput({
              maxlength: 9,
              placeholder: 'colour', value: colourCode,
              change: (value) => {
                setColourCode(value.toUpperCase());
              },
              click: () => {console.log('/VariationsItem/ -click --colour');},
              classes: 'input-item--uppercase',
            })}
*/}
  
            {createSelect({
              provider: 'configColours',
              currentState: colourCode,
              onChangeSetter: setColourCode,
            })}
            
            {/* TODO */}
            {/*<div className="form-group__validation-message">
              validation...
            </div>*/}
          </div>
          
          <div className="form-group">
            <span className="form-group__title">MAKE DEFAULT:</span>
            <input type='checkbox' className={cx('checkbox')}
                   checked={isDefault}
                   onChange={(e) => {
                     // setIsDirtyData(true);
                     
                     // console.log('/VariationsItem/ -CHANGE', e.target.checked, isDefault);
                     
                     // *** only allow update if not clicking on already checked checkbox...
                     if (!isDefault) setIsDefault(e.target.checked);
                     
                   }}
            />
          </div>
        </div>
  
        {/*<div className="form-row">
          <div className="form-group">
            <span className="form-group__title">NEW:</span>
            
            {createNewFragmentControl({provider: 'configFabrics'})}
            <button className="button" onClick={() => {onSaveNewConfigFabric()}}>SAVE</button>
            
          </div>
        </div>*/}
        
        {/* TAGS */}
        <div className="form-row">
          <div className="form-group form-group--full-width">
            <span className="form-group__title">TAGS:</span>
            {createInput({
              maxlength: 256,
              placeholder: 'tags', value: tags,
              change: (value) => {
                setTags(value);
              },
              click: () => {},
              classes: '',
            })}
          </div>
        </div>
        
        {/* WIDTH + REPEATS */}
        <div className="form-row">
          <div className="form-group">
            <span className="form-group__title">WIDTH:</span>
            <span className="form-group__subtitle">INCHES</span>
            {createInput({
              maxlength: 4,
              placeholder: 'inches', value: widthInches,
              change: (value) => {
                setWidthInches(value);
              },
              click: () => {},
              classes: 'input-item--width-small',
            })}
            <span className="form-group__subtitle">CM</span>
            {createInput({
              maxlength: 4,
              placeholder: 'cm', value: widthCms,
              change: (value) => {
                setWidthCms(value);
              },
              click: () => {},
              classes: 'input-item--width-small',
            })}
          </div>
          
          {/* repeats */}
          <div className="form-group">
            <span className="form-group__title">REPEATS:</span>
            <span className="form-group__subtitle">INCHES</span>
            {createInput({
              maxlength: 4,
              placeholder: 'inches', value: repeatInches,
              change: (value) => {
                setRepeatInches(value);
              },
              click: () => {},
              classes: 'input-item--width-small',
            })}
            <span className="form-group__subtitle">CM</span>
            {createInput({
              maxlength: 4,
              placeholder: 'cm', value: repeatCms,
              change: (value) => {
                setRepeatCms(value);
              },
              click: () => {},
              classes: 'input-item--width-small',
            })}
          </div>
        
        </div>
        
        {/* PRICE */}
        <div className="form-row">
          <div className="form-group">
            <span className="form-group__title">PRICE:</span>
            {createInput({
              maxlength: 8,
              placeholder: 'value', value: price,
              change: (value) => {
                setPrice(value);
              },
              click: () => {},
              classes: 'input-item--small',
            })}
            {createInput({
              maxlength: 32,
              placeholder: 'tax', value: tax,
              change: (value) => {
                setTax(value);
              },
              click: () => {},
              classes: 'input-item--small',
            })}
          </div>
        </div>
        
        
        <div className='variations-item__action-bar'>
          <div className={cx('button-group')}>
            <button className={cx('button',
                (!isDirtyData || isPendingDelete) ? 'button--is-disabled' : null)}
                    onClick={() => onSave()}>SAVE</button>
            <button className={cx('button', (isPendingDelete) ? 'button--warn' : null)}
                    onClick={() => onDelete()}>{(isPendingDelete) ? 'REALLY?' : 'DELETE'}</button>
          </div>
        </div>
      </div>
  );
};


const mapStateToProps = (state) => {
  const {selectedDesign, imagesUploaderTrigger, configFabrics, configColours} = state;
  return {selectedDesign, imagesUploaderTrigger, configFabrics, configColours}
};

export default connect(mapStateToProps, null)(VariationsItem);
