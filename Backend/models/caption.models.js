import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: 3
        },
        lastname: {
            type: String,
            minlength: 3
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        vehicleType: {
            type: String,
            required: true
        }
    },
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});

// captainSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//     return token;
// }

captainSchema.methods.generateAuthToken = function () {
    try {
      const payload = {
        _id: this._id.toString(), // ensure _id is string
        role: 'captain',          // include role for role-based authentication
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d', // token valid for 7 days (more user-friendly)
      });
  
      return token;
    } catch (error) {
      console.error('Error generating token:', error.message);
      throw new Error('Token generation failed');
    }
  };
  
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema);

export default captainModel;