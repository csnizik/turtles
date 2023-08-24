export type PracticeEntry = { cppeScore: number, title: string, practiceCode: string, rationale: string, practiceId: number, practiceCategoryId: number };

export function getCheckedEntriesKey(entry: PracticeEntry) {
    return `${entry.practiceCode}`;
}