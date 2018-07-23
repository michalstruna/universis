import { BAD_REQUEST, CONFLICT } from 'http-status-codes'

enum Errors {

    INVALID = BAD_REQUEST,
    DUPLICATE = CONFLICT

}

export default Errors