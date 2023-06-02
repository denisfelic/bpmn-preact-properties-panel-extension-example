import { useState, useEffect, useRef } from 'preact/hooks'
import Modeler from 'bpmn-js/lib/Modeler';
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import download from 'downloadjs'

import magicPropertiesProviderModule from './propertiesProviders/MagicPropertiesProvider';
import magicModdleDescriptor from './propertiesProviders/MagicPropertiesProvider/descriptor.json'

// import customModdleExtension from './moddle/custom.json';
// import PropertiesPanel from './properties-panel';

export function App() {
  const [count, setCount] = useState(0)
  let modeler;

  function fetchDiagram(url) {
    return fetch(url).then((response) => response.text());
  }

  useEffect(() => {
    (async () => {
      const $modelerContainer = document.querySelector('#modeler-container');
      const diagramXML = await fetchDiagram("diagram (5).bpmn")

      modeler = new Modeler({
        container: $modelerContainer,
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule,
          magicPropertiesProviderModule
        ],
        moddleExtensions: {
          magic: magicModdleDescriptor
        },
        keyboard: {
          bindTo: document.body
        }
      });
      modeler.importXML(diagramXML);

    })();
  }, [])

  const handleSaveAsNewVersion = () => {
    try {
      modeler?.saveXML({ format: true }, (err, xml) => {
        if (!err) {
          download(xml, 'diagram.bpmn', 'application/xml')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }




  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

        <h1>Preact</h1>
        <button style={{ height: '50px', width: '100px' }} onClick={handleSaveAsNewVersion}>Save</button>
      </div>
      <div style={{ height: '100%', position: 'relative' }}>
        <div id='modeler-container'>
        </div>
        <div id="js-properties-panel"></div>
      </div>
    </div>
  )
}

