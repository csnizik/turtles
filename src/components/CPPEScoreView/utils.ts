export type PracticeEntry = { id: number, title: String, shortDescription: String, Id2: number, practiceCategory: number };

export function getCheckedEntriesKey(entry: PracticeEntry) {
    return `${entry.Id2}-${entry.practiceCategory}`;
}