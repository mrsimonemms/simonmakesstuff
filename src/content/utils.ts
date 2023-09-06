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

export function dateSort<T extends { date?: string }>(a: T, b: T): number {
	return Date.parse(b.date ?? '') - Date.parse(a.date ?? '');
}

export function mdPathToSlug(path: string) {
	return [...path.split('/')].pop()?.replace(/\.[^/.]+$/, '') ?? '';
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
