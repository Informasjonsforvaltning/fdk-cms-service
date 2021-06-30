import React, { useState, useEffect } from 'react';
import { Checkbox } from '@buffetjs/core';
import { useIntl } from 'react-intl';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { BaselineAlignment } from 'strapi-helper-plugin';

import Button from '../../../../components/FullWidthButton';
import Box from '../Box';
import Input from '../Input';
import Section from '../Section';

const Login = ({
  children,
  formErrors,
  modifiedData,
  onChange,
  onSubmit,
  requestError
}) => {
  const { formatMessage } = useIntl();
  const commonAuth = () => {
    const defaultCredentails = {
      email: 'so@bjerk.io',
      password: 'FdkStrapi123!'
    };
    onChange({ target: { name: 'email', value: defaultCredentails.email } });
    onChange({
      target: { name: 'password', value: defaultCredentails.password }
    });
    setTimeout(() => onSubmit({ preventDefault: () => {} }), 1000);
  };

  return (
    <>
      <Section textAlign="center">
        <img
          style={{ maxHeight: '40px' }}
          src="https://www.digdir.no/profiles/sogn/themes/sogn_theme/logo_sogn.svg"
        />
      </Section>
      <Section withBackground>
        <BaselineAlignment top size="25px">
          <Box errorMessage={get(requestError, 'errorMessage', null)}>
            <Button
              onClick={() => commonAuth()}
              color="primary"
              textTransform="uppercase"
            >
              Logg på med felles Digdir-bruker
            </Button>
          </Box>
        </BaselineAlignment>
      </Section>
      <Section withBackground>
        <BaselineAlignment top size="25px">
          <Box errorMessage={get(requestError, 'errorMessage', null)}>
            <form onSubmit={onSubmit}>
              <Input
                autoFocus
                error={formErrors.email}
                label="Auth.form.email.label"
                name="email"
                onChange={onChange}
                placeholder="Auth.form.email.placeholder"
                type="email"
                validations={{ required: true }}
                value={modifiedData.email}
              />
              <Input
                error={formErrors.password}
                label="Auth.form.password.label"
                name="password"
                onChange={onChange}
                type="password"
                validations={{ required: true }}
                value={modifiedData.password}
              />
              <Checkbox
                type="checkbox"
                message={formatMessage({ id: 'Auth.form.rememberMe.label' })}
                name="rememberMe"
                onChange={onChange}
                value={modifiedData.rememberMe}
              />
              <BaselineAlignment top size="27px">
                <Button type="submit" color="primary" textTransform="uppercase">
                  {formatMessage({ id: 'Auth.form.button.login' })}
                </Button>
              </BaselineAlignment>
            </form>
            {children}
          </Box>
        </BaselineAlignment>
      </Section>
      {/* <AuthLink label="Auth.link.forgot-password" to="/auth/forgot-password" /> */}
    </>
  );
};

Login.defaultProps = {
  children: null,
  onSubmit: e => e.preventDefault(),
  requestError: null
};

Login.propTypes = {
  children: PropTypes.node,
  formErrors: PropTypes.object.isRequired,
  modifiedData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  requestError: PropTypes.object
};

export default Login;
