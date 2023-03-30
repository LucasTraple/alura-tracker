import IProjeto from "./IProjeto";

export default interface ITask{
    time: number,
    description: string,
    data: string,
    projeto: IProjeto
}