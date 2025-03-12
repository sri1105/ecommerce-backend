export default Object.freeze({
    COLLECTIONS: {
      USERS: 'users',
      PRODUCTS: 'products'
    },
    DB_OPERATIONS: {
        INSERT: 'insert',
        DELETE: 'delete',
        UPDATE: 'update',
        FIND: 'find',
        COUNT: 'count'
    },
    STATUS_CODES: {
       SUCCESS: '9',
       SYSTEM_ERROR: '6'
    },
    SYSTEM_MESSAGES: {
        SYSTEM_ERROR: 'Oops something went wrong.',
        USER_NOT_FOUND: 'User not found.'
    }
});