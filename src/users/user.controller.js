const service = require('./user.service');

class CustomerUsers {
    async post({ body } = req, res) {

        try {

            if (!body.username || !body.password) {
                throw new Error('Fields username and password must be send!');
            }

            const { _id: id, username } = await service.post(body)

            res.status(201).json({ id, username });
        } catch (err) {
            if (err.code === 11000) res.status(500).json({ success: false, message: 'Register with another username, please!' });
            return res.status(500).send(err.message || err);
        }

    }

    async get(req, res) {
        const { skip = 0, limit = 100 } = req.query;

        try {
            const users = await service.get(Number(skip), Number(limit));

            const result = {
                meta: {
                    total: users.length,
                    skip,
                    limit,
                },
                data: users
            };

            res.status(result.data.length == 0 ? 204 : 200).json(result);
        } catch (err) {
            res.status(result).json({ succes: false, message: err.message || err });
        };
    };

    async delete(req, res) {

        try {
            const { id } = req.params;

            if (!id) {
                throw new Error(`Param id must be send!`);
            }

            await service.delete(id);

            res.status(204).json({ message: 'user deleted!' });
        } catch (e) {
            res.status(400).json({ succes: false, message: e.message || e });
        };

    };
};

module.exports = new CustomerUsers();