import { assign } from 'lodash-es';

import BpmnModdle from './bpmn-moddle';

import BioColorModel from '../resources/bpmn-io/json/bioc.json';
import BpmnModel from '../resources/bpmn/json/bpmn.json';
import BpmnDiModel from '../resources/bpmn/json/bpmndi.json';
import DiModel from '../resources/bpmn/json/di.json';
import DcModel from '../resources/bpmn/json/dc.json';

const packages = {
  bpmn: BpmnModel,
  bpmndi: BpmnDiModel,
  dc: DcModel,
  di: DiModel,
  bioc: BioColorModel
};

export default function createModdle(additionalPackages, options) {
  return new BpmnModdle(assign({}, packages, additionalPackages), options);
}