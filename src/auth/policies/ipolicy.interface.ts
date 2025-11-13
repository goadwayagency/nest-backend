export interface IPolicy<T>{
    validate(input: T): Promise<void>;
}