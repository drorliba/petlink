const signupSchema = {
    type: 'object',
    properties: {
        first_name: { type: 'string', maxLength: 15 },
        last_name: { type: 'string', maxLength: 15 },
        email: { type: 'string', maxLength: 30 },
        phone_number: { type: 'string', maxLength: 15 },
        password: { type: 'string', maxLength: 15 },
        rePassword: { type: 'string', maxLength: 15 }
    },
    required: ['first_name', 'last_name', 'email', 'phone_number', 'password', 'rePassword'],
    additionalProperties: false
}

const loginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['email', 'password'],
    additionalProperties: false
}

const updateDetailsSchema = {
    type: 'object',
    properties: {
        userId: { type: 'number' },
        first_name: { type: 'string', maxLength: 15 },
        last_name: { type: 'string', maxLength: 15 },
        email: { type: 'string', maxLength: 15 },
        phone_number: { type: 'string', maxLength: 15 },
        bio: { type: 'string', maxLength: 140 }
    },
    required: ['userId', 'last_name', 'email', 'phone_number'],
    additionalProperties: true
}

const changePasswordSchema = {
    type: 'object',
    properties: {
        password: { type: 'string', maxLength: 15 },
        userId: { type: 'number' }
    },
    required: ['password', 'userId'],
}

const addPetSchema = {
    type: 'object',
    properties: {
        type: { type: 'string' },
        name: { type: 'string', maxLength: 15 },
        breed: { type: 'string', maxLength: 15 },
        color: { type: 'string', maxLength: 15 },
        status: { type: 'string' },
        weight: { type: 'number', maximum: 100 },
        height: { type: 'number', maximum: 100 },
        hypoallergenic: { type: 'number' },
        dietaryRestrictions: { type: 'string', maxLength: 140 },
        bio: { type: 'string', maxLength: 140 }
    },
    required: ['type', 'name', 'breed', 'color', 'status', 'weight', 'height', 'hypoallergenic'],
    additionalProperties: true
}

module.exports = { signupSchema, loginSchema, updateDetailsSchema, changePasswordSchema, addPetSchema }