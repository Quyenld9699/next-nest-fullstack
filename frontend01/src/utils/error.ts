import { AuthError } from 'next-auth';
import { ReturnStatusCode } from 'src/constants';

export class CustomAuthError extends AuthError {
    code: number;
    constructor(code: number, message?: any) {
        super(message);
        this.message = message;
        this.code = code;
    }
}

export class InvalidEmailPasswordError extends CustomAuthError {
    constructor() {
        super(ReturnStatusCode.UNAUTHORIZED, 'Invalid email or password!');
    }
}

export class InActiveAcounntError extends CustomAuthError {
    constructor() {
        super(ReturnStatusCode.NOT_ACTIVATE_ACCOUNT, 'Your account is not active!');
    }
}
