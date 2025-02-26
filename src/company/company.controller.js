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

export const getCompaniesCategory = async (req, res) => {
    try {
        const { categoryId } = req.body
        const companies = await Company.find({ category: categoryId })
        .populate('category','name -_id')
        if (companies.length === 0) {
            return res.status(404).send({ message: 'Companies not found', success: false })
        }
        return res.send({ message: 'Companies found', success: true, companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error',success: false })
    }
}

export const getCompaniesTrajectory = async (req, res) => {
    try {
        const { trajectory } = req.body
        const companies = await Company.find({ trajectory: { $gte: trajectory } })
        if (companies.length === 0) {
            return res.status(404).send({ message: 'Companies not found', success: false })
        }
        return res.send({ message: 'Companies found', success: true, companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false })
    }
}

export const getCompaniesAlphabet = async (req, res) => {
    try {
        const { order } = req.body  
        const sortOrder = order === 'desc' ? -1 : 1

        const companies = await Company.find().sort({ name: sortOrder })
        if (companies.length === 0) {
            return res.status(404).send({ message: 'Companies not found', success: false })
        }
        return res.send({ message: 'Companies listed alphabetically', success: true, companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false })
    }
}
