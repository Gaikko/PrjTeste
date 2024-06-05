const Company = require("../Models/Companies");
const Costumers = require("../Models/Costumers");
const Statuses = require("../Models/Statuses");

module.exports = class CompanyController {
    static async create(req, res) {
        const { name, costumerId } = req.body;

        if (!name) {
            return res.status(422).json(
                { message: "Nome não informado!" }
            );
        }

        if (!costumerId) {
            return res.status(422).json(
                { message: "Cliente não informado!" }
            );
        }

        const company = {
            name,
            costumerId,
            statusId: 1
        }

        try {
            const companyData = await Company.create(company);
            return res.status(200).json(
                { message: companyData }
            )
        } catch (error) {
            return res.status(422).json(error);
        }
    }

    static async getCompany(req, res) {
        const company = await Company.findAndCountAll({
            include: [
                {
                    model: Costumers,
                    attributes: ["id", "name"]
                },
                {
                    model: Statuses,
                }
            ]
        });
        return res.status(200).json(company)
    }

    static async update(req, res) {

    }

    static async delete(req, res) {

    }
}