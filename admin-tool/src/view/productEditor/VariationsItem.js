import React, {useEffect} from "react";

const VariationsItem = (props) => {
  
  useEffect(() => {
    // console.log('/VariationsItem/ -', props);
  }, [])
  
  const onSave = () => {
    // TODO validations
    props.onSaveFn(identify());
  }
  
  const onDelete = () => {
    props.onDeleteFn(identify());
  }
  
  const identify = () => {
    let index = props.index;
    let isNewItem = false;
  
    if (!props.index && props.index !== 0) {
      index = props.newItemIndex;
      isNewItem = true;
    }
    
    return {
      index,
      isNewItem,
    }
  }
  
  return (
      <div className='variations-item'>
        <p>{props.newItemIndex}</p>
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
  );
};

export default VariationsItem;
