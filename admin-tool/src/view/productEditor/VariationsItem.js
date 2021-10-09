import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

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
  
  const [isDefault, setIsDefault] = useState(false);
  
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
  
  
  const init = () => {
    
    if (props.isNewItem) {
      setDesignCode(props.selectedDesign.default_product_code.match(/\/([^)]+)\//)[1]); // *** FIXIT utilise legacy config.json, sanitise somehow
      return;
    }
    
    const s1 = props.data.code.indexOf('/');
    const s2 = props.data.code.lastIndexOf('/');
    setFabricCode(props.data.code.substring(0, s1));
    setDesignCode(props.data.code.substring(s1 + 1, s2));
    setColourCode(props.data.code.substring(s2 + 1));
    
    if (props.data.tags) {
      setTags(props.data.tags);
    }
    
    if (props.data.default_by_fabric_type) {
      setIsDefault(props.data.default_by_fabric_type);
    }
    
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
    props.onDeleteFn({
      uid: props.uid,
      isNewItem: props.isNewItem,
    });
  }
  
  const onChange = (fn) => {
    console.log('/VariationsItem/ -onChange');
  }
  
  const createInput = (options) => {
    // console.log('/VariationsItem/ -createInput', options);
    return (
        <input className={cx('input-item', options.classes)}
               maxLength={options.maxlength || 64}
               type="text" placeholder={options.placeholder} value={options.value}
               onChange= {(e) => {
                 setIsDirtyData(true);
                 options.change(e.target.value);
               }}
               onKeyPress={options.click}
        />
    )
  }
  
  return (
      <div className={cx('variations-item',
          (props.isNewItem) ? 'variations-item--unsaved' : null,
          (isDirtyData) ? 'variations-item--has-dirty-data' : null
          )}>
        <p>UID: {props.uid}</p>
        
        <div className="form-row">
          <div className="form-group">
            <span className="form-group__title">CODE:</span>
            {createInput({
              maxlength: 9,
              placeholder: 'fabric', value: fabricCode,
              change: (value) => {
                setFabricCode(value.toUpperCase());
              },
              click: () => {console.log('/VariationsItem/ -click --fabric');},
              classes: 'input-item--uppercase',
            })}
            {createInput({
              maxlength: 9,
              placeholder: 'design', value: designCode,
              change: ()=>{},
              click: ()=>{},
              classes: 'input-item--uppercase input-item--read-only',
            })}
            {createInput({
              maxlength: 9,
              placeholder: 'colour', value: colourCode,
              change: (value) => {
                setColourCode(value.toUpperCase());
              },
              click: () => {console.log('/VariationsItem/ -click --colour');},
              classes: 'input-item--uppercase',
            })}
            <div className="form-group__validation-message">
              validation...
            </div>
          </div>
          
          <div className="form-group">
            <span className="form-group__title">MAKE DEFAULT:</span>
            <input type='checkbox' className={cx('checkbox')}
                   checked={isDefault}
                   onChange={(e) => {
                     // setIsDirtyData(true);
                     setIsDefault(e.target.checked);
                   }}
            />
          </div>
        </div>
  
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
          <button className={cx('button', (!isDirtyData) ? 'button--is-disabled' : null)}
              onClick={() => onSave()}>SAVE XXX</button>
          <button className={cx('button')}
              onClick={() => onDelete()}>DELETE</button>
          </div>
        </div>
      </div>
  );
};


const mapStateToProps = (state) => {
  const {selectedDesign} = state;
  return {selectedDesign}
};

export default connect(mapStateToProps, null)(VariationsItem);
