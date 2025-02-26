import { Router } from 'express'
import { addCompany, updateCompany, getCompaniesCategory, getCompaniesTrajectory, getCompaniesAlphabet} from './company.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { addCompanyValidator, updateCompanyValidator } from '../../middlewares/validators.js'

const api = Router()

api.post('/add',[validateJwt,isAdmin,addCompanyValidator],addCompany)
api.put('/update',[validateJwt,isAdmin,updateCompanyValidator],updateCompany)
api.post('/cat', getCompaniesCategory)
api.post('/trajectory', getCompaniesTrajectory)
api.post('/alph', getCompaniesAlphabet)

export default api