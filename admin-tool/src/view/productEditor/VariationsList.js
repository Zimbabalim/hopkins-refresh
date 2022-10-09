import React, {useEffect, useState, useRef} from "react";
import {connect} from 'react-redux';
import VariationsItem from './VariationsItem';
import utils from '../../utils';
import {actions} from '../../state';
import cx from 'classnames';

const VariationsList = (props) => {
  
  const dbDataTypes = {
    STATIC: 'STATIC', // *** unchanged
    DELETE_VARIATION: 'DELETE_VARIATION',
    CREATE_NEW_VARIATION: 'CREATE_NEW_VARIATION',
    SAVE: 'SAVE',
  }
  
  // *** state and refs
  const [newVariations, setNewVariations] = useState([]); // *** array of items added by user
  const [liveVariations, setLiveVariations] = useState([]); // *** array of items from datasource
  const [variationsDbData, setVariationsDbData] = useState({type: dbDataTypes.STATIC, data: []}); // *** source db data to update
  const persistNewVariations = useRef();
  persistNewVariations.current = newVariations; // *** required for latest state, onclick callbacks go stale!
  const persistLiveVariations = useRef();
  persistLiveVariations.current = liveVariations; // *** required for latest state
  const persistVariationsDbData = useRef();
  persistVariationsDbData.current = variationsDbData; // *** required for latest state
  
  const [notes, setNotes] = useState('');
  
  // TODO default product code state
  //default_product_code
  const [defaultProductCode, setDefaultProductCode] = useState('');
  
  
  
  // *** init/re-init on new design input
  useEffect(() => {
    setNewVariations([]);
    setLiveVariations([]);
    setVariationsDbData({type: dbDataTypes.STATIC, data: []});
    
    if (!props.selectedDesign) return;
    
    setVariationsDbData({type: dbDataTypes.STATIC, data: props.selectedDesign.variations});
    props.selectedDesign.variations.map((item) => {
      setLiveVariations(prev => [...prev, createVariation(item)]);
    });
    
  }, [props.selectedDesign]);
  
  // *** fork behaviour on variations data change
  useEffect(() => {
    dbUpdateDesign(variationsDbData.type);
  }, [variationsDbData]);
  
  useEffect(() => {
    if (!props.selectedDesign) return;
    // console.log('/VariationsList/ -PRODUCT CODE UPDATED', defaultProductCode, props.selectedDesign.default_product_code);
    dbUpdateDesign(dbDataTypes.SAVE);
  }, [defaultProductCode]);
  
  /**
   * update design on db
   */
  const dbUpdateDesign = (type) => {
    
    if (type === dbDataTypes.STATIC) return;
    
    const cloneDesign = Object.assign({}, props.selectedDesign);
    cloneDesign.variations = variationsDbData.data;
    cloneDesign.default_product_code = defaultProductCode;
    
    console.log('/VariationsList/ -dbUpdateDesign', cloneDesign, defaultProductCode);
    props.dispatch(actions.dbUpdateDesign({
      type,
      data: cloneDesign,
    }));
  }
  
  /**
   * delete whole design TODO db
   */
  const deleteDesign = () => {
    const id = props.selectedDesign._id;
    console.log('/UserView/ -deleteDesign', id);
    
    // return;
    
    props.dispatch(actions.dbDeleteDesign({
      id,
    }));
  }
  
  const createBlankVariation = () => {
    if (persistNewVariations.current.length > 0) return;
    setNewVariations(prev => [...prev, createVariation(null)]);
  }
  
  /**
   * save variation TODO db
   * @param identity
   */
  const onVariationSave = (identity) => {
    // *** save new item
    if (identity.isNewItem) {
      const dbData = [...persistVariationsDbData.current.data];
      dbData.unshift(identity.data);
      setVariationsDbData({type: dbDataTypes.CREATE_NEW_VARIATION, data: dbData});
      
      return;
    }
    // *** update existing item
    const targetIndex = findItemIndex(persistLiveVariations.current, identity);
    const dbData = [...persistVariationsDbData.current.data];
    dbData[targetIndex] = identity.data;
    setVariationsDbData({type: dbDataTypes.SAVE, data: dbData});
  }
  
  
  const onVariationDelete = (identity) => {
    if (identity.isNewItem) {
      let clone = [...persistNewVariations.current];
      let targetIndex = findItemIndex(persistNewVariations.current, identity);
      clone.splice(targetIndex, 1);
      setNewVariations(clone);
      return;
    }
    
    // *** live item, don't need to update view as data will reflow after db save response
    const targetIndex = findItemIndex(persistLiveVariations.current, identity);
    const cloneData = [...persistVariationsDbData.current.data];
    cloneData.splice(targetIndex, 1);
    setVariationsDbData({type: dbDataTypes.DELETE_VARIATION, data: cloneData});
  }
  
  // FIXIT TODO!!!!
  // requires strategy to change whole set, and save altogether
  const onVariationDefaultChanged = (identity) => {
    
    const index = findItemIndex(persistLiveVariations.current, identity);
    const item = persistLiveVariations.current[index];
    console.log('/VariationsList/ -onVariationDefaultChanged ITEM:', item.props.data.code, identity.data.isDefault);
    // console.log('/VariationsList/ -onVariationDefaultChanged DESIGN:', props.selectedDesign);
    
    if(identity.data.isDefault){ // TEST
      setDefaultProductCode(item.props.data.code);
    }
  }
  
  
  const findItemIndex = (dataset, identity) => {
    let result = null;
    dataset.find((item, index) => {
      if (identity.uid === item.props.uid) {
        result = index;
        return true;
      }
    });
    return result;
  }
  
  
  const createVariation = (data) => {
    let itemData = data;
    let isNewItem = !data;
    
    if (!itemData) {
      itemData = { // *** empty data for new variations
        code: '', tags: 'FIXME', details: {width: 'FIXME', repeats: 'FIXME',
        }
      };
    }
    
    return <VariationsItem
        key={utils.uid()}
        data={itemData}
        uid={utils.uid()}
        isNewItem={isNewItem}
        onSaveFn={onVariationSave}
        onDeleteFn={onVariationDelete}
        onDefaultChanged={onVariationDefaultChanged}
    />
  }
  
  return (
      <>
        {props.selectedDesign && (
            <div className='variations-list__action-bar' >
              <h2 className='design-title'>{props.selectedDesign.friendly_name}</h2>
              {/*<p>{liveVariations.length} items</p>*/}
              {/*<textarea className={cx('text-area')} defaultValue={'FIXME - persist data on focus leave'}/>*/}
              <div className={cx('button-group')}>
                <button className={cx('button')}
                        onClick={() => {createBlankVariation()}}>ADD VARIATION</button>
                <button className={cx('button')}
                        onClick={() => deleteDesign()}>DELETE DESIGN</button>
              </div>
            </div>
        )}
        {newVariations}
        {liveVariations}
      </>
  );
};

const mapStateToProps = (state) => {
  const {selectedDesign} = state;
  return {selectedDesign}
};

export default connect(mapStateToProps, null)(VariationsList);
