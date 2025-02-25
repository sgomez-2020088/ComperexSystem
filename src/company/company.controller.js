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