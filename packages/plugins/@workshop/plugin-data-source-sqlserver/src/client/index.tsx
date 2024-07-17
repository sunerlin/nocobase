/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin, DataSource } from '@nocobase/client';
import PluginDataSourceManagerClient from '@nocobase/plugin-data-source-manager/client';
import { dataSourceType } from '../constants';
import { SQLServerDataSourcePane } from './SQLServerDataSourcePane';

export class PluginDataSourceSqlserverClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    console.log(this.app);
    this.app.addComponents({
      SQLServerDataSourcePane,
    });
    // this.app.addScopes({})
    // this.app.addProvider()
    // this.app.addProviders()
    // this.app.router.add()

    const dsmClient = this.app.pm.get(PluginDataSourceManagerClient);
    dsmClient.registerType(dataSourceType, {
      label: 'SQL Server',
      DataSourceSettingsForm: 'SQLServerDataSourcePane',
    });
  }
}

export default PluginDataSourceSqlserverClient;
