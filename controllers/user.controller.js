import UserModel from "../models/user.model.js";
import bcrypt, { hash } from 'bcrypt';

class userController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            res.send({ "status": "failed", "message": "Email already exists!" });
        } else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);
                        const doc = new UserModel({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            tc: tc
                        })
                        await doc.save();
                        res.send({"status": "success", "message": "User registered successfully"});
                    } catch (error) {
                        res.send({ "status": "failed", "message": "Sorry! Registration failed" });
                    }
                } else {
                    res.send({ "status": "failed", "message": "Password and Confirm password fields do not match!" });
                }
            } else {
                res.send({ "status": "failed", "message": "All fields are required!" });
            }
        }
    }
}

export default userController;