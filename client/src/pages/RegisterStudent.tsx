import React from 'react';
import { useState } from 'react';
import { useGetIdentity } from '@refinedev/core';
import { useNavigation } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';

import Form from 'components/common/Form';

const RegisterStudent = () => {
  const navigation = useNavigation();
  const { data: user } = useGetIdentity();
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  const onFinishHandler = () => {};
  return (
    <Form
      type='Register'
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      onFinishHandler={onFinishHandler}
    ></Form>
  );
};

export default RegisterStudent;
