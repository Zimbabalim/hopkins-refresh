import React, {useEffect, useState, useRef} from "react";
import {connect} from 'react-redux';
import VariationsItem from './VariationsItem';
import utils from '../../utils';
import {actions} from '../../state';
import config from '../../config';

const VariationsList = (props) => {
  
  const dbDataTypes = {
    STATIC: 'STATIC', // *** unchanged
    DELETE_VARIATION: 'DELETE_VARIATION',
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
  
  const [cacheVariationsDbData, setCacheVariationsDbData] = useState({}); // *** to restore on db fail
  
  
  
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
    switch (variationsDbData.type) {
      case dbDataTypes.STATIC:
        // *** stub, do nothing
        break;
  
      case dbDataTypes.DELETE_VARIATION:
        
        console.log('/VariationsList/ -DELETE_VARIATION');
        setCacheVariationsDbData(variationsDbData); // *** cache
        dbDeleteVariationIntention();
        break;
  
      case dbDataTypes.SAVE:
        console.log('/VariationsList/ -SAVE');
        break;
    }
  }, [variationsDbData]);
  
  
  // *** on server response
  useEffect(() => {
    console.log('/VariationsList/ -PENDING', props.designUpdatePending.complete, cacheVariationsDbData);
    
    if (!props.designUpdatePending.data) return;
    
    if (props.designUpdatePending.data.type === dbDataTypes.DELETE_VARIATION) {
    
    }
    
    // console.log('/VariationsList/ -PENDING', props.designUpdatePending.data.type);
    
  },[props.designUpdatePending]);
  
  
  const dbDeleteVariationIntention = () => {
    
    const cloneDesign = Object.assign({}, props.selectedDesign);
    cloneDesign.variations = variationsDbData.data;
    
    console.log('/VariationsList/ -dbDeleteVariationIntention', cloneDesign);
    props.dispatch(actions.dbUpdateDesign({
      type: dbDataTypes.DELETE_VARIATION,
      data: cloneDesign,
    }));
  }
  
  /**
   * delete whole design TODO db
   */
  const deleteDesign = () => {
    console.log('/VariationsList/ -deleteDesign');
  }
  
  /**
   * save variation TODO db
   * @param identity
   */
  const onVariationSave = (identity) => {
    console.log('/VariationsList/ -onVariationSave', identity);
  }
  
  const onVariationDelete = (identity) => {
    if (identity.isNewItem) {
      let clone = [...persistNewVariations.current];
      let targetIndex = findItemIndex(persistNewVariations.current, identity);
      clone.splice(targetIndex, 1);
      setNewVariations(clone);
      return;
    }
    
    if (!identity.isNewItem) {
      const targetIndex = findItemIndex(persistLiveVariations.current, identity);
      // const cloneView = [...persistLiveVariations.current];
      const cloneData = [...persistVariationsDbData.current.data];
      
      /*cloneView.splice(targetIndex, 1);
      setLiveVariations(cloneView);*/
      
      cloneData.splice(targetIndex, 1);
      setVariationsDbData({type: dbDataTypes.DELETE_VARIATION, data: cloneData});
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
        code: '', tags: '', details: {width: '', repeats: '',
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
                <p>{liveVariations.length}</p>
                <button onClick={() => {
                  setNewVariations(prev => [...prev, createVariation(null)]);
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
  const {selectedDesign, designUpdatePending} = state;
  return {selectedDesign, designUpdatePending}
};

export default connect(mapStateToProps, null)(VariationsList);
