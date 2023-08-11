export type PracticeEntry = { id: number, title: String, shortDescription: String, Id2: string, practiceCategory: number, rationale: string };

export function getCheckedEntriesKey(entry: PracticeEntry) {
    return `${entry.Id2}-${entry.practiceCategory}`;
}