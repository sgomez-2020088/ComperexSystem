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
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be strong').isLength({min:8}),
    validateErrors       
]

export const addCompanyValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('impact', 'Impact cannot be empty').notEmpty(),
    body('trajectory', 'Trajectory cannot be empty').notEmpty(),
    body('category', 'Category cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty(),
    body('contactEmail', 'Contact email cannot be empty').notEmpty().isEmail().custom(exitEmailUser),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrors
]

export const updateCompanyValidator = [
    body('companyId', 'Company ID cannot be empty').notEmpty(),
    body('name', 'Name cannot be a blank').optional().notEmpty(),
    body('impact', 'Impact cannot be a blank').optional().notEmpty(),
    body('trajectory', 'Trajectory cannot be a blank').optional().notEmpty(),
    body('category', 'Category cannot be a blank').optional().notEmpty(),
    body('description', 'Description cannot be a blank').optional().notEmpty(),
    body('contanctEmail', 'Contact email cannot be a blank').optional().notEmpty().isEmail().custom(exitEmailUser),
    body('phone', 'Phone cannot be a blank').optional().notEmpty().isMobilePhone(),
    validateErrors
]

export const createCategoryValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('description', 'Description cannot be empty').notEmpty(),
    validateErrors
]

export const updateCategoryValidator = [
    body('id', 'Name cannot be empty').notEmpty(),
    body('name', 'Name cannot be a blank').optional().notEmpty(),
    body('description', 'Description cannot be a blank').optional().notEmpty(),
    validateErrors
]