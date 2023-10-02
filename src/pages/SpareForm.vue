<template>
    <div class="form-spare">
        <div class="header-form">
            <h3>Запчасть</h3>
        </div>
        <div class="form-inputs">
            <el-form ref="formRef" 
            status-icon 
            :model="spare" 
            :rules="rules" 
            label-width="120px" 
            class="demo-ruleForm">
                <el-form-item label="Название" prop="name">
                    <el-input v-model="spare.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Цена" prop="price">
                    <el-input v-model.number="spare.price" autocomplete="off" placeholder="Цена"/>
                </el-form-item>
                <el-form-item label="Код" prop="code">
                    <el-input v-model.number="spare.code" autocomplete="off" placeholder="Код запчасти"/>
                </el-form-item>
                <el-form-item label="Выбор категории" prop="category_id" label-width="150px">
                    <el-select v-model="spare.category_id" class="select-category" clearable placeholder="Категории">
                        <el-option v-for="category in categories" 
                        :key="category.id" 
                        :label="category.title"
                        :value="category.id" />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <el-button v-if="isCreate" @click="addSpareForm">Создать</el-button>
        <el-button v-else @click="editSpareForm">Редактировать</el-button>
    </div>
</template>

<script>
import { ElInput, ElButton, ElSelect, ElOption, ElForm, ElFormItem } from 'element-plus';
import axios from 'axios';


export default {
    name: 'SpareForm',
    components: {
        ElInput, ElButton, ElSelect, ElOption, ElForm, ElFormItem
    },
    emits: ['create', 'update'],
    props: {
        formData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {

    },
    data() {
        return {
            spare: {
                name: '',
                price: '',
                code: '',
                category_id: '',
            },
            value: null,
            categories: [],
            isCreate: false,
            rules: {
                name: [
                    { required: true, message: 'Пожайлуста введите название', trigger: 'blur' },
                    { type: 'string', message: 'Введите строковое значение' }
                ],
                price: [
                    { required: true, message: 'Пожайлуста введите цену', trigger: 'blur' },
                    { type: 'number', message: 'Введите числовое значение' }
                ],
                code: [
                    { required: true, message: 'Пожайлуста введите код', trigger: 'blur' },
                    { type: 'number', message: 'Введите числовое значение' }
                ],
                category_id: [
                    {
                        required: true,
                        message: 'Пожайлуста выберите категорию запчастей',
                        trigger: 'change',
                    },
                ]
            },
            spareForm: {},
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
        addSpareForm() {
                this.$refs.formRef.validate().then(() => {
                this.$emit('create', this.spare);
            })
        },
        editSpareForm() {
            this.$emit('update', this.spare);
        }
    },
    mounted() {
        this.getCategories();
    },
    watch: {
        formData: {
            handler(spareFormData) {
                if (Object.keys(spareFormData).length > 0) {
                    this.spare = spareFormData;
                    this.isCreate = false;
                    this.value = spareFormData.category_id;
                } else {
                    this.isCreate = true;
                }
            },
            immediate: true
        }
    }
}
</script>

<style>
.form-inputs {
    padding: 20px;
}

.select-category {
    margin: 5px;
}
</style>