<template>
    <div class="reviews">
        <el-button type="success" size="large" class="btn-review">Написать отзыв</el-button>
        <div v-for="review in reviews" class="review-client">
        <div class="name-client">
            {{ review.client_name }}
        </div>
        <div class="text-review">
            {{ review.text }}
        </div>
    </div>
    </div>
   
</template>

<script>
import axios from 'axios';

export default {
    components: {

    },
    data() {
        return {
            reviews: [],
        }
    },
    methods: {
        getReviews() {
      axios.get('http://localhost/reviews')
        .then(({ data }) => {
          this.reviews = data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });
        }
    },
    mounted() {
        this.getReviews();
    }
}

</script>

<style>
.btn-review {
    margin: 50px;
}

.review-client {
    padding: 15px 15px;
}

.name-client {
    padding: 10px ;
}

.text-review {
    padding: 5px;
}

</style>