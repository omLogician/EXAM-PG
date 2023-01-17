const resetPassword = async (req, res) => {
    const users = await Users.findOne({where: {email: req.body.email}});
    if(!users) return res.status(404).json("User Not Found");
    const token = crypto.randomBytes(20).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    await Users.update({token: hash}, {where: {email: req.body.email}});
    const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${token}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    try{
        await sendEmail({
            email: users.email,
            subject: 'Your password reset token (valid for 10 min)',
            message
        });
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    }catch(err){
        users.token = undefined;
        users.save({validateBeforeSave: false});
        return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
}
