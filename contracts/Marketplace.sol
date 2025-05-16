// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Marketplace is ReentrancyGuard {


    // Product structure
    struct Product {
        uint256 id;
        address seller;
        string metadata;
        uint256 price;
        uint256 stock;
        bool active;
    }

    // Order structure
    struct Order {
        uint256 id;
        address buyer;
        uint256 productId;
        uint256 quantity;
        uint256 totalPrice;
        uint256 timestamp;
        string shippingDetails;
        OrderStatus status;
    }

    enum OrderStatus { Pending, Processing, Shipped, Delivered, Cancelled }

    // Stablecoin token used for payments
    
    // Platform fee percentage (in basis points, e.g., 250 = 2.5%)
    uint256 public platformFeeRate = 250;
    
    // Counter for product and order IDs
    uint256 private nextProductId = 1;
    uint256 private nextOrderId = 1;
    
    // Mappings
    mapping(uint256 => Product) public products;
    mapping(uint256 => Order) public orders;
    mapping(address => uint256[]) public sellerProducts;
    mapping(address => uint256[]) public buyerOrders;
    
    // Events
    event ProductListed(uint256 indexed productId, address indexed seller, uint256 price, uint256 stock);
    event ProductUpdated(uint256 indexed productId, uint256 newPrice, uint256 newStock, bool isActive);
    event OrderPlaced(uint256 indexed orderId, address indexed buyer, uint256 indexed productId, uint256 quantity, uint256 totalPrice);
    event OrderStatusUpdated(uint256 indexed orderId, OrderStatus status);

    IERC20 public USDC;
    address public owner;

    constructor() {
        USDC = IERC20(0x9C868614ffca7da36B36330b1f317B117c7834dE);
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner,'Not the owner');
        _;
    }

    function listProduct(string calldata _metadata, uint256 _price, uint256 _stock) external {
        require(_price > 0, "Price must be greater than zero");
        require(_stock > 0, "Stock must be greater than zero");
        
        uint256 productId = nextProductId++;
        
        products[productId] = Product({
            id: productId,
            seller: msg.sender,
            metadata: _metadata,
            price: _price,
            stock: _stock,
            active: true
        });
        
        sellerProducts[msg.sender].push(productId);
        
        emit ProductListed(productId, msg.sender, _price, _stock);
    }

    function updateProduct(uint256 _productId, uint256 _price, uint256 _stock, bool _active) external {
        Product storage product = products[_productId];
        require(product.seller == msg.sender, "Not the seller");
        
        if (_price > 0) {
            product.price = _price;
        }
        
        if (_stock > 0) {
            product.stock = _stock;
        }
        
        product.active = _active;
        
        emit ProductUpdated(_productId, product.price, product.stock, product.active);
    }

    function updateProductMetadata(uint256 _productId, string calldata _metadata) external {
        Product storage product = products[_productId];
        require(product.seller == msg.sender, "Not the seller");
        
        product.metadata = _metadata;
    }

    function placeOrder(
        uint256 _productId, 
        uint256 _quantity, 
        string calldata _shippingDetails
    ) external nonReentrant {
        Product storage product = products[_productId];
        
        require(product.active, "Product not available");
        require(product.stock >= _quantity, "Insufficient stock");
        require(_quantity > 0, "Quantity must be greater than zero");
        
        uint256 totalPrice = product.price * _quantity;
        uint256 fee = (totalPrice * platformFeeRate) / 10000;
        uint256 sellerAmount = totalPrice - fee;
    
         USDC.approve(msg.sender, totalPrice);
        
        require(
            USDC.transferFrom(msg.sender, address(this), totalPrice),
            "Transfer failed");

        require(
            USDC.transfer(product.seller, sellerAmount),
            "Seller payment failed"
        );

        product.stock -= _quantity;
        if (product.stock == 0) {
            product.active = false;
        }
        
        uint256 orderId = nextOrderId++;
        orders[orderId] = Order({
            id: orderId,
            buyer: msg.sender,
            productId: _productId,
            quantity: _quantity,
            totalPrice: totalPrice,
            timestamp: block.timestamp,
            shippingDetails: _shippingDetails,
            status: OrderStatus.Pending
        });
        
        buyerOrders[msg.sender].push(orderId);
        
        emit OrderPlaced(orderId, msg.sender, _productId, _quantity, totalPrice);
        emit ProductUpdated(_productId, product.price, product.stock, product.active);
    }


    function updateOrderStatus(uint256 _orderId, OrderStatus _status) external {
        Order storage order = orders[_orderId];
        Product storage product = products[order.productId];
        
        require(product.seller == msg.sender || owner == msg.sender, "Not authorized");
        require(order.status != OrderStatus.Delivered, "Order already delivered");
        require(order.status != OrderStatus.Cancelled, "Order already cancelled");
        
        if (_status == OrderStatus.Cancelled && order.status != OrderStatus.Cancelled) {
            uint256 fee = (order.totalPrice * platformFeeRate) / 10000;
            uint256 refundAmount = order.totalPrice - fee; 
            
            
            require(
                USDC.transfer(order.buyer, refundAmount),
                "Refund failed"
            );
            
            product.stock += order.quantity;
            if (!product.active && product.stock > 0) {
                product.active = true;
            }
            
            emit ProductUpdated(order.productId, product.price, product.stock, product.active);
        }
        
        order.status = _status;
        emit OrderStatusUpdated(_orderId, _status);
    }

    function withdrawFees() external onlyOwner {
        uint256 balance = USDC.balanceOf(address(this));
        require(balance > 0, "No fees to withdraw");
        require(USDC.transfer(owner, balance),"Withdrawal failed");
        
        }

    function getProduct(uint256 _productId) external view returns (
        uint256 id, 
        address seller, 
        string memory metadata, 
        uint256 price, 
        uint256 stock, 
        bool active
    ) {
        Product memory product = products[_productId];
        return (
            product.id,
            product.seller,
            product.metadata,
            product.price,
            product.stock,
            product.active
        );
    }
    
    function getOrder(uint256 _orderId) external view returns (
        uint256 id,
        address buyer,
        uint256 productId,
        uint256 quantity,
        uint256 totalPrice,
        uint256 timestamp,
        string memory shippingDetails,
        OrderStatus status
    ) {
        Order memory order = orders[_orderId];
        return (
            order.id,
            order.buyer,
            order.productId,
            order.quantity,
            order.totalPrice,
            order.timestamp,
            order.shippingDetails,
            order.status
        );
    }

   
    function getSellerProducts(address _seller) external view returns (uint256[] memory) {
        return sellerProducts[_seller];
    }

    function getBuyerOrders(address _buyer) external view returns (uint256[] memory) {
        return buyerOrders[_buyer];
    }
}