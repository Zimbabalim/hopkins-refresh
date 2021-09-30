import React, {useEffect} from "react";

const VariationsItem = (props) => {
  
  useEffect(() => {
    // console.log('/VariationsItem/ -', props);
  }, [])
  
  const onSave = () => {
    // TODO validations
    props.onSaveFn({
      uid: props.uid,
      isNewItem: props.isNewItem,
    });
  }
  
  const onDelete = () => {
    props.onDeleteFn({
      uid: props.uid,
      isNewItem: props.isNewItem,
    });
  }
  
  
  return (
      <div className='variations-item'>
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
  );
};

export default VariationsItem;
