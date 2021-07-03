import Vcs from '../constant/Vcs';

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
}

export default schemaDeclaration;
