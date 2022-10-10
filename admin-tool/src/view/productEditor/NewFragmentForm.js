import React, {useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import config from '../../config';
import {connect} from 'react-redux';
import utils from '../../utils';
import {actions} from '../../state';

const NewFragmentForm = (props) => {
  
  // const [isSelected, setIsSelected] = useState(false);
  
  const [newConfigFabricCode, setNewConfigFabricCode] = useState('');
  const [newConfigFabricLabel, setNewConfigFabricLabel] = useState('');
  const [canSaveFabric, setCanSaveFabric] = useState(false);
  
  const [newConfigColourCode, setNewConfigColourCode] = useState('');
  const [newConfigColourLabel, setNewConfigColourLabel] = useState('');
  const [canSaveColour, setCanSaveColour] = useState(false);
  
  const [configFabricStatusMessage, setConfigFabricStatusMessage] = useState('');
  const [configColourStatusMessage, setConfigColourStatusMessage] = useState('');
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  
  
  
  
  useEffect(() => {
    setCanSaveFabric(
        newConfigFabricCode.length > 1 && newConfigFabricLabel.length > 1
    );
  }, [newConfigFabricCode, newConfigFabricLabel]);
  
  useEffect(() => {
    setCanSaveColour(
        newConfigColourCode.length > 1 && newConfigColourLabel.length > 1
    );
  }, [newConfigColourCode, newConfigColourLabel]);
  
  
  useEffect(() => {
    setConfigFabricStatusMessage(props.newConfigFabricResponseMessage);
    
    props.dispatch(actions.GET_CONFIG_FABRICS_DATA({
      path: `${config.api.getConfigFabrics}`
    }));
    
  }, [props.newConfigFabricResponseMessage]);
  
  
  useEffect(() => {
    setConfigColourStatusMessage(props.newConfigColourResponseMessage);
    
    props.dispatch(actions.GET_CONFIG_COLOURS_DATA({
      path: `${config.api.getConfigColours}`
    }));
    
  }, [props.newConfigColourResponseMessage]);
  
  /*useEffect(() => {
    console.log('/NewFragmentForm/ -EXPANDED', isExpanded);
  }, [isExpanded])*/
  
  
  
  
  /*useEffect(() => {
    setStatusMessage(props.newConfigFabricResponseMessage);
    setNewConfigColourCode('');
    setNewConfigColourLabel('');
    
    props.dispatch(actions.GET_CONFIG_COLOURS_DATA({
      path: `${config.api.getConfigColours}`
    }));
    
  }, [props.newConfigColourResponseMessage]);*/
  
  
  const onSaveNewConfigFabric = () => {
    console.log('/VariationsItem/ -onSaveNewConfigFabric');
    
    props.dispatch(actions.DB_CREATE_CONFIG_FABRIC({
      code: newConfigFabricCode,
      label: newConfigFabricLabel,
    }));
  }
  
  const onSaveNewConfigColour = () => {
    console.log('/VariationsItem/ -onSaveNewConfigColour');
    
    props.dispatch(actions.DB_CREATE_CONFIG_COLOUR({
      code: newConfigColourCode,
      label: newConfigColourLabel,
    }));
  }
  
  const createInput = (options) => {
    return (
        <input className={cx('input-item', options.classes)}
               ref={options.ref}
               maxLength={options.maxlength || 64}
               type="text" placeholder={options.placeholder} value={options.value}
               onChange= {(e) => {
                 options.change(e.target.value);
               }}
               onKeyPress={options.click}
        />
    )
  }
  
  return (
      /*<span className="filter-title__desc">New entries will be available in the item editors once saved</span>*/
      // <div className="product-filter new-fragment-form product-filter--is-collapsed">
      <div className={cx("product-filter new-fragment-form", (isExpanded) ? "" : "product-filter--is-collapsed")}>
        
        <h4 className="filter-title" onClick={() => {
          setIsExpanded(!isExpanded);
        }}>Create new fabric/colour<span className={cx('filter-title__expand-btn', (isExpanded) ? 'filter-title__expand-btn--is-expanded' : '')}>&lt;</span>
          <span className="filter-title__desc">New entries will be available in the item editors once saved</span></h4>
        
        <div className="form-row">
          <div className="form-group">
            <span className="form-group__title">Create new Fabric:</span>
          </div>
          <div className="form-group">
            <span className="form-group__title">Create new Colour:</span>
          </div>
        </div>
        
        
        <div className="form-row">
          <div className="form-group">
            
            {createInput({
              ref: inputRef1,
              maxlength: 9,
              placeholder: 'CODE',
              change: (value) => {
                setNewConfigFabricCode(value.toUpperCase());
              },
              click: () => {console.log('/VariationsItem/ -click --fabric');},
              classes: 'input-item--uppercase input-item--width-small',
            })}
            
            {createInput({
              ref: inputRef2,
              maxlength: 128,
              placeholder: 'Label',
              change: (value) => {
                setNewConfigFabricLabel(value);
              },
              click: () => {console.log('/VariationsItem/ -click --fabric');},
              classes: 'input-item',
            })}
            
            <button className={cx('button', (canSaveFabric) ? '' : 'button--is-disabled')} onClick={() => {onSaveNewConfigFabric()}}>SAVE</button>
            
            {/*<p className="form-group__title">{statusMessage}</p>*/}
          </div>
          
          
          <div className="form-group">
            
            {createInput({
              ref: inputRef3,
              maxlength: 9,
              placeholder: 'CODE',
              change: (value) => {
                setNewConfigColourCode(value.toUpperCase());
              },
              click: () => {console.log('/VariationsItem/ -click --fabric');},
              classes: 'input-item--uppercase input-item--width-small',
            })}
            
            {createInput({
              ref: inputRef4,
              maxlength: 128,
              placeholder: 'Label',
              change: (value) => {
                setNewConfigColourLabel(value);
              },
              click: () => {console.log('/VariationsItem/ -click --fabric');},
              classes: 'input-item',
            })}
            
            <button className={cx('button', (canSaveColour) ? '' : 'button--is-disabled')} onClick={() => {onSaveNewConfigColour()}}>SAVE</button>
            
            {/*<p className="form-group__title">{statusMessage}</p>*/}
          </div>
        
        </div>
        
        
        
        <div className="form-row">
          <div className="form-group">
            <p className="form-group__title">{configFabricStatusMessage}</p>
          </div>
          <div className="form-group">
            <p className="form-group__title">{configColourStatusMessage}</p>
          </div>
        </div>
        
        <div className="button-container--rhs">
          <button className="button" onClick={() => {
            setConfigFabricStatusMessage('');
            setConfigColourStatusMessage('');
            setNewConfigFabricCode('');
            setNewConfigFabricLabel('');
            setNewConfigColourCode('');
            setNewConfigColourLabel('');
            
            // *** nasty uncontrolled input hack :(
            inputRef1.current.value = '';
            inputRef2.current.value = '';
            inputRef3.current.value = '';
            inputRef4.current.value = '';
            
          }}>CLEAR FORM</button>
        </div>
      
      </div>
  );
};

const mapStateToProps = (state) => {
  const {newConfigFabricResponseMessage, newConfigColourResponseMessage} = state;
  return {newConfigFabricResponseMessage, newConfigColourResponseMessage} // *** ???
};

export default connect(mapStateToProps, null)(NewFragmentForm);
