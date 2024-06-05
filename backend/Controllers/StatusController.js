const Statuses = require("../Models/Statuses");

module.exports = class StatusController {
    static async create(req, res) {
        const { description } = req.body;

        if (!description) {
            return res.status(422).json({
                message: "Descrição não Informada!",
            })
        }

        try {
            const newStatus = await Statuses.create({ description: description });
            return res.status(201).json({
                message: "Registro Criado com Sucesso!",
                dataStatus: newStatus
            })
        } catch (error) {
            return res.status(500).json({
                message: "Erro na Criação do Registro!",
                error: error
            })
        }

    }

    static async get(req, res) {
        const dataStatus = await Statuses.findAndCountAll()
        if (!dataStatus || dataStatus.length === 0 || dataStatus.count === 0) {
            return res.status(422).json({
                message: "Nenhum Registro foi Encontrado!",
                //dataStatus: dataStatus
            })
        }

        return res.status(200).json({
            message: `Registro(s) Encontrado(s): ${dataStatus.count}`,
            dataStatus: dataStatus
        })
    }

    static async update(req, res) {
        const { description } = req.body;
        const id = req.params.id;
        if (!description) {
            return res.status(422).json({
                message: "Descrição não informada!"
            })
        }

        const dbId = await Statuses.findOne({ where: { id } })

        if (!dbId) {
            return res.status(500).json({
                message : "Dados Incorretos ou não Encontrados!"
            })
        }

        try {
            const dataStatus = await Statuses.update(
                { description: description },
                { where: { id: id } }
            )
            return res.status(200).json({
                message: "Registro(s) Atualizado(s) com Sucesso!",
                data: `Registros Atualizados: ${dataStatus}`
            })
        } catch (error) {
            return res.status(500).json({
                message: "Erro na Atualização do(s) Registro(s)!",
                error: error
            })
        }
    }
}