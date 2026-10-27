export const SECURITY_CONFIG = {
    SALT_ROUNDS: 10,
    TOKEN_EXPIRES_IN: "24h",
    DEFAULT_SECRET: "token_de_autenticacion"
};

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const BOOK_CONSTRAINTS = {
    MIN_YEAR: 0,
    MAX_YEAR: new Date().getFullYear()
};
