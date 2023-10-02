<template>
    <div class="cart-container" style="padding-left: 50px;">
        <div class="cart">
            <el-table :data="cartSparesItems" border style="width: 800px;" show-summary sum-text="Сумма"
                :summary-method="getSum">
                <el-table-column label="Фото" width="100" align="center">
                    <template #default="scope">
                        <el-image class="spare-image-cart" :src="scope.row.url" />
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="Информация" width="180" align="center" />
                <el-table-column prop="price" label="Цена" width="70" />
                <el-table-column prop="price.length" label="Кол-во" width="100" align="center">
                    <template #default="scope">
                        <el-button @click="subtractSpare(scope.row.id, scope.row.quantity)" style="width: 7.5px"><el-icon>
                                <Minus />
                            </el-icon></el-button>
                        <span style="width: 10px">{{ scope.row.quantity }}</span>
                        <el-button @click="addithionSpare(scope.row.id, scope.row.quantity)" style="width: 7.5px"><el-icon>
                                <Plus />
                            </el-icon></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="sum" label="Сумма" width="80" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.price * scope.row.quantity }}</span>
                    </template>
                </el-table-column>
                <el-table-column width="70" label="">
                    <template #default="scope">
                        <el-button @click="deleteSpare(scope.$index, scope.row.id)" style="border: none;">
                            <Delete style="width: 1em; height: 1em; margin-right: 8px;" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { ElButton, ElImage, ElTable, ElTableColumn, ElIcon } from 'element-plus';
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';



export default {
    components: {
        ElImage, ElTable, ElTableColumn, ElButton, ElIcon
    },
    data() {
        return {
            cartSparesItems: [],
            spare: {

            },
        }
    },
    computed: {
        ...mapGetters([
            'cartSpares',

        ])
    },
    methods: {
        ...mapActions([
            'removeSpareIdFromCart'
        ]),
        renderCart() {
            axios.get(`http://localhost/sparesurals/cart`, {
                params: {
                    spares_ids: this.cartSpares,
                }
            })
                .then(({ data }) => {
                    console.log(data);

                    this.cartSparesItems = data;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });

        },
        deleteSpare(spareIndex, spareId) {
            if (spareIndex > -1) {
                this.cartSparesItems.splice(spareIndex, 1);
                this.removeSpareIdFromCart(spareId);
                localStorage.setItem('cartId', JSON.stringify(this.cartSpares));
            }
        },
        subtractSpare(id, quantity) {
            const needSpare = this.cartSparesItems.find(item => item.id === id);
            if (quantity === 1) {
                const spareIndex = this.cartSparesItems.findIndex(item => item.id === id);
                this.deleteSpare(spareIndex, id);
            } else {
                needSpare.quantity--;
            }
        },
        addithionSpare(id, quantity) {
            const needSpare = this.cartSparesItems.find(item => item.id === id);
            needSpare.quantity++;
        },
        getSum(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = 'Всего'
                    return
                }
                const values = Array.from(data).map(item => item.price * item.quantity)
                sums[4] = `${values.reduce((prev, curr) => {
                    const value = Number(curr)
                    if (!Number.isNaN(value)) {
                        return prev + curr
                    } else {
                        return prev
                    }
                }, 0)}`
            })
            return sums
        },
    },
    mounted() {
        if (localStorage.length > 0) {
            this.$store.state.cartSpares = JSON.parse(localStorage.getItem('cartId'));
        }
        this.renderCart();
    },
    created() {

    }
}


</script>