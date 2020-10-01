export const RelationType = {
    One: '1',
    Any: '*'
} as const;

export type RelationType = typeof RelationType[keyof typeof RelationType];