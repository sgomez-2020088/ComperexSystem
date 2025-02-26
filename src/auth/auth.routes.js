import { Router } from 'express'
import { registerAdmin, login} from './auth.controller.js'
import { registerValidator, loginValidator } from '../../middlewares/validators.js'



const api = Router()

api.post('/registerAdmin',[registerValidator],registerAdmin)


api.post('/login',[loginValidator],login)


export default api