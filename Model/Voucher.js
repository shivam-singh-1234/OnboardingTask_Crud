const { Model } = require('objection');
const db = require('../DB/connection');
const KnexConfig = require('../knexfile');
const knex = require('knex');

Model.knex(knex(KnexConfig.development));
// Model.knex(db);
class Voucher extends Model {
static get tableName() {
	return 'vouchers';
}
}
module.exports = Voucher;