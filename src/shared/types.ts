import { COLORS } from './constant';
import { string } from 'prop-types';

/**
 * Only use for snapshot test
 */
export interface ColorProp {
  _color?: typeof COLORS[number];
}

// const FakeFeeds = {
//   "total_count": 25,
//   "incomplete_results": false,
//   "items": [
//     {
//       "url": "https://api.github.com/repos/microsoft/TypeScript/issues/32726",
//       "repository_url": "https://api.github.com/repos/microsoft/TypeScript",
//       "labels_url": "https://api.github.com/repos/microsoft/TypeScript/issues/32726/labels{/name}",
//       "comments_url": "https://api.github.com/repos/microsoft/TypeScript/issues/32726/comments",
//       "events_url": "https://api.github.com/repos/microsoft/TypeScript/issues/32726/events",
//       "html_url": "https://github.com/microsoft/TypeScript/pull/32726",
//       "id": 477114016,
//       "node_id": "MDExOlB1bGxSZXF1ZXN0MzA0NTA1NjQw",
//       "number": 32726,
//       "title": "Fix completion disappear after a property declaration with a private modifier",
//       "user": {
//         "login": "fuafa",
//         "id": 20750310,
//         "node_id": "MDQ6VXNlcjIwNzUwMzEw",
//         "avatar_url": "https://avatars1.githubusercontent.com/u/20750310?v=4",
//         "gravatar_id": "",
//         "url": "https://api.github.com/users/fuafa",
//         "html_url": "https://github.com/fuafa",
//         "followers_url": "https://api.github.com/users/fuafa/followers",
//         "following_url": "https://api.github.com/users/fuafa/following{/other_user}",
//         "gists_url": "https://api.github.com/users/fuafa/gists{/gist_id}",
//         "starred_url": "https://api.github.com/users/fuafa/starred{/owner}{/repo}",
//         "subscriptions_url": "https://api.github.com/users/fuafa/subscriptions",
//         "organizations_url": "https://api.github.com/users/fuafa/orgs",
//         "repos_url": "https://api.github.com/users/fuafa/repos",
//         "events_url": "https://api.github.com/users/fuafa/events{/privacy}",
//         "received_events_url": "https://api.github.com/users/fuafa/received_events",
//         "type": "User",
//         "site_admin": false
//       },
//       "labels": [
//         {
//           name: '',
//           color: '',
//           default: true
//         }
//       ],
//       "state": "closed",
//       "locked": false,
//       assignee: {
//         avatar_url: "https://avatars2.githubusercontent.com/u/8052792?v=4",
//         events_url: "https://api.github.com/users/sheetalkamat/events{/privacy}",
//         followers_url: "https://api.github.com/users/sheetalkamat/followers",
//         following_url: "https://api.github.com/users/sheetalkamat/following{/other_user}",
//         gists_url: "https://api.github.com/users/sheetalkamat/gists{/gist_id}",
//         gravatar_id: "",
//         html_url: "https://github.com/sheetalkamat",
//         id: 8052792,
//         login: "sheetalkamat",
//         node_id: "MDQ6VXNlcjgwNTI3OTI=",
//         organizations_url: "https://api.github.com/users/sheetalkamat/orgs",
//         received_events_url: "https://api.github.com/users/sheetalkamat/received_events",
//         repos_url: "https://api.github.com/users/sheetalkamat/repos",
//         site_admin: false,
//         starred_url: "https://api.github.com/users/sheetalkamat/starred{/owner}{/repo}",
//         subscriptions_url: "https://api.github.com/users/sheetalkamat/subscriptions",
//         type: "User",
//         url: "https://api.github.com/users/sheetalkamat",
//       },
//       "assignees": [

//       ],
//       "milestone": null,
//       "comments": 1,
//       "created_at": "2019-08-06T00:38:29Z",
//       "updated_at": "2019-08-16T11:25:18Z",
//       "closed_at": "2019-08-13T18:09:33Z",
//       "author_association": "CONTRIBUTOR",
//       "pull_request": {
//         "url": "https://api.github.com/repos/microsoft/TypeScript/pulls/32726",
//         "html_url": "https://github.com/microsoft/TypeScript/pull/32726",
//         "diff_url": "https://github.com/microsoft/TypeScript/pull/32726.diff",
//         "patch_url": "https://github.com/microsoft/TypeScript/pull/32726.patch"
//       },
//       "body": "Fix class member completion disappear after a property declaration with a private modifier.\r\n\r\n<!--\r\nThank you for submitting a pull request!\r\n\r\nPlease verify that:\r\n* [Y] There is an associated issue in the `Backlog` milestone (**required**)\r\n* [Y] Code is up-to-date with the `master` branch\r\n* [Y] You've successfully run `gulp runtests` locally\r\n* [Y] There are new or updated unit tests validating the change\r\n\r\nRefer to CONTRIBUTING.MD for more details.\r\n  https://github.com/Microsoft/TypeScript/blob/master/CONTRIBUTING.md\r\n-->\r\n\r\nFixes #30290\r\n",
//       "score": 1.0
//     },
//   ]
// };

// export type IssuesAndPRsMata = typeof FakeFeeds;
// export type IssueOrPRProps = IssuesAndPRsMata['items'][number];

const assignee = {
  avatar_url: "https://avatars2.githubusercontent.com/u/8052792?v=4",
  events_url: "https://api.github.com/users/sheetalkamat/events{/privacy}",
  followers_url: "https://api.github.com/users/sheetalkamat/followers",
  following_url: "https://api.github.com/users/sheetalkamat/following{/other_user}",
  gists_url: "https://api.github.com/users/sheetalkamat/gists{/gist_id}",
  gravatar_id: "",
  html_url: "https://github.com/sheetalkamat",
  id: 8052792,
  login: "sheetalkamat",
  node_id: "MDQ6VXNlcjgwNTI3OTI=",
  organizations_url: "https://api.github.com/users/sheetalkamat/orgs",
  received_events_url: "https://api.github.com/users/sheetalkamat/received_events",
  repos_url: "https://api.github.com/users/sheetalkamat/repos",
  site_admin: false,
  starred_url: "https://api.github.com/users/sheetalkamat/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/sheetalkamat/subscriptions",
  type: "User",
  url: "https://api.github.com/users/sheetalkamat",
};

export type Assignee = typeof assignee;