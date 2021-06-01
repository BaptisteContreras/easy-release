import GithubIssue from './model/github/GithubIssue';
import GithubOwner from './model/github/GithubOwner';

const world = 'worldjkskldsklskl';

export default function hello(word: string = world): string {
  const a = word;
  return `Hello ${world}! ${a} `;
}
const test = new GithubIssue('', '', [], new GithubOwner('', ''));
console.log(hello(world));
