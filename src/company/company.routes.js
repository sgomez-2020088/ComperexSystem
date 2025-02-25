import { Router } from 'express'
import { addCompany } from './company.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { addCompanyValidator } from '../../middlewares/validators.js'

const api = Router()

api.post('/add',[validateJwt,isAdmin,addCompanyValidator],addCompany)
export default api