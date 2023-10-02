<template>
    <div class="card">
        <div class="name-spare"><span>{{ spare.name }}</span></div>
        <el-card class="card-spare">
            <el-image class="spare-image" :src="spare.url" />
            <div class="spare-info" style="padding: 14px">
                <div class="price-spare"><span>{{ spare.price }}</span></div>
                <div class="bottom">
                    <el-button @click="buySpare(spare.id)" class="button" text-color="white" color="#fea712">Купить</el-button>
                </div>
                <span><strong>Код:</strong>{{ spare.code }}</span>
            </div>
        </el-card>
    </div>
</template>
    
 
 
<script>
import axios from 'axios';
import { ElButton, ElImage, ElInput, ElMenu, ElCard, ElDialog } from 'element-plus';
import { mapActions } from 'vuex'

export default{
    components: {
        ElButton, ElImage, ElInput, ElMenu, ElCard, ElDialog,
    },
    data() {
        return {
          spare: {

          },
        }
    },
    methods: {
        ...mapActions([
            'addSpareIdToCart'
        ]),
        renderSpare(id) {
            axios.get(`http://localhost/sparesurals/spare/${id}`)
                .then(({ data }) => {
                    this.spare = data;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        },
        buySpare(itemId) {
            this.addSpareIdToCart(itemId);
            
            console.log(localStorage.length);
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (itemId) => {
                this.renderSpare(itemId.itemId);
            }
        )
        //this.spare = this.$store.state.spare;
    },
    mounted() {

    }


}



</script>