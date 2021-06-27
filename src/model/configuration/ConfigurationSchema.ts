import Vcs from '../constant/Vcs';

const schemaDeclaration = {
  VCS_TYPE: {
    name: 'VCS_TYPE',
    choices: [Vcs.GITHUB, Vcs.GITLAB],
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
  VCS_TYPE : string
}

export default schemaDeclaration;
