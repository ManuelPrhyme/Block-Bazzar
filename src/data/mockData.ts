import { Product, User, Order, Review } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    address: '0x1234567890123456789012345678901234567890',
    name: 'CryptoArtisan',
    bio: 'Digital creator specializing in handcrafted items and unique collectibles.',
    avatar: '',
    rating: 4.8,
    isSeller: true,
  },
  {
    address: '0x2345678901234567890123456789012345678901',
    name: 'BlockchainCreative',
    bio: 'Passionate about creating unique digital and physical items for the crypto community.',
    avatar: '',
    rating: 4.9,
    isSeller: true,
  },
  {
    address: '0x3456789012345678901234567890123456789012',
    name: 'DecentralizedDesigns',
    bio: 'Creating beautiful handmade products inspired by blockchain technology.',
    avatar: '',
    rating: 4.7,
    isSeller: true,
  },
  {
    address: '0x4567890123456789012345678901234567890123',
    name: 'TokenCollector',
    bio: 'Avid collector of unique items and rare digital collectibles.',
    avatar: '',
    rating: 4.5,
    isSeller: false,
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Ledger Flex',
    description: 'Enjoy your favorite NFT collections or images on your Ledger Flex screen, even when it is turned off.',
    price: 120.05,
    images: [
      'https://shop.ledger.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F2974%2F4858%2Ffiles%2Fledger-flex-face.webp%3Fv%3D1738140795&w=640&q=75',
    ],
    seller: {
      address: '0x1234567890123456789012345678901234567890',
      name: 'CryptoArtisan',
      rating: 4.8,
    },
    category: 'Accessories',
    tags: ['wood', 'blockchain', 'decoration', 'gift'],
    stock: 5,
    createdAt: '2023-04-15T10:30:00Z',
  },
  {
    id: 'prod-002',
    name: 'Nguvu Wall Series"',
    description: 'High-quality print of a series of boards of an image of elephants',
    price: 240,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsRhLVi_Mcx761Q92jq_jPYyzHLO5z3kWKGRvn5zJYkbr7C_lz2UTqAjwNVFl1xHefpLA&usqp=CAU',
    ],
    seller: {
      address: '0x2345678901234567890123456789012345678901',
      name: 'BlockchainCreative',
      rating: 4.9,
    },
    category: 'Digital Art',
    tags: ['nft', 'print', 'art', 'wall art'],
    stock: 10,
    createdAt: '2023-05-20T14:45:00Z',
  },
  {
    id: 'prod-003',
    name: 'African Multicolor Skirt',
    description: 'Stay warm and show your love for Ethereum with this hand-knitted sweater featuring the Ethereum logo. Made with 100% wool.',
    price: 98.99,
    images: [
      'https://myafricacaribbean.com/cdn/shop/products/Women23.jpg?v=1643937924',
      
    ],
    seller: {
      address: '0x3456789012345678901234567890123456789012',
      name: 'DecentralizedDesigns',
      rating: 4.7,
    },
    category: 'Clothing',
    tags: ['african', 'women', 'clothing', 'fashion'],
    stock: 3,
    createdAt: '2023-06-10T09:15:00Z',
  },
  {
    id: 'prod-004',
    name: 'Ledger Nano Range',
    description: 'Secure standard hardware wallet for crypto storage. Durable and intuitive.',
    price: 99.05,
    images: [
      'https://cdn.shopify.com/s/files/1/2974/4858/files/ledger-partners-face.webp?v=1738140794',
    ],
    seller: {
      address: '0x1234567890123456789012345678901234567890',
      name: 'CryptoArtisan',
      rating: 4.8,
    },
    category: 'Accessories',
    tags: ['wallet', 'leather', 'hardware', 'protection'],
    stock: 7,
    createdAt: '2023-07-05T11:20:00Z',
  },
  {
    id: 'prod-005',
    name: 'YubiKey',
    description: '',
    price: 40.05,
    images: [
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRX1NTqYnb_TIMvoj2fbKndMiQD3NZMkpgYz_aK_vYyzF9d8IUlR3-BQMU_tA7cQu358LyBvNlkGJyZ6p_wxVqpAg6MIVMg2_HmuyvbudX1pfNvbLBTfAsR9XqqerwvN4pSAkf53g&usqp=CAc',
    ],
    seller: {
      address: '0x2345678901234567890123456789012345678901',
      name: 'BlockchainCreative',
      rating: 4.9,
    },
    category: 'Accessories',
    tags: ['Security', 'Wallet', 'Hardware', '2FA'],
    stock: 2,
    createdAt: '2023-08-12T15:30:00Z',
  },
  {
    id: 'prod-006',
    name: 'Crypto Mining Rig Art Sculpture',
    description: 'Artistic sculpture made from repurposed mining rig components. A unique conversation piece for crypto enthusiasts.',
    price: 299.99,
    images: [
      'https://images.pexels.com/photos/2747893/pexels-photo-2747893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2747893/pexels-photo-2747893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    seller: {
      address: '0x3456789012345678901234567890123456789012',
      name: 'DecentralizedDesigns',
      rating: 4.7,
    },
    category: 'Art',
    tags: ['sculpture', 'mining', 'art', 'repurposed'],
    stock: 1,
    createdAt: '2023-09-08T12:40:00Z',
  },
  {
    id: 'prod-007',
    name: 'Bitcoin-themed Coffee Mug Set',
    description: 'Set of two ceramic coffee mugs featuring Bitcoin designs. Dishwasher and microwave safe.',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    seller: {
      address: '0x1234567890123456789012345678901234567890',
      name: 'CryptoArtisan',
      rating: 4.8,
    },
    category: 'Home & Kitchen',
    tags: ['mug', 'coffee', 'bitcoin', 'ceramic'],
    stock: 12,
    createdAt: '2023-10-15T08:50:00Z',
  },
  {
    id: 'prod-008',
    name: 'Custom Blockchain-Inspired Jewelry',
    description: 'Handcrafted sterling silver necklace with a pendant inspired by blockchain connections. Each piece is uniquely made to order.',
    price: 89.99,
    images: [
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    seller: {
      address: '0x2345678901234567890123456789012345678901',
      name: 'BlockchainCreative',
      rating: 4.9,
    },
    category: 'Jewelry',
    tags: ['jewelry', 'silver', 'necklace', 'handmade'],
    stock: 4,
    createdAt: '2023-11-20T13:10:00Z',
  },
  {
    id: 'prod-009',
    name: 'Crypto Portfolio Leather Journal',
    description: 'Handbound leather journal designed for tracking your crypto portfolio. Includes templated pages and a guide.',
    price: 59.99,
    images: [
      'https://images.pexels.com/photos/3246665/pexels-photo-3246665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3246665/pexels-photo-3246665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    seller: {
      address: '0x3456789012345678901234567890123456789012',
      name: 'DecentralizedDesigns',
      rating: 4.7,
    },
    category: 'Stationery',
    tags: ['journal', 'leather', 'portfolio', 'organization'],
    stock: 6,
    createdAt: '2023-12-05T10:25:00Z',
  },
  {
    id: 'prod-010',
    name: 'Abstract of Synaesthetes',
    description: 'Elegantly designed diagram depicting an abstract painting',
    price: 176,
    images: [
      'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1605721911519-3dfeb3be25e7%3Ffm%3Djpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.1.0%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8NHx8YWJzdHJhY3QlMjBhcnR8ZW58MHx8MHx8fDA%253D&tbnid=WoZqWZm83jV2VM&vet=1&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fabstract-art&docid=w-Wnpk4ejw6kUM&w=3000&h=4000&source=sh%2Fx%2Fim%2Fm1%2F1&kgs=e4420778c1ef535f',
    ],
    seller: {
      address: '0x1234567890123456789012345678901234567890',
      name: 'CryptoArtisan',
      rating: 4.8,
    },
    category: 'Wall Art',
    tags: ['print', 'frame', 'aesthetic', 'office'],
    stock: 3,
    createdAt: '2024-01-10T09:15:00Z',
  },
  {
    id: 'prod-011',
    name: 'Crypto Trading Desk Setup Guide',
    description: 'Comprehensive guide to setting up the perfect crypto trading desk, including hardware recommendations and ergonomic tips.',
    price: 19.99,
    images: [
      'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    seller: {
      address: '0x2345678901234567890123456789012345678901',
      name: 'BlockchainCreative',
      rating: 4.9,
    },
    category: 'Books',
    tags: ['guide', 'trading', 'setup', 'digital'],
    stock: 0,
    createdAt: '2024-02-18T14:20:00Z',
  },
  {
    id: 'prod-012',
    name: 'Handmade DeFi-themed Wall Clock',
    description: 'One-of-a-kind wall clock with hand-painted DeFi symbols. Powered by a precise quartz movement.',
    price: 110.99,
    images: [
      'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    seller: {
      address: '0x3456789012345678901234567890123456789012',
      name: 'DecentralizedDesigns',
      rating: 4.7,
    },
    category: 'Home Decor',
    tags: ['clock', 'defi', 'wall', 'handmade'],
    stock: 2,
    createdAt: '2024-03-25T16:35:00Z',
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    reviewer: '0x4567890123456789012345678901234567890123',
    rating: 5,
    comment: 'Absolutely beautiful craftsmanship! Each wooden block is perfectly carved and the metal chains give it an authentic blockchain feel. Looks amazing on my desk.',
    createdAt: '2023-05-20T10:15:00Z',
  },
  {
    id: 'rev-002',
    productId: 'prod-001',
    reviewer: '0x5678901234567890123456789012345678901234',
    rating: 4,
    comment: 'Great quality and attention to detail. Shipping was a bit slow but the product is worth the wait.',
    createdAt: '2023-05-25T14:30:00Z',
  },
  {
    id: 'rev-003',
    productId: 'prod-002',
    reviewer: '0x6789012345678901234567890123456789012345',
    rating: 5,
    comment: 'The print quality is exceptional! Colors are vibrant and the certificate of authenticity adds a nice touch.',
    createdAt: '2023-06-10T09:45:00Z',
  },
  {
    id: 'rev-004',
    productId: 'prod-003',
    reviewer: '0x7890123456789012345678901234567890123456',
    rating: 4,
    comment: 'Warm and comfortable sweater. The Ethereum logo is well-knitted. Runs slightly small so consider sizing up.',
    createdAt: '2023-07-05T16:20:00Z',
  },
  {
    id: 'rev-005',
    productId: 'prod-004',
    reviewer: '0x8901234567890123456789012345678901234567',
    rating: 5,
    comment: 'Perfect protection for my hardware wallet. The leather is high quality and the stitching is impeccable.',
    createdAt: '2023-08-12T11:55:00Z',
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    buyer: '0x4567890123456789012345678901234567890123',
    items: [
      {
        product: mockProducts[0],
        quantity: 1,
      },
      {
        product: mockProducts[3],
        quantity: 2,
      },
    ],
    totalPrice: 195.97,
    status: 'delivered',
    txHash: '0xa1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890',
    createdAt: '2023-05-15T09:30:00Z',
    updatedAt: '2023-05-20T14:20:00Z',
  },
  {
    id: 'order-002',
    buyer: '0x4567890123456789012345678901234567890123',
    items: [
      {
        product: mockProducts[2],
        quantity: 1,
      },
    ],
    totalPrice: 149.99,
    status: 'shipped',
    txHash: '0xb2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1',
    createdAt: '2023-09-10T11:15:00Z',
    updatedAt: '2023-09-12T15:40:00Z',
  },
  {
    id: 'order-003',
    buyer: '0x5678901234567890123456789012345678901234',
    items: [
      {
        product: mockProducts[4],
        quantity: 1,
      },
      {
        product: mockProducts[6],
        quantity: 2,
      },
    ],
    totalPrice: 94.97,
    status: 'delivered',
    txHash: '0xc3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2',
    createdAt: '2023-06-20T13:45:00Z',
    updatedAt: '2023-06-25T10:30:00Z',
  },
];