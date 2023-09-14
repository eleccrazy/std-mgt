import React from 'react';
import { useRouterContext, TitleProps } from '@refinedev/core';
import Button from '@mui/material/Button';

import { logo, alx } from 'assets';

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant='text' disableRipple sx={{ marginTop: '10px' }}>
      <Link to='/'>
        {collapsed ? (
          <img src={alx} alt='ALX' width='28px' />
        ) : (
          <img src={logo} alt='ALX Logo' width='140px' />
        )}
      </Link>
    </Button>
  );
};
