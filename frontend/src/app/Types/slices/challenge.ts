import { Category, Dificulty } from "@/generated/graphql";

export interface ChallengeItem {
    id: string;
    name: string;
    description: string;
    category: Category;
    state: boolean;
    dificulty: Dificulty;
    points: number;
}
