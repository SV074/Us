<template>
    <div class="admin-menu">
        <el-tabs class="demo-tabs" v-model="tabName" @tab-change="changeTabName">
            <el-tab-pane label="Основная информация" name="main">
               <main-information />
            </el-tab-pane>
            <el-tab-pane label="Категории" name="categories">
            <category-admin />
            </el-tab-pane>
            <el-tab-pane label="Запчасти" name="spares" >
               <spare-admin />
            </el-tab-pane>
       </el-tabs>
    </div>
</template>




<script>
import { ElTabs, ElTabPane, ElInput, ElSelect, ElButton, ElDialog, ElDivider, ElDropdown, ElDropdownItem, ElOption, ElTable, ElTableColumn } from 'element-plus';
import axios from 'axios';
import MyModal from '../components/MyModal.vue';
import CategoryAdmin from '../pages/CategoryAdmin.vue';
import MainInformation from '../pages/MainInformation.vue';
import SpareAdmin from '../pages/SpareAdmin.vue';

export default {
    name: 'Admin',
    components: {
        ElTabs, ElTabPane, ElInput, ElSelect, ElButton, ElDialog, ElDivider, ElDropdown, ElDropdownItem, ElOption, ElTable, ElTableColumn, MyModal,
        CategoryAdmin, MainInformation, SpareAdmin
    },
    data() {
        return {
            tabName: 'main',
            categorySpare: {},
            categories: [],
           
        }
    },
    computed: {
       
    },
    methods: {
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
        getCategorySpares(value) {
            axios.get(`http://localhost/sparesurals/admin/spares`, {
                params: {
                    category: value,
                }
            })
                .then(({ data }) => {
                    this.spares = data;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        },
        changeTabName(name) {
            this.$router.replace({ path: '/admin', hash: '#' + name});
        },
    },
    mounted() {
        this.getCategories();
        this.tabName = location.hash.replace('#', '');
        this.tabName = 'main';
    },
    created() {

    }
}


</script>

<style>


</style>