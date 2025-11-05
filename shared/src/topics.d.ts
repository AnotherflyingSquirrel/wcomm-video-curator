import type { Topic } from './types';
export declare const TOPIC_DEFINITIONS: Array<Pick<Topic, 'name' | 'description'> & {
    keywords: string[];
}>;
export type TopicWithKeywords = Topic & {
    keywords: string[];
};
export declare const TOPICS: TopicWithKeywords[];
export declare const TOPIC_SLUGS: string[];
