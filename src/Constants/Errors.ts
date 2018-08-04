import { BAD_REQUEST, CONFLICT, NOT_FOUND as _NOT_FOUND } from 'http-status-codes'

enum Errors {

    INVALID = BAD_REQUEST,
    DUPLICATE = CONFLICT,
    NOT_FOUND = _NOT_FOUND

}

export default Errors