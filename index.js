/* jshint node: true */
'use strict';

const BasePlugin = require('ember-cli-deploy-plugin');
const child_process = require('child_process');
const fs = require('fs');

module.exports = {
  name: 'ember-cli-deploy-docker',
  createDeployPlugin(options) {
    const DeployPlugin = BasePlugin.extend({
      name: options.name,

      defaultConfig: {
        dockerFilePath: 'Dockerfile'
      },
      requiredConfig: ['repository'],

      _logError(error){
        this.log(`Error: ${error}`, { color: 'red' });
      },

      upload(context) {
        const name_with_sha_tag = this.readConfig('repository') + ':' + context.revisionData.revisionKey;
        const name_with_latest_tag = this.readConfig('repository') + ':latest';

        // Building container
        this.log('starting docker build');
        let result = child_process.spawnSync('docker', ['build','-f', this.readConfig('dockerFilePath'), '-t', name_with_sha_tag, '-t', name_with_latest_tag, '.']);
        if(result.status != 0){
          this._logError(result.stderr);
          return
        }

        // Pushing to repository
        this.log('pushing image');
        result = child_process.spawnSync('docker', ['push', name_with_sha_tag]);
        if(result.status != 0){
          this._logError(result.stderr);
          return;
        }
        result = child_process.spawnSync('docker', ['push', name_with_latest_tag]);
        if(result.status != 0){
          this._logError(result.stderr);
          return;
        }
      }
    });
    return new DeployPlugin();
  }
};
