import { AdminSignIn } from "../models/adminSignInSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const adminSignIn = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            handleValidationError("Please Fill Form!", 400);
        }
        const existingAdmin = await AdminSignIn.findOne({ email });
        if (!existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin does not exist" });
        }
        const isPasswordValid = await existingAdmin.isValidPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }
        res.status(200).json({
            success: true,
            message: "Admin Logged In!",
        });
    } catch (err) {
        next(err);
    }
};
