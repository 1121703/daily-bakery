// --- 儲存為 'cart.js' ---

const Cart = {
    
    // Key 用於 localStorage
    STORAGE_KEY: 'myAppCart',

    /**
     * 從 localStorage 取得購物車資料
     * @returns {Array} 購物車商品陣列
     */
    get: function() {
        const cartData = localStorage.getItem(this.STORAGE_KEY);
        // 如果 localStorage 是空的，回傳一個空陣列
        // 否則，將 JSON 字串轉回 JavaScript 物件/陣列
        return cartData ? JSON.parse(cartData) : [];
    },

    /**
     * 將購物車資料存入 localStorage
     * @param {Array} cart - 要儲存的購物車陣列
     */
    save: function(cart) {
        // localStorage 只能儲存字串，所以我們將陣列轉為 JSON 字串
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    },

    /**
     * 新增商品到購物車
     * @param {string} id - 商品 ID
     * @param {string} name - 商品名稱
     * @param {number} price - 商品價格
     */
    add: function(id, name, price) {
        // 1. 取得目前的購物車
        let cart = this.get();
        
        // 2. 檢查商品是否已存在
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            // 如果存在，數量 +1
            existingItem.quantity += 1;
        } else {
            // 如果不存在，新增此商品
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }

        // 3. 儲存更新後的購物車
        this.save(cart);
    },

    /**
     * 清空購物車 (結帳後使用)
     */
    clear: function() {
        localStorage.removeItem(this.STORAGE_KEY);
    }

    // (未來您可以自行擴充：如 removeItem, updateQuantity 等)
};