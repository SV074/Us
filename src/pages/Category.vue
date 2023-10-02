<template>
    <div class="content">
        <div class="name-category">
            <h2 class=""></h2>
        </div>
        <el-select v-model="value" class="m-2 select-option" placeholder="Выбор" size="large">
            <el-option v-for="item in options" @click="sortSpares(value)" 
            :key="item.id" 
            :label="item.name"  
            :value="item.id" />
        </el-select>
        <div class="catalog-spares">
            <div class="card-spare-catalog" v-for="spare in spares" :key="spare.id">
                <div class="card-catalog">
                    <el-card class="">
                        <div class="spare-image-catalog">
                            <el-image style="width: 240px; height: 205px" class="" :src="spare.url" />
                        </div>
                        <div class="spare-info-catalog" style="padding: 14px">
                            <div class="name-spare-catalog"><span><a @click="goToSpare(spare.id)" href="#">{{ spare.name
                            }}</a></span>
                            </div>
                            <div class="price-spare-catalog"><span>{{ spare.price }}</span></div>
                            <div class="bottom">
                                <el-button @click="buySpare(spare.id)" class="button" text-color="white" color="#fea712"
                                    plain>Купить</el-button>
                            </div>
                            <div class="spare-code-catalog"><strong>Код:</strong>{{ spare.code }}</div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ElButton, ElImage, ElInput, ElMenu, ElCard, ElDialog, ElMessage, ElSelect, ElOption } from 'element-plus';
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        ElButton, ElImage, ElInput, ElMenu, ElCard, ElDialog, ElSelect, ElOption
    },
    data() {
        return {
            spares: [],
            options: [
                { name: 'по возрастанию цены', title: 'price', id: 1 },
                { name: 'по убыванию цены', title: 'code', id: 2 }
            ],
            value: null,
        }
    },
    methods: {
        ...mapActions([
            'addSpareIdToCart'
        ]),
        getCategorySpares() {
            axios.get(`http://localhost/sparesurals/categories/spares`, {
                params: {
                    category: this.$route.params.category,
                }
            })
                .then(({ data }) => {
                    this.spares = data;
                })
                .catch(({ response }) => {
                    if (response.status === 404) {
                        ElMessage({
                            message: "Такой категории не существует!",
                            type: "error"
                        })
                        this.$router.push({ name: 'Catalog' })
                    }
                })
                .finally(function () {

                });
        },
        goToSpare(spareId) {
            this.$router.push({ name: 'Item', params: { itemId: spareId } });
        },

        buySpare(itemId) {
            this.addSpareIdToCart(itemId);
        },
        sortSpares(value) {
            console.log(value);
            if(value === 1) {
                this.spares = this.spares.sort((a, b) => a.price - b.price);
            } else if (value = 2) {
                this.spares = this.spares.sort((a, b) => b.price - a.price);
            }
        }
        
    },
    mounted() {
        this.getCategorySpares();
    },
    created() {

    }
    // watch: {
    //     '$route.params.category'(value) {
    //         console.log(value);
    //     }
    // }
}

</script>

<style>
.select-option {
    margin-left: 90px;
    margin-bottom: 20px;
}


</style>