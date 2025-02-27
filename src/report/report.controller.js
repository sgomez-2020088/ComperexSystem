import ExcelJS from 'exceljs'
import fs from 'fs'
import path from 'path'
import Company from '../company/company.model.js' 

export const generateCompanyReport = async (req, res) => {
    try {
        const companies = await Company.find().populate('category', 'name -_id')

        if (companies.length === 0) {
            return res.status(404).send({ message: 'No companies found', success: false })
        }
        
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Companies Report')
        worksheet.getRow(1).font = { bold: true }

        worksheet.columns = [
            { header: 'Company Name', key: 'name', width: 40 },
            { header: 'Category', key: 'category', width: 25 },
            { header: 'Impact', key: 'impact', width: 14 },
            { header: 'Trajectory', key: 'trajectory', width: 20 },
            { header: 'Description', key: 'description', width: 50 },
            { header: 'Contact Email', key: 'contactEmail', width: 45},
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Status', key: 'status', width: 10 },
        ]

        companies.forEach(company => {
            let category = company.category ? company.category.name : 'No category'
            let status = company.status ? 'Active' : 'Inactive'
            
            worksheet.addRow({
                name: company.name,
                category: category,
                impact: company.impact,
                trajectory: company.trajectory,
                description: company.description,
                contactEmail: company.contactEmail,
                phone: company.phone,
                status: status,
            })
        })

        const reportsFolder = path.join(process.cwd(), 'excelReport')

        if (!fs.existsSync(reportsFolder)) fs.mkdirSync(reportsFolder, { recursive: true })
        

        let fileName = 'companies_report.xlsx'
        let filePath = path.join(reportsFolder, fileName)
        let counter = 1

        while (fs.existsSync(filePath)) {
            fileName = `companies_report(${counter}).xlsx`
            filePath = path.join(reportsFolder, fileName)
            counter++
        }

        await workbook.xlsx.writeFile(filePath)

        res.status(200).send({
            message: 'Report saved successfully',
            file: fileName,
            success: true
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', err, success: false })
    }
}
