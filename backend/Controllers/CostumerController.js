const Costumers = require("../Models/Costumers");
const Statuses = require("../Models/Statuses");

module.exports = class CostumerController {
    static async create(req, res) {
        const { name } = req.body;

        if (!name || name.length === 0 || name === "") {
            return res.status(422).json({
                messege: "Nome do Cliente não pode ser vazio!"
            })
        }

        try {
            const newCostumer = await Costumers.create({ name: name });
            return res.status(201).json({
                message: "Registro Criado com Sucesso!",
                dataCostumer: newCostumer
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            });
        }
    }

    static async getAllCostumer(req, res) {
        const dataCostumer = await Costumers.findAndCountAll({
            include: {
                model: Statuses,
                attributes: ['description']
            }
        })

        if (!dataCostumer || dataCostumer.length === 0 || dataCostumer.count === 0) {
            return res.status(422).json(
                { message: "Nenhum Registro foi Encontrado!" }
            );
        }
        return res.status(200).json({
            message: `Registro(s) Encontrado(s): ${dataCostumer.count}`,
            dataCostumer: dataCostumer
        }
        )
    }

    static async getCostumer (req, res) {
        const dataCostumer = await Costumers.findAndCountAll({
            where: {statusId: 1},
            include: {
                model: Statuses,
                attributes: ["description"]
            }
        })

        if (!dataCostumer || dataCostumer.length === 0 || dataCostumer.count === 0) {
            return res.status(422).json(
                { message: "Nenhum Registro foi Encontrado!" }
            );
        }
        return res.status(200).json({
            message: `Registro(s) Encontrado(s): ${dataCostumer.count}`,
            dataCostumer: dataCostumer
        }
        )

    }  

    static async update(req, res) {
        const { name, statusId } = req.body;
        const id = req.params.id;

        if (!name) {
            return res.status(422).json({
                message: "Nome não Informado!"
            })
        }
        if (!statusId) {
            return res.status(422).json({
                message: "Status não Informado!"
            })
        }

        const dbId = await Costumers.findByPk(id)

        if (!dbId) {
            return res.status(422).json({
                message: "Dados Incorretos ou não Encontrados!"
            })
        }

        try {
            const dataCostumer = await Costumers.update(
                {
                    name: name,
                    statusId: statusId,
                },
                { where: { id: id } }
            )
            return res.status(200).json({
                message: "Registro(s) Atualizado(s) com Sucesso!",
                data: `Registros Atualizados: ${dataCostumer}`
            })
        } catch (error) {
            return res.status(500).json({
                message: "Erro na Atualização do(s) Registro(s)!",
                error: error
            })
        }

    }

    static async delete(req, res) {
        const id = req.params.id;
        const idCostumer = await Costumers.findByPk(id);
        if (!idCostumer) {
            return res.status(500).json({
                message: "Nenhum Registro foi Encontrado!"
            })
        }

        try {
            await Costumers.destroy({
                where: { id }
            })
            return res.status(200).json({
                message: "Registro Excluído com Sucesso!"
            })
        } catch (error) {
            return res.status(500).json({
                message: "Erro na Exclusão do Registro!",
                errro: error
            })
        }
        
    }
}