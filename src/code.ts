import { CodedError, PluginMessage, FontName } from './model';

// const STORAGE_KEY = '__LOREM_IPSUM_UNIVERSAL_CONFIGURATION_KEY';

figma.showUI(__html__, { width: 300, height: 300 });
// figma.clientStorage.getAsync(STORAGE_KEY).then(existConfig => {
//   figma.showUI(__html__, { width: 600, height: 800 });
//   figma.ui.postMessage({
//     type: 'sync-storage-config-value',
//     payload: existConfig != null ? JSON.parse(existConfig) : undefined,
//   });
// });

const defaultFontName: FontName = {
  family: 'Inter',
  style: 'Regular',
};
async function loadFonts(params: FontName = defaultFontName) {
  // TODO: font
  await figma.loadFontAsync(params);

  console.log('Awaiting the fonts.');
}

figma.ui.onmessage = (msg: PluginMessage) => {
  try {
    if (msg.type === 'create-text') {
      loadFonts().then(() => {
        const textNode = figma.createText();
        textNode.characters = msg.options.content;
        textNode.resize(375, textNode.height);
        figma.currentPage.appendChild(textNode);

        figma.currentPage.selection = [textNode];
        figma.viewport.scrollAndZoomIntoView([textNode]);
      });
    }

    if (msg.type === 'replace-text') {
      if (figma.currentPage.selection.length === 0) {
        figma.closePlugin('Please select more than one text node.');
        return;
      }

      figma.currentPage.selection
        .filter((selection): selection is TextNode => selection.type === 'TEXT')
        .forEach(selection => {
          if (!isSingleFontName(selection.fontName)) {
            figma.notify('Multiple font styles are not supported.');
            return;
          }

          const prevWidth = selection.width;
          loadFonts(selection.fontName).then(() => {
            selection.characters = msg.options.content;
            selection.resize(prevWidth, selection.height);
          });
        });
    }
  } catch (e) {
    if (e instanceof CodedError) {
      return figma.notify(e.message);
    }

    console.log('e', e);
    figma.closePlugin('Unexpected Error');
  }
};

function isSingleFontName(
  fontName: FontName | PluginAPI['mixed']
): fontName is FontName {
  return (fontName as FontName).family != null;
}
