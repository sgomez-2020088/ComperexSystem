import { Router } from 'express'
import { createCategory, getCategory, updateCategory} from '../category/category.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'


const api = Router()
api.post('/add',[validateJwt, isAdmin],createCategory)
api.get('/get',[validateJwt, isAdmin],getCategory)
api.put('/a',[validateJwt, isAdmin],updateCategory)


export default api