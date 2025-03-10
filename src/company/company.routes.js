import { Router } from 'express'
import { addCompany, updateCompany, getCompanies} from './company.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { addCompanyValidator, updateCompanyValidator } from '../../middlewares/validators.js'

const api = Router()

api.post('/add',[validateJwt,isAdmin,addCompanyValidator],addCompany)
api.put('/update',[validateJwt,isAdmin,updateCompanyValidator],updateCompany)

api.post('/all', getCompanies)



export default api