import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'github_data.db',
  logging: false
});

const RepoData = sequelize.define('RepoData', {
  stars: Sequelize.INTEGER,
  count: Sequelize.INTEGER,
  timestamp: Sequelize.DATE
}, {
  timestamps: false
});

async function initialize() {
  await sequelize.sync();
}

export { RepoData, initialize };
