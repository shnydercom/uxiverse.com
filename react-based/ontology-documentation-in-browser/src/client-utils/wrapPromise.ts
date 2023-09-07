export function wrapPromise<T>(promise: Promise<T>) {
    let status = 'pending'
    let response: T | Error;

    const suspender = promise.then(
        (res) => {
            status = 'success'
            response = res
        },
        (err: Error) => {
            status = 'error'
            response = err
        },
    )
    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender
            case 'error':
                throw response
            default:
                return response
        }
    }
    return { read }
}