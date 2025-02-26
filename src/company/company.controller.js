import Company from './company.model.js '


export const addCompany = async (req, res) => {
    try {
        let data = req.body
        let company = new Company(data)
        await company.save()
        return res.send({ message: `Company registered successfully`, success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error registering company', err, success: false })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const companyId = req.body.companyId
        const data = req.body

        const updatedCompany = await Company.findByIdAndUpdate (companyId, data, { new: true })
        if(!updatedCompany) return res.status(404).send({ message: 'Company not found', success: false })
        return res.send({ message: 'Company updated successfully', success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false })
    }
    
}


export const getCompanies = async (req, res) => {
    try {
        const { categoryId, trajectory, order } = req.body

        let query = {}

        if (categoryId)  query.category = categoryId

        if (trajectory)  query.trajectory = { $gte: trajectory }

        let companies = await Company.find(query).populate('category', 'name -_id')
    
        if (order) {
            const sortOrder = order === 'desc' ? -1 : 1
            companies = await Company.find(query)  
                .sort({ name: sortOrder })         
                .populate('category', 'name -_id')
        }

        if (companies.length === 0) return res.status(404).send({ message: 'Companies not found', success: false })
        
        return res.send({ message: 'Companies found', success: true, companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false })
    }
}
