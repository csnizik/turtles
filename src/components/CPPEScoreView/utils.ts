export type PracticeEntry = { cppeScore: number, title: string, practiceCode: string, rationale: string, practiceId: number, practiceCategoryId: number, practiceInfo: string };

export function getCheckedEntriesKey(entry: PracticeEntry) {
    return `${entry.practiceCode}`;
}