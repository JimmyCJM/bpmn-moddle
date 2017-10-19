import {
  isString,
  isFunction
} from 'min-dash/lib/lang';

import { assign } from 'min-dash/lib/object';

import Moddle from 'moddle';

import {
  Reader as XmlReader,
  Writer as XmlWriter
} from 'moddle-xml';

/**
 * A sub class of {@link Moddle} with support for
 * import and export of BPMN 2.0 xml files.
 *
 * @class BpmnModdle
 * @extends Moddle
 *
 * @param {Object|Array} packages to use for instantiating the model
 * @param {Object} [options] additional options to pass over
 */
export default class BpmnModdle extends Moddle {

  constructor(packages, options) {
    super(packages, options);
  }


  /**
   * Instantiates a BPMN model tree from a given xml string.
   *
   * @param {String}   xmlStr
   * @param {String}   [typeName='bpmn:Definitions'] name of the root element
   * @param {Object}   [options]  options to pass to the underlying reader
   * @param {Function} done       callback that is invoked with (err, result, parseContext)
   *                              once the import completes
   */
  fromXML(xmlStr, typeName, options, done) {
    if (!isString(typeName)) {
      done = options;
      options = typeName;
      typeName = 'bpmn:Definitions';
    }

    if (isFunction(options)) {
      done = options;
      options = {};
    }

    var reader = new XmlReader(assign({ model: this, lax: true }, options));
    var rootHandler = reader.handler(typeName);

    reader.fromXML(xmlStr, rootHandler, done);
  }


  /**
   * Serializes a BPMN 2.0 object tree to XML.
   *
   * @param {String}   element    the root element, typically an instance of `bpmn:Definitions`
   * @param {Object}   [options]  to pass to the underlying writer
   * @param {Function} done       callback invoked with (err, xmlStr) once the import completes
   */
  toXML(element, options, done) {

    if (isFunction(options)) {
      done = options;
      options = {};
    }

    var writer = new XmlWriter(options);
    try {
      var result = writer.toXML(element);
      done(null, result);
    } catch (e) {
      done(e);
    }
  }

}
