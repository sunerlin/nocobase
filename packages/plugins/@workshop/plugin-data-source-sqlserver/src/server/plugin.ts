/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/server';
import { dataSourceType } from '../constants';
import { SQLServerDataSource } from './SQLServerDataSource';

export class PluginDataSourceSqlserverServer extends Plugin {
  async afterAdd() {
    console.log('=== afterAdd ===');
  }

  async beforeLoad() {
    console.log('=== beforeLoad ===');
  }

  async load() {
    console.log('=== load ===');
    // 这是一段示例，表示将 hello 表的所有操作对外公开
    this.app.acl.allow('hello', '*', 'public');
    this.app.dataSourceManager.registerDataSourceType(dataSourceType, SQLServerDataSource);
  }

  async install() {
    console.log('=== install ===');
  }

  async afterEnable() {
    console.log('=== afterEnable ===');
  }

  async afterDisable() {
    console.log('=== afterDisable ===');
  }

  async remove() {
    console.log('=== remove ===');
  }
}

export default PluginDataSourceSqlserverServer;
