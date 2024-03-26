/*
 * Copyright 2024 Simon Emms <simon@simonemms.com>
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

import type { Post } from '$lib/interface/post';
import { error } from '@sveltejs/kit';
import type { MdsvexImport } from './interfaces/post';

export async function getPost(slug: string) {
	try {
		const data: MdsvexImport<Post> = await import(
			`../content/posts/${slug}/post.md`
		);

		return {
			post: { ...data.metadata, slug },
			Component: data.default,
		};
	} catch {
		throw error(404, `Unable to find post "${slug}"`);
	}
}

export function listPosts() {
	const posts = import.meta.glob<Post>('../content/posts/*/post.md', {
		eager: true,
		import: 'metadata',
	});

	return parseReadContent(posts);
}

export function dateSort<T extends { date?: string }>(a: T, b: T): number {
	return Date.parse(b.date ?? '') - Date.parse(a.date ?? '');
}

export function mdPathToSlug(path: string) {
	return [...path.split('/')].slice(-2, -1).pop() ?? '';
}

export function parseReadContent<T extends { date?: string }>(
	data: Record<string, T>,
): T[] {
	return Object.entries(data)
		.map(([file, data]) => ({
			slug: mdPathToSlug(file),
			...data,
		}))
		.sort(dateSort);
}
