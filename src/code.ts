import { CodedError, PluginMessage } from './model';

const STORAGE_KEY = '__LOREM_IPSUM_UNIVERSAL_CONFIGURATION_KEY';

figma.showUI(__html__);
// figma.clientStorage.getAsync(STORAGE_KEY).then(existConfig => {
//   figma.showUI(__html__, { width: 600, height: 800 });
//   figma.ui.postMessage({
//     type: 'sync-storage-config-value',
//     payload: existConfig != null ? JSON.parse(existConfig) : undefined,
//   });
// });

figma.ui.onmessage = (msg: PluginMessage) => {
  try {
    if (msg.type === 'create-text') {
      // figma.clientStorage.setAsync(STORAGE_KEY, JSON.stringify(msg.option));
    }
  } catch (e) {
    if (e instanceof CodedError) {
      return figma.notify(e.message);
    }

    console.log('e', e);
    figma.closePlugin('Unexpected Error');
  }
};
