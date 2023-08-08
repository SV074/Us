<template>
    <div>

    </div>


</template>

<script>

export default{
    components: {

    },
    data() {
        return {

        }
    },
    methods: {
        searchSpare() {
      console.log(this.input);
      axios.get('http://localhost/sparesurals/findspares', {
        params: {
          name: this.input
        }
      })
        .then(({ data }) => {
          this.categories = data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });
    }
    }
}
</script>

<style> 


</style>