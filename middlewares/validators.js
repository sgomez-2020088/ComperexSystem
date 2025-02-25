import { body } from 'express-validator' 
import { validateErrors} from './validate.errors.js'
import { exitEmailUser, exitUsername } from './db.validators.js'

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('username','Username cannot be empty').notEmpty().custom(exitUsername),
    body('email', 'Email cannot be empty').notEmpty().isEmail().custom(exitEmailUser),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be strong').isLength({min:8}),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrors       
]

export const loginValidator = [
    body('userData','Your information cannot be empty').notEmpty().toLowerCase(),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().isLength({min:8}),
    validateErrors       
]

export const addCompanyValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('impact', 'Impact cannot be empty').notEmpty(),
    body('trajectory', 'Trajectory cannot be empty').notEmpty(),
    body('category', 'Category cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty(),
    body('contanctEmail', 'Contact email cannot be empty').notEmpty().isEmail().custom(exitEmailUser),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrors
]