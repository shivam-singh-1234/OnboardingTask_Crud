const { Model } = require('objection');
const db = require('../DB/connection');
const KnexConfig = require('../knexfile');
const knex = require('knex');

Model.knex(knex(KnexConfig.development));
// Model.knex(db);
class User extends Model {
static get tableName() {
	return 'users';
}
}

module.exports = User;