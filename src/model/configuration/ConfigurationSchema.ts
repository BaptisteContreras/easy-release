import Vcs from '../enum/Vcs';
import MergeStrategy from '../enum/MergeStrategy';

const schemaDeclaration = {
  VCS_TYPE: {
    name: 'VCS_TYPE',
    choices: [Vcs.GITHUB, Vcs.GITLAB],
    required: true,
    type: 'string',
  } as ConfigurationSchema,
  API_TOKEN: {
    name: 'API_TOKEN',
    required: true,
    type: 'string',
  } as ConfigurationSchema,
  ORGANISATION_NAME: {
    name: 'ORGANISATION_NAME',
    required: true,
    type: 'string',
  } as ConfigurationSchema,
  REPOSITORY_NAME: {
    name: 'REPOSITORY_NAME',
    required: true,
    type: 'string',
  } as ConfigurationSchema,
  LABELS_DELIVER_NAME: {
    name: 'LABELS_DELIVER_NAME',
    required: true,
    type: 'array',
  } as ConfigurationSchema,
  RELEASE_BRANCH_NAME: {
    name: 'RELEASE_BRANCH_NAME',
    required: false,
    type: 'string',
  } as ConfigurationSchema,
  BASE_RELEASE_BRANCH: {
    name: 'BASE_RELEASE_BRANCH',
    required: true,
    type: 'string',
  } as ConfigurationSchema,
  MERGE_STRATEGY: {
    name: 'MERGE_STRATEGY',
    required: true,
    type: 'string',
    choices: [MergeStrategy.CHERRY_PICK, MergeStrategy.BRANCH_MERGE],
  } as ConfigurationSchema,
};

export interface ConfigurationSchema {
  name : string,
  choices : string[],
  required : boolean,
  type : string
}

export interface RawConfiguration {
  VCS_TYPE : string,
  API_TOKEN : string,
  ORGANISATION_NAME : string,
  REPOSITORY_NAME : string,
  LABELS_DELIVER_NAME : string[],
  RELEASE_BRANCH_NAME : string,
  BASE_RELEASE_BRANCH : string,
  MERGE_STRATEGY : string,
}

export default schemaDeclaration;
