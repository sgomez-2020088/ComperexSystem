import Category from './category.model.js'

export const getCategory = async(req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const category = await Category.find()
            .skip(skip)
            .limit(limit)
            
        if(category.length === 0) return res.status(404).send({message:'Category not found', success: false})
            return res.send({message: 'All is right', category, success: true})
        } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', success: false})
    }
}


export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body

        const existingCategory = await Category.findOne({ name })
        if (existingCategory) return res.status(400).send({ message: 'Category already exists', sucess: true})
        
        const newCategory = new Category({ name, description })
        await newCategory.save()

        res.send({ message: 'Category created successfully', category: newCategory, succes: true})
    } catch (err) {
        console.error(err)
        res.status(500).send({message: 'General error', success: false})
    }
}


export const updateCategory = async (req, res) => {
    try {
        const  id  = req.body.id
        const data = req.body

        const updateCategory = await Category.findByIdAndUpdate(id, data, {new:true})
        if(!updateCategory) return res.status(404).send({message: 'Category not found', success: false})
            return res.send({message: 'Category updated succesfully', category: updateCategory, success: true})
    } catch (err) {
        console.error(err)
        res.status(500).send({message: 'General error', success: false})
    }
}
