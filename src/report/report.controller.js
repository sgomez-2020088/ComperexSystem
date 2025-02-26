import ExcelJS from 'exceljs'
import  Company  from '../company/company.model.js' 

export const generateCompanyReport = async (req, res) => {
    try {
        const companies = await Company.find().populate('category', 'name -_id')

        if (companies.length === 0) return res.status(404).send({ message: 'No companies found', success: false })
        
        const workbook = new ExcelJS.Workbook()

        const worksheet = workbook.addWorksheet('Companies Report')

        worksheet.columns = [
            { header: 'Company Name', key: 'name', width: 30 },
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Impact', key: 'impact', width: 10 },
            { header: 'Trajectory (Years)', key: 'trajectory', width: 15 },
            { header: 'Description', key: 'description', width: 50 },
            { header: 'Contact Email', key: 'contactEmail', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Status', key: 'status', width: 10 },
        ]


        companies.forEach(company => {
            worksheet.addRow({
                name: company.name,
                category: company.category ? company.category.name : 'N/A',
                impact: company.impact,
                trajectory: company.trajectory,
                description: company.description,
                contactEmail: company.contactEmail,
                phone: company.phone,
                status: company.status ? 'Active' : 'Inactive',
            })
        })

        worksheet.getRow(1).font = { bold: true }

    
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        res.setHeader('Content-Disposition', 'attachment; filename=companies_report.xlsx')

        await workbook.xlsx.write(res)
        res.end()

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error generating report', err, success: false })
    }
}
