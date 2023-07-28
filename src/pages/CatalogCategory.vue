<template>
    <div class="list-categories">
        <ul>
            <li v-for="category in categories" class="category" :key="`${category.id}`">
                <a @click.prevent="goToCategory(category.name)" href="#">{{ category.title }}</a>
            </li>
        </ul>
    </div>
    
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    components: {

    },
    data() {
        return {
          categories: [],
        }
    },
    methods: {
        // ...mapActions([
           
        // ]),
        getCategories() {
            axios.get('http://localhost/sparesurals/categories')
                .then(({ data }) => {
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