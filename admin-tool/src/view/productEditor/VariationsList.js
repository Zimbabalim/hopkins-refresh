import React, {useEffect, useState, useRef} from "react";
import {connect} from 'react-redux';
import VariationsItem from './VariationsItem';
import utils from '../../utils';
import {actions} from '../../state';

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
  
  /**
   * update design on db
   */
  const dbUpdateDesign = (type) => {
    
    if (type === dbDataTypes.STATIC) return;
    
    const cloneDesign = Object.assign({}, props.selectedDesign);
    cloneDesign.variations = variationsDbData.data;
    
    console.log('/VariationsList/ -dbUpdateDesign', cloneDesign);
    props.dispatch(actions.dbUpdateDesign({
      type,
      data: cloneDesign,
    }));
  }
  
  /**
   * delete whole design TODO db
   */
  const deleteDesign = () => {
    console.log('/VariationsList/ -deleteDesign');
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
    
    
    if (identity.isNewItem) {
      /*let targetIndex = findItemIndex(persistNewVariations.current, identity);
      let newData = persistNewVariations.current[targetIndex].props.data;
      console.warn('/VariationsList/ -onVariationSave YYY', identity.data, '>>>', newData);
  
      const cloneData = [...persistVariationsDbData.current.data];
      cloneData.unshift(newData);
      setVariationsDbData({type: dbDataTypes.CREATE_NEW_VARIATION, data: cloneData});*/
      

      const dbData = [...persistVariationsDbData.current.data];
      dbData.unshift(identity.data);
      setVariationsDbData({type: dbDataTypes.CREATE_NEW_VARIATION, data: dbData});
  
      return;
    }
  
    // FIXIT overwrite and save - refer to commented code above
    const cloneData = [...persistVariationsDbData.current.data];
    setVariationsDbData({type: dbDataTypes.SAVE, data: cloneData});
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
    />
  }

  return (
      <>
        <div className='variations-list__action-bar' >
          {props.selectedDesign && (
              <>
                <h3>{props.selectedDesign.friendly_name}</h3>
                <p>{liveVariations.length} items</p>
                <button onClick={() => {
                  createBlankVariation();
                }}>ADD VARIATION</button>
                <button onClick={() => deleteDesign()}>DELETE DESIGN</button>
              </>
          )}
        </div>
        
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
