import { Router } from 'express'
import { createCategory, getCategory, updateCategory} from '../category/category.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import { createCategoryValidator, updateCategoryValidator} from '../../middlewares/validators.js'


const api = Router()
api.post('/add',[validateJwt,isAdmin, createCategoryValidator],createCategory)
api.get('/get',[validateJwt, isAdmin],getCategory)
api.put('/update',[validateJwt, isAdmin,updateCategoryValidator],updateCategory)


export default api