const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')
const SequelizeAuto = require('sequelize-auto')

dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URI ?? '')
console.log(process.env.DATABASE_URI)

const auto = new SequelizeAuto(sequelize, null, null, {
  caseModel: 'c',
  caseFile: 'c',
  caseProp: 'c',
  directory: './generated/tables',
  noAlias: true,
  singularize: false,
  schema: 'public',
  lang: 'ts',
  additional: {
    timestamps: false,
    underscored: true,
    paranoid: true,
  },
  views: true,
})

void auto.run().then(() => {
  process.exit(0)
})
