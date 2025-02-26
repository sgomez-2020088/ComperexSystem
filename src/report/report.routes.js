import { Router } from 'express'
import { generateCompanyReport} from '../../src/report/report.controller.js'

const api = Router()

api.get('/reportExcel', generateCompanyReport)

export default api
