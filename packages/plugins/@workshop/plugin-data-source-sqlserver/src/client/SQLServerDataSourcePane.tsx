/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { ISchema, createSchemaField } from '@formily/react';
import { FormItem } from '@formily/antd-v5';
import { Input, CollectionField } from '@nocobase/client';

const schema: ISchema = {
  type: 'object',
  properties: {
    key: {
      type: 'string',
      title: '数据源标识',
      'x-decorator': 'FormItem',
      'x-component': 'CollectionField',
      required: true,
    },
    displayName: {
      type: 'string',
      title: '数据源名称',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      required: true,
    },
    // {"dialect":"mssql","host":"192.168.167.175","port":1433,"database":"NOCOBASE","username":"zjf","password":"zhou","dialectOptions":{"options":{"trustServerCertificate":true}}}
    options: {
      type: 'object',
      'x-component': 'div',
      properties: {
        dialect: {
          title: '数据库类型',
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            disabled: true,
          },
          default: 'mssql',
        },
        host: {
          title: '主机地址',
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        port: {
          title: '端口号',
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        database: {
          title: '数据库',
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        username: {
          title: '用户名',
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        password: {
          title: '密码',
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        dialectOptions: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-display': 'hidden',
          default: '{"options":{"trustServerCertificate":true}}',
        },
      },
    },
  },
};

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    CollectionField,
  },
});

export const SQLServerDataSourcePane = () => {
  return <SchemaField schema={schema} />;
};
