<template>
    <div class="contacts-select">
        <span style="font-weight: bold;">Категории: </span>
        <el-select v-model="value" class="m-2" clearable placeholder="Категории" size="large">
            <el-option v-for="category in categories" :key="category.id" :label="category.title" :value="category.id"
                @click="getCategorySpares(value)" />
        </el-select>
    </div>
    <div class="admin-list-spares">
        <el-table :data="spares" style="width: 100%" max-height="250">
            <el-table-column label="Фото" width="100" align="center">
                <template #default="scope">
                    <el-image class="spare-image-cart" :src="scope.row.url" />
                </template>
            </el-table-column>
            <el-table-column prop="name" label="Название" width="100" />
            <el-table-column prop="price" label="Цена" width="60" />
            <el-table-column prop="code" label="Код" width="100" />
            <el-table-column fixed="right" label="" width="120">
                <template #default="scope">
                    <div calss="buttons-edit-delete-admin">
                        <el-button type="primary" size="small" @click="showModalEditSpare(scope.row)">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                        <el-button type="danger" size="small"
                            @click.prevent="deleteSpare(scope.$index, scope.row.id)">
                            <el-icon>
                                <Close />
                            </el-icon>
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <my-modal v-model:show="dialogVisible">
            <spare-form @create="addSpare" @update="editSpare" :formData="spareModalData">
            </spare-form>
        </my-modal>
        <el-button class="show-modal" @click="showModalAddSpare">Добавить запчасть</el-button>
    </div>
</template>

<script>
import { ElInput, ElSelect, ElButton, ElOption, ElTable, ElTableColumn, ElNotification } from 'element-plus';
import axios from 'axios';
import MyModal from '../components/MyModal.vue';
import SpareForm from './SpareForm.vue';

export default {
    name: 'SpareAdmin',
    components: {
        ElSelect, ElButton, ElTable, ElTableColumn, ElOption, MyModal, ElInput, SpareForm, ElNotification 
    },
    data() {
        return {
            value: null,
            spares: [],
            spareModalData: {},
            categories: [],
            dialogVisible: false,
        }
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
        addSpare(element) {
            const newSpare = {
                name: element.name,
                price: String(element.price),
                code: String(element.code),
                category_id: +element.category_id,
            };
            axios.post('http://localhost/spares/add', newSpare)
                .then(({ data }) => {
                    this.spares.push(data);
                    this.dialogVisible = false;
                    this.getCategorySpares(data.category_id);
                    ElNotification({
                        message: 'Запчасть создана!',
                        type: 'success',
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        },
        editSpare(element) {
            const updateSpare = {
                name: element.name,
                price: element.price,
                code: element.code,
                id: element.id,
                category_id: +element.category_id,
            }

            axios.put(`http://localhost/spares/${element.id}`, updateSpare)
                .then(({ data }) => {
                    this.spare = data;
                    this.dialogVisible = false;
                    this.getCategorySpares(element.category_id);
                    ElNotification({
                        message: 'Информация запчасти отредактирована',
                        type: 'success'
                    })
               })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        },
        deleteSpare(index, id, categoryId) {
            axios.delete(`http://localhost/spares/spare/${id}`)
                .then(({ data }) => {
                    this.spares.splice(index, 1);
                    ElNotification({
                        message: 'Запчасть удалена!',
                        type: 'info',
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        },
        showModalAddSpare() {
            this.dialogVisible = true;
            this.spareModalData = {};
        },
        showModalEditSpare(spareData) {
            this.dialogVisible = true;
            this.spareModalData = spareData;
        },
    },
    mounted() {
        this.getCategories();
    }
}

</script>

<style>
.show-modal {
    margin-top: 20px;
    align-items: center;
}


</style>