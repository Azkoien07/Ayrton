import { TypePqr } from '@/generated/graphql'

export interface PqrItem {
    id: string;
    typePqr: TypePqr;
    title: string;
    description: string;
    argument: string;
    answer: string;
    state: boolean;
}