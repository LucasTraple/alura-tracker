import IProjeto from "./IProjeto";

export default interface ITarefa{
    id: string;
    time: number,
    description: string,
    data: string,
    projeto: IProjeto
}