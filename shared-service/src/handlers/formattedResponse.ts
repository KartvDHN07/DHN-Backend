export const formatResponseHandler = (msg, data, sts) => {
    return {
        status : sts,
        data,
        message : msg
    }
}