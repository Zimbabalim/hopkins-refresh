import React, {useEffect, useState, useRef} from "react";
import {connect} from 'react-redux';
import VariationsItem from './VariationsItem';

const VariationsList = (props) => {
  
  const [newVariations, setNewVariations] = useState([]);
  const persistNewVariations = useRef();
  persistNewVariations.current = newVariations; // *** required for proper state, onclick callbacks go stale!
  
  useEffect(() => {
    //console.log('/VariationsList/ -', props);
  }, []);
  
  const deleteDesign = () => {
    //console.log('/VariationsList/ -deleteDesign');
  }
  
  const createNewVariation = () => {
    setNewVariations(prev => [...prev, createEmptyVariation()]);
  }
  
  const onVariationSave = (identity) => {
    console.log('/VariationsList/ -onVariationSave', identity);
  }
  
  const onVariationDelete = (identity) => {
    console.log('/VariationsList/ -onVariationDelete ****', identity, persistNewVariations.current);
    
    let target = null;
    
    if (identity.isNewItem) {

      let targetIndex;
      let clone = [...persistNewVariations.current];
      
      persistNewVariations.current.find((item, index) => {
        if (identity.index === item.props.newItemIndex) {
          targetIndex = index;
          return true;
        }
      });
  
      clone.splice(targetIndex, 1);
      setNewVariations(clone);
      
      console.log('/VariationsList/ -onVariationDelete >>>>', targetIndex);
    }
  }
  
  
  // TODO refactor dual VariationsItem invocations into one
  const createEmptyVariation = () => {
    // TODO add class for unsaved state
    return (
        <VariationsItem
            key={`newVariationsItem--${newVariations.length}`}
            data={{
              code: '',
              tags: '',
              details: {
                width: '',
                repeats: ''
              }
            }}
            index={null}
            newItemIndex={newVariations.length}
            onSaveFn={onVariationSave}
            onDeleteFn={onVariationDelete}
        />
    )
  }
  
  return (
      <>
        <div className='variations-list__action-bar' >
          {props.selectedDesign && (
              <>
                <h3>{props.selectedDesign.friendly_name}</h3>
                <button onClick={() => createNewVariation()}>ADD VARIATION</button>
                <button onClick={() => deleteDesign()}>DELETE DESIGN</button>
              </>
          )}
        </div>
        
        {newVariations}
        
        {props.selectedDesign &&
        props.selectedDesign.variations.map((item, index) => {
          return <VariationsItem
              key={`VariationsItem--${index}`}
              data={item}
              index={index}
              newItemIndex={null}
              onSaveFn={onVariationSave}
              onDeleteFn={onVariationDelete}
          />
        })}
      
      </>
  );
};

const mapStateToProps = (state) => {
  const {selectedDesign} = state;
  //console.log('/VariationsList/ -mapStateToProps', selectedDesign);
  return {selectedDesign}
};

export default connect(mapStateToProps, null)(VariationsList);
