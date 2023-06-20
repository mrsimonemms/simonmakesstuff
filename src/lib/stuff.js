import fs from 'fs';
import { sync as glob } from 'glob';
import frontMatter from 'front-matter';

/**
 * @typedef {{post: string, route: string, body: string, attributes: any}} Post
 */

/**
 * @returns {string[]}
 */
export function getEntries() {
  return listPosts().map(({ route }) => route);
}

/**
 * @param {Post} post
 * @returns {{next: Post | null, previous: Post | null}}
 */
export function getNextAndPrev(post) {
  const allPosts = listPosts();

  const postIndex = allPosts.findIndex(({ route }) => route === post.route);
  const next = allPosts[postIndex + 1] ?? null;
  const previous = allPosts[postIndex - 1] ?? null;

  return {
    next,
    previous,
  };
}

/**
 * @returns {Post[]}
 */
export function listPosts() {
  return glob('./src/stuff/**/*.md')
    .map((post) => parsePost(post))
    .filter((post) => post !== null);
}

/**
 * @param  {string} post
 * @returns {Post | null}
 */
export function parsePost(post) {
  const regex = /(_)?(.*).md/;

  if (regex.test(post)) {
    const matches = post.match(regex);
    if (matches !== null) {
      const [, hidden, title] = matches;

      const route = ['', 'stuff', title].join('/');

      const data = fs.readFileSync(post, 'utf8');
      const payload = frontMatter(data);

      const { attributes, body } = payload;
      attributes.hidden = !!hidden;
      attributes.keys = {
        title,
      };
      if (!attributes.date) {
        attributes.date = new Date(
          attributes.keys.year,
          attributes.keys.month - 1,
          attributes.keys.day,
        );
      }

      /** @type {string[]} */
      const tags = [];
      if (attributes.tags) {
        tags.push(...attributes.tags.split(','));
      }
      attributes.tags = tags.map((tag) => tag.trim()).sort();

      return {
        post,
        route,
        body,
        attributes,
      };
    }
  }
  return null;
}
