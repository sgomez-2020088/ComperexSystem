import { Router } from 'express'
import { addCompany, updateCompany} from './company.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { addCompanyValidator } from '../../middlewares/validators.js'

const api = Router()

api.post('/add',[validateJwt,isAdmin,addCompanyValidator],addCompany)
api.put('/update',[validateJwt,isAdmin,],updateCompany)
export default api