import { Router } from 'express'
import { generateCompanyReport} from '../../src/report/report.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.get('/reportExcel',[validateJwt, isAdmin], generateCompanyReport)

export default api
