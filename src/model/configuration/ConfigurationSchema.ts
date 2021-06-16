import Vcs from '../constant/Vcs';

export default {
  VCS_TYPE: {
    name: 'VCS_TYPE',
    choices: [Vcs.GITHUB, Vcs.GITLAB],
    required: true,
    type: 'string',
  },
};
