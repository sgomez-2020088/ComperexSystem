import { Schema, model } from 'mongoose'

const companySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Company name is required'],
        maxLength: [100, "Can't exceed 100 characters"],
        unique: true
    },
    impact: {
        type: String,
        required: [true, 'Impact level is required'],
        uppercase: true,
        enum: ['BAJO', 'MEDIO', 'ALTO']
    },
    trajectory: {
        type: Number,
        required: [true, 'Years of trajectory are required'],
        min: [0, 'Trajectory must be at least 0 years']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [500, "Can't exceed 500 characters"]
    },
    contactEmail: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        maxLength: [13, "Can't exceed 13 characters"],
        minLength: [8, "Phone must be at least 8 characters"]
    },
    status: {
        type: Boolean,
        required: [true, 'Status is required'],
        default: true
    }
})


companySchema.methods.toJSON = function () {
    const { __v, _id, ...company } = this.toObject()
    return company
}

export default model('Company', companySchema)
