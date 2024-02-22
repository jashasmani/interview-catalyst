const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/login.model'); 


async function cheackConfirm(req, res) {
    const { userId, token } = req.params;
    const { password, confirm_password } = req.body;

    // console.log(req.body)
    try {

        if (password !== confirm_password) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(password, saltRounds);
        const hashedConfirmPassword = await bcryptjs.hash(confirm_password, saltRounds);


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await jwt.verify(token, "qwertyuioplkjhgfddsazxcvbnmlkjhgfdaqwertyuuioplkjhg", async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }


            user.password = hashedPassword;
            user.confirm_password = hashedConfirmPassword;

            await user.save();

            res.json({ message: 'Password confirmed successfully' });

        });
    }
    catch (err) {
        res.status(500).json({ message: "Error" });
    }
}


module.exports=cheackConfirm;