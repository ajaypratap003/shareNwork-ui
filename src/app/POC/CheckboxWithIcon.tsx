import React, { useRef } from 'react';
import Checkbox from '@data-driven-forms/pf4-component-mapper/checkbox';

const CheckboxWithIcon: React.FC<any> = ({ Icon, ...props }) => {
  const ref = useRef();

  return (
    <div className="ins-c-sources__checkbox-with-icon">
      <Checkbox {...props} type="checkbox" />
      <span ref={ref}>
        <Icon appendTo={ref.current} />
      </span>
    </div>
  );
};

export default CheckboxWithIcon;
