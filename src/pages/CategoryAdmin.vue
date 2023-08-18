<template>
    <el-table :data="categoriesSpares" style="width: 100%">
        <el-table-column class="admin-categories" label="Имя" width="180">
            <template #default="scope">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #default>
                        <div>name: {{ scope.row.name }}</div>
                    </template>
                    <template #reference>
                        <el-tag>{{ scope.row.title }}</el-tag>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="Операции">
            <template #default="scope">
                <el-button size="small" @click="editCategory(scope.row.id)"><el-icon>
                        <Edit />
                    </el-icon></el-button>
                <el-button size="small" type="danger" @click="deleteCategory(scope.row.id)"><el-icon>
                        <Close />
                    </el-icon></el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="">
        <el-input class="input-add-category" v-model="newCategorySpare.title"></el-input>
        <el-input class="input-add-category" v-model="newCategorySpare.name"></el-input>
    </div>
    <el-button class="mt-4" style="width: 100%" @click="addCategory()">Add Item</el-button>
</template>

<script>
import { ElTabs, ElTabPane, ElInput, ElSelect, ElButton, ElDialog, ElDivider, ElDropdown, ElDropdownItem, ElTable, ElTableColumn } from 'element-plus';
import axios from 'axios';

export default {
    // name: 'categoryAdmin',
    components: {
        ElTabs, ElTabPane, ElInput, ElSelect, ElButton, ElDialog, ElDivider, ElDropdown, ElDropdownItem, ElTable, ElTableColumn
    },
    data() {
        return {
            categoriesSpares: [],
            newCategorySpare: {},
            categorySpare: {},
        }
    },
    methods: {
        getCategories() {
            axios.get('http://localhost/sparesurals/categories')
                .then(({ data }) => {
                    this.categoriesSpares = data;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                });
        },
        addCategory() {
            if (this.newCategorySpare.title && this.newCategorySpare.name) {
                console.log(this.categorySpare);
                const newCategory = {
                    title: this.newCategorySpare.title,
                    name: this.newCategorySpare.name
                }
                axios.post('http://localhost/categories/create', newCategory)
                    .then(({ data }) => {
                        console.log(data);
                        this.getCategories();
                        this.newCategorySpare.title = '';
                        this.newCategorySpare.name = '';
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .finally(function () {

                    });
            }
        },
        editCategory(id) {
            console.log(id);
            const updateCategory = {
                title: this.newCategorySpare.title,
                name: this.newCategorySpare.name,
                id: id
            }

            axios.put(`http://localhost/categories/category/${id}/change`, updateCategory)
                .then(({ data }) => {
                    this.category = data;
                    this.getCategories();
                    this.newCategorySpare.title = '';
                    this.newCategorySpare.name = '';
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        },
        deleteCategory(id) {
            console.log(id);
            axios.delete(`http://localhost/categories/category/${id}`)
                .then(({ data }) => {
                    const index = this.categoriesSpares.findIndex(item => item.id === data.id);
                    this.categoriesSpares.splice(index, 1);

                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        }
    },
    mounted() {
        this.getCategories();
    },

}

</script>

<style>
.admin-categories {
    display: flex;
    flex-direction: column;
}

.list-category {
    display: flex;
    flex-direction: column;
}

/* .admin-category {
    display: flex;
    margin: 10px;
} */

.admin-name-category {}

.input-edit-category {
    display: none;
    width: 10%;
}

.admin-name-category:hover .input-edit-category {
    display: block;
}

.input-add-category {
    display: flex;
    margin: 10px;
    width: 50%;
}

/* .cell {
    display: flex;
} */
</style>