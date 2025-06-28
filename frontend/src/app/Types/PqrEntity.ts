export interface PqrEntity{
    id:number;
    typePqr: 'Peticion' | 'Queja' | 'Reclamo';
    title:string;
    description:string;
    argument: string;
    answer: string;
    state: boolean;
    users?: UserEntity[];
}
//nesectio crear un UserEntity[] para los types
interface UserEntity{
    id:number;
    name:string;
    email:string;
    username:string;
}
interface PqrStats{
    total:number;
    peticiones:number;
    quejas:number;
    reclamos:number;
    pendientes:number;
    resultados:number;
}