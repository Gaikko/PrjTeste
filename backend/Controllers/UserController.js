const createUserToken = require("../Helpers/create-user-token");
const Users = require("../Models/Users");
const Statuses = require("../Models/Statuses");
const bcrypt = require("bcrypt");

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        if (!name || !email) {
            return res.status(422).json(
                { message: "Os campos Nome e E-mail precisam ser preenchidos" }
            );
        }
        if (!password || !confirmpassword) {
            return res.status(422).json(
                { message: "Senha não Informada!" }
            );
        }
        if (password !== confirmpassword) {
            return res.status(422).json(
                { message: "As senhas não conferem!" }
            );
        }

        const userExists = await Users.findOne({ where: { email: email } });

        if (userExists) {
            return res.status(422).json(
                { message: "Este E-mail não pode ser utilizado!" }
            );
        }

        //create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create user
        const user = {
            name,
            email,
            password: passwordHash,
            statusId: 1,
        }

        try {
            const newUser = await Users.create(user)
            await createUserToken(newUser, req, res)
        } catch (err) {
            res.status(500).json(
                { messege: err }
            )
        }
    }

    static async getAllUsers(req, res) {
        const allUsers = await Users.findAndCountAll({
            include: {
                model: Statuses
            }
        })
        if (allUsers.count === 0 || !allUsers) {
            return res.status(422).json({
                message: "Nenhum usuário encontrado!",
            })
        }

        return res.status(200).json({
            message: `Registros Encontrados: ${allUsers.count}`,
            userDataAll: allUsers
        })

    }

    static async getUser(req, res) {

        const user = await Users.findAndCountAll({
            where: { statusId: 1 },
            include: {
                model: Statuses
            },
        })
        if (user.count === 0 || !user || user === "" || user === null || user.length === 0) {
            return res.status(422).json(
                { message: "Nenhum dado encontrado!" }
            )
        }
        return res.status(200).json(
            { userData: user }
        );

    }

    static async updateUser(req, res) {
        const userId = req.params.userId;

        const { name, email, password, statusId } = req.body;

        //create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = {
            name,
            email,
            password: passwordHash,
            statusId
        }
        
        const userExists = await Users.findByPk(userId);
        
        if (!userExists || userExists === null || userExists === undefined) {
            return res.status(422).json(
                { message: "Usuário não encontrado!" }
            )
        }

        try {
            const userUpdate = await Users.update(
                user,
                { where: { id: userId } }
            )
            return res.status(200).json(
                { message: "Dados atualizados!", userDataUpdate: userUpdate }
            )
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteUser(req, res) {
        const userId = req.params.userId;

        //not delete current user token equals param

        const userStatus = await Users.findOne({ where: { id: userId, status: !0 } })
        if (!userStatus || userStatus === null) {
            return res.status(422).json(
                { message: "Usuário não pode ser inativado!", data: userStatus }
            )
        }
        const user = await Users.update({ status: 0 }, { where: { id: userId } })
        return res.status(200).json(
            { message: "Registro Inativado", userDataDeleted: user }
        )
    }
}