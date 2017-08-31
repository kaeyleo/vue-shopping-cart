new Vue({
    el: '#app',
    data: {
        cate_index: 0,
        cate: [
            { id: 0, des: '推荐' },
            { id: 1, des: '母婴' },
            { id: 2, des: '鞋包饰品' },
            { id: 3, des: '食品' },
            { id: 4, des: '数码家电' },
            { id: 5, des: '居家百货' }
        ],
        filter_index: 0,
        goods: [{
            id: 1001,
            name: 'Beats EP头戴式耳机',
            price: 558,
            type: 4,
            stock: 128,
            sales: 1872,
            img: 'http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg'
        }, {
            id: 1002,
            name: '雀巢（Nestle）高钙成人奶粉',
            price: 60,
            type: 3,
            stock: 5,
            sales: 2374,
            img: 'http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp'
        }, {
            id: 1003,
            name: '煎炒烹炸一锅多用',
            price: 216,
            type: 5,
            stock: 2,
            sales: 351,
            img: 'http://gw.alicdn.com/tps/TB19OfQRXXXXXbmXXXXL6TaGpXX_760x760q90s150.jpg_.webp'
        }, {
            id: 1004,
            name: 'ANNE KLEIN 潮流经典美式轻奢',
            price: 585,
            type: 2,
            stock: 465,
            sales: 8191,
            img: 'http://gw.alicdn.com/tps/TB1l5psQVXXXXcXaXXXL6TaGpXX_760x760q90s150.jpg_.webp'
        }, {
            id: 1005,
            name: '乐高EV3机器人积木玩具',
            price: 3099,
            type: 1,
            stock: 154,
            sales: 165,
            img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t6490/168/1052550216/653858/9eef28d1/594922a8Nc3afa743.jpg!q50.jpg'
        }, {
            id: 1006,
            name: '全球购 路易威登（Louis Vuitton）新款女士LV印花手袋 M41112',
            price: 10967,
            type: 2,
            stock: 12,
            sales: 6,
            img: 'https://m.360buyimg.com/n1/s220x220_jfs/t1429/17/1007119837/464370/310392f4/55b5e5bfN75daf703.png!q70.jpg'
        }, {
            id: 1007,
            name: 'Kindle Paperwhite3 黑色经典版电纸书',
            price: 805,
            type: 4,
            stock: 3,
            sales: 395,
            img: 'http://img12.360buyimg.com/n1/s528x528_jfs/t4954/76/635213328/51972/ec4a3c3c/58e5f717N4031d162.jpg!q70.jpg'
        }, {
            id: 1008,
            name: 'DELSEY 男士双肩背包',
            price: 269,
            type: 2,
            stock: 18,
            sales: 69,
            img: 'http://gw.alicdn.com/tps/LB1HL0mQVXXXXbzXVXXXXXXXXXX.png'
        }, {
            id: 1009,
            name: '荷兰 天赋力 Herobaby 婴儿配方奶粉 4段 1岁以上700g',
            price: 89,
            type: 1,
            stock: 36,
            sales: 1895,
            img: 'http://m.360buyimg.com/babel/s330x330_jfs/t4597/175/4364374663/125149/4fbbaf21/590d4f5aN0467dc26.jpg!q50.jpg.webp'
        }, {
            id: 1010,
            name: '【全球购】越南acecook河粉牛肉河粉特产 速食即食方便面粉丝 牛肉河粉米粉65克*5袋',
            price: 19.9,
            type: 3,
            stock: 353,
            sales: 3041,
            img: 'https://m.360buyimg.com/mobilecms/s357x357_jfs/t3169/228/5426689121/95568/d463e211/586dbf56N37fcd503.jpg!q50.jpg'
        }, {
            id: 1011,
            name: '正品FENDI/芬迪女包钱包女长款 百搭真皮钱夹 女士小怪兽手拿包',
            price: 3580,
            type: 2,
            stock: 5,
            sales: 18,
            img: 'http://img.alicdn.com/imgextra/i3/TB16avCQXXXXXcsXpXXXXXXXXXX_!!0-item_pic.jpg_400x400q60s30.jpg_.webp'
        }],
        list: [],
        price_isAsc: false,
        cart: [{
            id: 1001,
            name: 'Beats EP头戴式耳机',
            price: 558,
            type: 4,
            quantity: 1,
            subtotal: '558.0',
            stock: 128,
            sales: 1872,
            img: 'http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg'
        }]
    },
    created: function() {
        this.setList()
    },
    methods: {
        // 切换商品分类
        toggleCate: function(index) {
            this.cate_index = index;
            // 分类操作
            this.setList();
            // 价格排序状态保持不变
            (this.filter_index === 2) && (this.price_isAsc = !this.price_isAsc);
            // 商品排序
            this.sortBy(this.filter_index);
        },
        // 商品分类
        setList: function() {
            var self = this;
            this.list = this.goods.filter(function(el) {
                return self.cate_index !== 0 ?
                    el.type === self.cate_index :
                    el;
            });
        },
        // 条件比较器
        compare: function(prop, order) {
            return function(obj1, obj2) {
                order = order || 'desc';

                var flag1, flag2;
                if (order === 'desc') {
                    flag1 = -1;
                    flag2 = 1;
                } else if (order === 'asc') {
                    flag1 = 1;
                    flag2 = -1;
                }

                var val1 = obj1[prop],
                    val2 = obj2[prop];
                if (val2 < val1) {
                    return flag1;
                } else if (val2 > val1) {
                    return flag2;
                } else {
                    return 0;
                }
            }
        },
        // 按销量排序
        sortSales: function() {
            this.list.sort(this.compare('sales'));
        },
        // 按价格排序
        sortPrice: function() {
            var type = this.price_isAsc ? 'desc' : 'asc';
            this.list.sort(this.compare('price', type));
            this.price_isAsc = !this.price_isAsc;
        },
        // 根据排序方式调用对应方法
        sortBy: function(index) {
            this.filter_index = index;
            if (index == 0) {
                this.price_isAsc = false;
                this.setList();
            } else if (index == 1) {
                this.price_isAsc = false;
                this.sortSales();
            } else if (index == 2) {
                this.sortPrice();
            }
        },
        // 添加到购物车
        addToCart: function(goods) {
            // 判断商品是否存在
            var alreadyIndex = this.cart.findIndex(function(item, index) {
                return item.id === goods.id;
            });
            // 如果不存在则添加元素
            if (alreadyIndex === -1) {
                var length = this.cart.length;
                // 购物车商品初始化数量为1
                this.cart.push(goods);
                this.$set(this.cart[length], 'quantity', 1);
                this.$set(this.cart[length], 'subtotal', goods.price.toFixed(1));
                console.log(this.len);
                return;
            }
            var alreadyGoods = this.cart[alreadyIndex];
            // 如果存在，数量加1
            this.$set(alreadyGoods, 'quantity', ++alreadyGoods.quantity);
            this.$set(alreadyGoods, 'subtotal', (alreadyGoods.price * alreadyGoods.quantity).toFixed(1));
        }
    },
    computed: {
        totalPrice: function() {
            var num = 0;
            for (var i in this.cart) {
                var item = this.cart[i];
                num += parseFloat(item.subtotal);
            }
            return num;
        }
    }
})