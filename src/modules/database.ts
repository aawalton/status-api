import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

import { initModels } from '../../generated/tables/init-models'

dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URI ?? '', {
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    paranoid: false,
  },
  logging: false,
})

const database = {
  sequelize,
  ...initModels(sequelize),
}

export default database
