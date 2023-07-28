<template>
    <div class="cart-container" style="padding-left: 50px;">
        <div class="cart">
            <el-table :data="cartSparesItems" border style="width: 850px" show-summary sum-text="Сумма">
                <el-table-column label="Фото" width="100" align="center">
                    <template #default="scope">
                        <el-image class="spare-image-cart" :src="scope.row.url"/>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="Информация" width="180" align="center"/>
                <el-table-column prop="price" label="Цена" width="70" />
                <el-table-column prop="price.length" label="Кол-во" width="100" align="center" >
                <template #default="scope">
                    <el-button  @click="subtractSpare" style="width: 7.5px" ><el-icon><Minus /></el-icon></el-button>
                    <span style="width: 10px">{{ scope.row.quantity }}</span>
                    <el-button  @click="addithionSpare" style="width: 7.5px"><el-icon ><Plus /></el-icon></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="Сумма" width="80" align="center"/>
                <el-table-column width="70" label="">
                    <template #default="scope">
                    <el-button @click="deleteSpare(scope.$index)" style="border: none;"><Delete style="width: 1em; height: 1em; margin-right: 8px;" /></el-button>
                    </template>
                </el-table-column>
                
            </el-table>
            <!-- <div v-for="spare in cartSpares" :key="spare.id">
                <span>{{ spare.name }}</span>
                <span>{{ spare.price }}</span>
                <span>{{ spare.quantity }}</span>
            </div> -->
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
            'cartSpares'
        ])
    },
    methods: {
       
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
           
            if(spareIndex > -1) {
                this.cartSpares.splice(spareIndex, 1);
                this.$store.state.cartSpares.splice(spareIndex, 1);
            }
            
        },
        subtractSpare() {
            this.count -= 1;
        },
        addithionSpare() {
            this.count += 1;
        },
        addProp(prop) {
            this.spare['prop'] = 1;
        },


        
    },
    mounted() {
        this.renderCart();
    },
    created() {
     
    }
}


</script>