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
import { tables } from './collections/tables';
import { MySQLDataSource } from './MySQLDataSource';

export class PluginDataSourceMysqlServer extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    this.app.dataSourceManager.registerDataSourceType(dataSourceType, MySQLDataSource);
    this.db.collection(tables);
  }

  async install() {}

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default PluginDataSourceMysqlServer;
