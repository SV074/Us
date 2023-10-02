<template>
    <div class="list-categories">
        <el-breadcrumb separator="/" >
        <el-breadcrumb-item :to = "{ path: ''}"><a href="/">Главная</a></el-breadcrumb-item>
            <el-breadcrumb-item v-for="category in categories" class="category" :key="`${category.id}`"><a @click.prevent="goToCategory(category.name)" href="/">{{ category.title }}</a></el-breadcrumb-item>
        </el-breadcrumb>
        <h3>Каталог</h3>
        <div class="cards-categories">
            <div class="card-category-catalog" v-for="category in categories" :key="category.id">
            <div class="card-catalog">
                <el-card class="">
                    <div class="spare-image-catalog">
                        <el-image style="width: 240px; height: 205px" class="" :src="category.url" />
                    </div>
                    <div class="spare-info-catalog" style="padding: 14px">
                        <div class="name-spare-catalog"><span><a @click="goToCategory(category.name)" href="#">{{ category.title }}</a></span>
                        </div>
                        
                    </div>
                </el-card>
            </div>
        </div></div>
        
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { ElBreadcrumb, ElBreadcrumbItem, ElCard } from 'element-plus';

export default {
    components: {
        ElBreadcrumb, ElBreadcrumbItem, ElCard
    },
    data() {
        return {
            categories: [],
        }
    },
    methods: {
        ...mapActions([

        ]),
        getCategories() {
            axios.get('http://localhost/sparesurals/categories')
                .then(({ data }) => {
                    console.log(data);  
                    this.categories = data;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                });
        },
        goToCategory(categoryName) {
            this.$router.push({ name: 'Category', params: { category: categoryName } })
        }
    },
    mounted() {
        this.getCategories();

    },

}



</script>

<style>
.cards-categories {
    display: flex;
    flex-wrap: wrap;
}

.card-category-catalog {
   
}


</style>