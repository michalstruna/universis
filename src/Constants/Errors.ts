import * as Codes from 'http-status-codes'

export default {

    INVALID: { name: 'INVALID', code: Codes.BAD_REQUEST },
    DUPLICATE: { name: 'DUPLICATE', code: Codes.BAD_REQUEST, mongo: 11000 },
    NOT_FOUND: { name: 'NOT_FOUND', code: Codes.NOT_FOUND }

}

// TODO: Error generator Errors.create(INVALID) returns new CustomError(...)