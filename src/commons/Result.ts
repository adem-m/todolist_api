export class Result<T> {
    public isSuccess: boolean;
    public error?: string;
    private value?: T;

    private constructor(isSuccess: boolean, error?: string, value?: T){
        if((isSuccess && error !== undefined) || !isSuccess && error === undefined) {

            throw new Error("Cannot succeed and fail at the same time");
        }

        this.isSuccess = isSuccess;
        this.error = error;
        this.value = <T>value;

        Object.freeze(this);
    }

    public getValue(): T {
        if(!this.isSuccess){
            throw new Error("No value to retrieve if failed");
        }
        if(this.value === undefined){
            throw new Error("No value to retrieve");
        }
        return this.value;
    }

    public static ok<V>(value: V): Result<V> {
        return new Result<V>(true, undefined, value);
    }

    public static ko<V>(error: string): Result<V> {
        return new Result<V>(false, error);
    }
}
