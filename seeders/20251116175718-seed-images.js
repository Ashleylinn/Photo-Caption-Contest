'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    return queryInterface.bulkInsert('Images', [
      { url: '/images/1.jpeg', title: 'Image 1', createdAt: now, updatedAt: now },
      { url: '/images/2.jpeg', title: 'Image 2', createdAt: now, updatedAt: now },
      { url: '/images/3.jpeg', title: 'Image 3', createdAt: now, updatedAt: now },
      { url: '/images/4.jpeg', title: 'Image 4', createdAt: now, updatedAt: now }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
