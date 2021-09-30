import React, {useEffect, useState, useRef} from "react";
import {connect} from 'react-redux';
import VariationsItem from './VariationsItem';
import utils from '../../utils';

const VariationsList = (props) => {
  
  const [newVariations, setNewVariations] = useState([]);
  const [liveVariations, setLiveVariations] = useState([]);
  
  const persistNewVariations = useRef();
  persistNewVariations.current = newVariations; // *** required for latest state, onclick callbacks go stale!
  
  const persistLiveVariations = useRef();
  persistLiveVariations.current = liveVariations; // *** required for latest state
  
  
  useEffect(() => {
    
    setLiveVariations([]);
    
    if (!props.selectedDesign) return;
    
    props.selectedDesign.variations.map((item) => {
      setLiveVariations(prev => [...prev, createVariation(item)]);
    });
  }, [props.selectedDesign]);
  
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
      // TODO update DB!
      let clone = [...persistLiveVariations.current];
      let targetIndex = findItemIndex(persistLiveVariations.current, identity);
  
      clone.splice(targetIndex, 1);
      setLiveVariations(clone);
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
  const {selectedDesign} = state;
  return {selectedDesign}
};

export default connect(mapStateToProps, null)(VariationsList);
