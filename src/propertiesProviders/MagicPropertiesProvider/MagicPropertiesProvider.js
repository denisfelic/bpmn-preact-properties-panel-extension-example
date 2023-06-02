// Import your custom property entries.
// The entry is a text input field with logic attached to create,
// update and delete the "spell" property.
import SpellProps from './parts/SpellProps';
import { is } from 'bpmn-js/lib/util/ModelUtil';

const LOW_PRIORITY = 99999999999999;


export default function MagicPropertiesProvider(propertiesPanel, translate) {



    this.getGroups = function (element) {


        return function (groups) {

            // Add the "magic" group
            if (is(element, 'bpmn:StartEvent')) {
                groups.push(createMagicGroup(element, translate));
            }

            return groups;
        }
    };

    // Register our custom magic properties provider.
    // Use a lower priority to ensure it is loaded after the basic BPMN properties.
    propertiesPanel.registerProvider(LOW_PRIORITY, this);

}



// Create the custom magic group
function createMagicGroup(element, translate) {

    // create a group called "Magic properties".
    const magicGroup = {
        id: 'magic',
        label: translate('Magic properties'),
        entries: SpellProps(element)
    };

    return magicGroup
}