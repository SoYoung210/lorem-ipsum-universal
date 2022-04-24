import { CodedError, PluginMessage } from './model';

// const STORAGE_KEY = '__LOREM_IPSUM_UNIVERSAL_CONFIGURATION_KEY';

figma.showUI(__html__, { width: 300, height: 300 });
// figma.clientStorage.getAsync(STORAGE_KEY).then(existConfig => {
//   figma.showUI(__html__, { width: 600, height: 800 });
//   figma.ui.postMessage({
//     type: 'sync-storage-config-value',
//     payload: existConfig != null ? JSON.parse(existConfig) : undefined,
//   });
// });

async function loadFonts() {
  // TODO: font
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  console.log('Awaiting the fonts.');
}

figma.ui.onmessage = (msg: PluginMessage) => {
  try {
    loadFonts().then(() => {
      if (msg.type === 'create-text') {
        const textNode = figma.createText();
        textNode.characters = msg.options.content;
        textNode.resize(375, textNode.height);
        figma.currentPage.appendChild(textNode);

        figma.currentPage.selection = [textNode];
        figma.viewport.scrollAndZoomIntoView([textNode]);
        // figma.clientStorage.setAsync(STORAGE_KEY, JSON.stringify(msg.option));
      }
    });
  } catch (e) {
    if (e instanceof CodedError) {
      return figma.notify(e.message);
    }

    console.log('e', e);
    figma.closePlugin('Unexpected Error');
  }
};
