import React, {useEffect, useState} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

const VariationsItem = (props) => {
  
  const [designCode, setDesignCode] = useState('');
  const [fabricCode, setFabricCode] = useState('');
  const [colourCode, setColourCode] = useState('');
  
  useEffect(() => {
    // console.log('/VariationsItem/ -', props.selectedDesign);
    // setDesignCode(getDesignCode());
    init();
  }, []);
  
  const init = () => {
    
    // return;
    
    if (props.isNewItem) {
      setDesignCode(props.selectedDesign.default_product_code.match(/\/([^)]+)\//)[1]); // *** FIXIT utilise legacy config.json, sanitise somehow
      return;
    }
    
    const s1 = props.data.code.indexOf('/');
    const s2 = props.data.code.lastIndexOf('/');
    
    setFabricCode(props.data.code.substring(0, s1));
    setDesignCode(props.data.code.substring(s1 + 1, s2));
    setColourCode(props.data.code.substring(s2 + 1));
  }

  
  const onSave = () => {
    // TODO validations
    props.onSaveFn({
      uid: props.uid,
      isNewItem: props.isNewItem,
      data: {
        code: `${fabricCode}/${designCode}/${colourCode}`,
      }
    });
  }
  
  const onDelete = () => {
    props.onDeleteFn({
      uid: props.uid,
      isNewItem: props.isNewItem,
    });
  }
  
  const createInput = (options) => {
    // console.log('/VariationsItem/ -createInput', options);
    return (
        <input className={cx('input-item', options.classes)}
               maxLength={options.maxlength || 64}
               type="text" placeholder={options.placeholder} value={options.value}
               onChange= {options.change}
               onKeyPress={options.click}
        />
    )
  }
  
  
  return (
      <div className={cx('variations-item', props.isNewItem ? 'variations-item--unsaved' : null)}>
        <p>UID: {props.uid}</p>
        
        <div className="form-row">
          <div className="form-group">
            <span className="form-group__title">CODE:</span>
            {createInput({
              maxlength: 9,
              placeholder: 'fabric', value: fabricCode,
              change: e => setFabricCode(e.target.value.toUpperCase()),
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
              change: e => setColourCode(e.target.value.toUpperCase()),
              click: () => {console.log('/VariationsItem/ -click --colour');},
              classes: 'input-item--uppercase',
            })}
            <div className="form-group__validation-message">
              validation...
            </div>
          </div>
        </div>
        
        
        <div className='variations-item__action-bar'>
          <button onClick={() => onSave()}>SAVE</button>
          <button onClick={() => onDelete()}>DELETE</button>
        </div>
      </div>
  );
  
  
  
  /*return (
      <div className={cx('variations-item', props.isNewItem ? 'variations-item--unsaved' : null)}>
        <p>UID: {props.uid}</p>
        <p>{props.data.code}</p>
        <p>{props.data.tags}</p>
        <button>UPLOAD IMAGE</button>
        <p>{props.data.details.width}</p>
        <p>{props.data.details.repeats}</p>
        <p>price TODO</p>
        <div className='variations-item__action-bar'>
          <button onClick={() => onSave()}>SAVE</button>
          <button onClick={() => onDelete()}>DELETE</button>
        </div>
      </div>
  );*/
};

/*export default VariationsItem;*/

const mapStateToProps = (state) => {
  const {selectedDesign} = state;
  return {selectedDesign}
};

export default connect(mapStateToProps, null)(VariationsItem);
