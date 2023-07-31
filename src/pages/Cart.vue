<template>
    <div class="cart-container" style="padding-left: 50px;">
        <div class="cart">
            <el-table :data="cartSparesItems" border style="width: 850px" show-summary sum-text="Сумма">
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
                <el-table-column prop="price" label="Сумма" width="80" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.price*scope.row.quantity }}</span>
                    </template>
                </el-table-column>
                <el-table-column width="70" label="">
                    <template #default="scope">
                        <el-button @click="deleteSpare(scope.$index)" style="border: none;">
                            <Delete style="width: 1em; height: 1em; margin-right: 8px;" />
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { ElButton, ElImage, ElInput, ElMenu, ElCard, ElDialog } from 'element-plus';
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';


export default {
    components: {
        ElImage
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
            'spare'
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
        deleteSpare(spareIndex) {
            //this.removeSpareIdFromCart();
            if (spareIndex > -1) {
                this.cartSparesItems.splice(spareIndex, 1);
                this.$store.state.cartSpares.splice(spareIndex, 1);
            }

        },
        subtractSpare(id, quantity) {
            const needSpare = this.cartSparesItems.find(item => item.id === id);
            if (quantity === 1) {
                const spareIndex = this.cartSparesItems.findIndex(item => item.id === id);
                this.deleteSpare(spareIndex);
            } else {
                needSpare.quantity--;
            }
        },
        addithionSpare(id, quantity) {
            const needSpare = this.cartSparesItems.find(item => item.id === id);
            needSpare.quantity++;
        },
    },
    mounted() {
        this.renderCart();
    },
    created() {

    }
}


</script>