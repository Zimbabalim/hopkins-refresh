import React from 'react';
import cx from 'classnames';
import config from '../../config';

const DesignButton = (props) => {
  return (
      <div className={cx('design-button')}
           onClick={() => props.clickFn(props.data)}
      >
        <div className={cx('design-button__inner')}>
          {/*<img src={`${config.api.imagesPath}/A/${fabricCode}-${designCode}-${colourCode}_a.jpg?cb=${trigger}`} alt={`image A$`}/>*/}
          <h4 className={cx('design-button__label')}>{props.data.friendly_name}</h4>
        </div>
      </div>
  );
};

export default DesignButton;
