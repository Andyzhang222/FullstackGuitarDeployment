'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 删除之前添加的产品
    await queryInterface.bulkDelete('Products', {
      name: {
        [Sequelize.Op.in]: [
          'Gibson Les Paul Standard', 'Martin D-28', 'Yamaha P-125', 'Roland TD-17KVX',
          'Shure SM7B', 'Native Instruments Komplete Kontrol S61', 'Korg Volca Keys',
          'Behringer X32', 'AKG C414 XLII', 'Focusrite Scarlett 2i2', 'Boss RC-300',
          'Arturia MiniBrute 2', 'Mackie CR3-X', 'Moog Sub37', 'Zoom H6', 'Sennheiser HD650'
        ]
      }
    });

    // 添加新的 5 个产品
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Fender American Professional II Stratocaster',
        description: 'A modern take on the classic Stratocaster with upgraded features.',
        price: '1499',
        image: 'url_to_image37',
        inStock: true,
        brand: 'Fender',
        category: 'Electric Guitars',
        sku: 'FENDER-STRAT-001',
        quantity: 8,
        type: 'Electric',
        rating: '4.7',
        reviews_count: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Taylor 314ce',
        description: 'An acoustic guitar known for its bright and articulate sound.',
        price: '1899',
        image: 'url_to_image38',
        inStock: true,
        brand: 'Taylor',
        category: 'Acoustic Guitars',
        sku: 'TAYLOR-314CE-002',
        quantity: 6,
        type: 'Acoustic',
        rating: '4.8',
        reviews_count: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Roland GO:KEYS',
        description: 'A portable keyboard with a built-in Bluetooth speaker and learning features.',
        price: '299',
        image: 'url_to_image39',
        inStock: true,
        brand: 'Roland',
        category: 'Digital Pianos',
        sku: 'ROLAND-GO-KEYS-003',
        quantity: 10,
        type: 'Digital',
        rating: '4.5',
        reviews_count: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Zoom H5',
        description: 'A portable recorder with interchangeable capsules and excellent audio quality.',
        price: '279',
        image: 'url_to_image40',
        inStock: true,
        brand: 'Zoom',
        category: 'Recorders',
        sku: 'ZOOM-H5-004',
        quantity: 7,
        type: 'Recorder',
        rating: '4.7',
        reviews_count: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Shure SE846',
        description: 'High-end in-ear monitors with exceptional sound isolation and clarity.',
        price: '999',
        image: 'url_to_image41',
        inStock: true,
        brand: 'Shure',
        category: 'In-Ear Monitors',
        sku: 'SHURE-SE846-005',
        quantity: 12,
        type: 'In-Ear Monitor',
        rating: '4.9',
        reviews_count: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // 删除新添加的 5 个产品
    await queryInterface.bulkDelete('Products', {
      name: {
        [Sequelize.Op.in]: [
          'Fender American Professional II Stratocaster', 'Taylor 314ce', 'Roland GO:KEYS',
          'Zoom H5', 'Shure SE846'
        ]
      }
    });
  },
};