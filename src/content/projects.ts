/*
 * Copyright 2023 Simon Emms <simon@simonemms.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Project } from '$lib/types/project';
import { error } from '@sveltejs/kit';
import type { MdsvexImport } from './types';
import { parseReadContent } from './utils';

export function listPosts() {
	const posts = import.meta.glob<Project>('./projects/*.md', {
		eager: true,
		import: 'metadata',
	});

	return parseReadContent(posts);
}

export async function getPost(slug: string) {
	try {
		const data: MdsvexImport<Project> = await import(`./projects/${slug}.md`);

		return {
			post: { ...data.metadata, slug },
			Component: data.default,
		};
	} catch {
		throw error(404, `Unable to find post "${slug}"`);
	}
}

export async function getPostMetadata(slug: string) {
	const { post } = await getPost(slug);
	return post;
}
