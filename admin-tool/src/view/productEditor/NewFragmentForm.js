import React, {useEffect, useState} from 'react';
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
  
  const [statusMessage, setStatusMessage] = useState('');
  
  
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
    setStatusMessage(props.newConfigFabricResponseMessage);
    setNewConfigFabricCode('');
    setNewConfigFabricLabel('');
  
    setNewConfigColourCode('');
    setNewConfigColourLabel('');
  
    props.dispatch(actions.GET_CONFIG_FABRICS_DATA({
      path: `${config.api.getConfigFabrics}`
    }));
  
    props.dispatch(actions.GET_CONFIG_COLOURS_DATA({
      path: `${config.api.getConfigColours}`
    }));
    
  }, [props.newConfigFabricResponseMessage]);
  
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
      
      <div className="product-filter new-fragment-form">
        
        <h4 className="filter-title">Create new fabric/colour <span className="filter-title__desc">New entries will be available in the item editors a prestissimo</span></h4>
  
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
              maxlength: 9,
              placeholder: 'CODE',
              change: (value) => {
                setNewConfigFabricCode(value.toUpperCase());
              },
              click: () => {console.log('/VariationsItem/ -click --fabric');},
              classes: 'input-item--uppercase input-item--width-small',
            })}
            
            {createInput({
              maxlength: 128,
              placeholder: 'Label',
              change: (value) => {
                setNewConfigFabricLabel(value);
              },
              click: () => {console.log('/VariationsItem/ -click --fabric');},
              classes: 'input-item',
            })}
  
            <button className={cx('button', (canSaveFabric) ? '' : 'button--is-disabled')} onClick={() => {onSaveNewConfigFabric()}}>SAVE</button>
          </div>
          
  
          <div className="form-group">
    
            {createInput({
              maxlength: 9,
              placeholder: 'CODE',
              change: (value) => {
                setNewConfigColourCode(value.toUpperCase());
              },
              click: () => {console.log('/VariationsItem/ -click --fabric');},
              classes: 'input-item--uppercase input-item--width-small',
            })}
    
            {createInput({
              maxlength: 128,
              placeholder: 'Label',
              change: (value) => {
                setNewConfigColourLabel(value);
              },
              click: () => {console.log('/VariationsItem/ -click --fabric');},
              classes: 'input-item',
            })}
  
            <button className={cx('button', (canSaveColour) ? '' : 'button--is-disabled')} onClick={() => {onSaveNewConfigColour()}}>SAVE</button>
          </div>
          
        </div>
        
        <p className="form-group__title">{statusMessage}</p>
        
      </div>
  );
};

const mapStateToProps = (state) => {
  const {newConfigFabricResponseMessage} = state;
  return {newConfigFabricResponseMessage} // *** ???
};

export default connect(mapStateToProps, null)(NewFragmentForm);
