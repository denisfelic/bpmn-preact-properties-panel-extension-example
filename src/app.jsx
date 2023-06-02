import { useState, useEffect, useRef } from 'preact/hooks'
import Modeler from 'bpmn-js/lib/Modeler';
import { 
  BpmnPropertiesPanelModule, 
  BpmnPropertiesProviderModule
} from 'bpmn-js-properties-panel';

// import customModdleExtension from './moddle/custom.json';
// import PropertiesPanel from './properties-panel';

export function App() {
  const [count, setCount] = useState(0)
  const modelerContainer = useRef()

  function fetchDiagram(url) {
    return fetch(url).then((response) => response.text());
  }

  useEffect(() => {
    (async () => {
      const $modelerContainer = document.querySelector('#modeler-container');
      const diagramXML = await fetchDiagram("diagram.bpmn")

      const modeler = new Modeler({
        container: $modelerContainer,
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule
        ],

        // moddleExtensions: {
        //   custom: customModdleExtension
        // },
        keyboard: {
          bindTo: document.body
        }
      });
      modeler.importXML(diagramXML);

    })();
  }, [])


  return (
    <>
      <div style={{height: '100%'}}>
        <h1>Preact</h1>
        <div id='modeler-container'>
        </div>
          <div id="js-properties-panel"></div>
      </div>
    </>
  )
}

