<template>
    <div class="admin-menu">
        <el-tabs class="demo-tabs">
            <el-tab-pane label="Основная информация" name="first" tab-click="resetValue">
                <div class="contacts-managers">
                    <div class="contacts-select">
                        <span style="font-weight: bold;">Контакты менеджеров: </span>
                        <el-select v-model="value" class="m-2" clearable placeholder="Менеджеры" size="large"
                            @change="dialogVisible = showDialog">
                            <el-option v-for="contact in listContactsManagers" :key="contact.id" :contact="contact"
                                :label="contact.name" :value="contact.id" @click="showManager(value)">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="input-info">
                        <el-input class="input-name" placeholder="Имя" v-model="contactManager.name"></el-input>
                        <el-input class="input-phone" placeholder="Номер телефона"
                            v-model="contactManager.phone"></el-input>
                        <!-- <el-button class="save-contact-manager">Сохранить</el-button> -->
                    </div>
                    <el-button class="create-contact-manager" @click="createManager()">Добавить менеджера</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Категории" name="second">
                <router-link :to="{ name: 'CategoryAdmin' }"><span style="font-weight: bold;">Категории:
                    </span></router-link>
                <router-view />
            </el-tab-pane>
            <el-tab-pane label="Запчасти" name="third" >
                <!-- <router-link :to="{ name: 'SpareAdmin' }"><span style="font-weight: bold;">Категории:
                    </span></router-link> -->
                <div class="contacts-select">
                    <span style="font-weight: bold;">Категории: </span>
                    <el-select v-model="value" class="m-2" clearable placeholder="Категории" size="large">
                        <el-option v-for="category in categories" :key="category.id" :label="category.title"
                            :value="category.id" @click="getCategorySpares(value)" />
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
                                    <el-button type="primary" size="small" @click.prevent="editSpare(scope.row.id)">
                                        <el-icon>
                                            <Edit />
                                        </el-icon>
                                    </el-button>
                                    <el-button type="danger" size="small" @click.prevent="deleteSpare(scope.$index, scope.row.id)">
                                        <el-icon>
                                            <Close />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button class="" style="width: 100%" @click="showModalSpare()">Добавить запчасть</el-button>
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
    <el-dialog v-model="dialogVisible" title="Информация" width="30%">
        <el-divider />
        <span style="font-size: medium;font-weight: bolder;">Менеджер:</span>
        <div class="input-info-dialog">
            <el-input size="large" class="input-dialog" v-model="selectedManager.name"></el-input>
            <el-input size="large" class="input-dialog" v-model="selectedManager.phone_number"></el-input>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="removeContactManager(this.value)">Удалить</el-button>
                <el-button @click="dialogVisible = false">Закрыть</el-button>
                <el-button type="primary" @click="changeInfoManager()">
                    Изменить
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="showModal" title="Информация о запчасти" width="30%">
        
        <el-input class="input-add-spare-admin" v-model="spare.name" placeholder="Название"></el-input>
        <el-input class="input-add-spare-admin" v-model="spare.price" placeholder="Цена"></el-input>
        <el-input class="input-add-spare-admin" v-model="spare.code" placeholder="Код"></el-input>
        <template #footer>
            <span class="dialog-footer">
                <el-button class="btn-add-spare" @click="addSpare(this.value)">Добавить</el-button>
                <el-button class="btn-add-spare" @click="showModal = false">Закрыть</el-button>
            </span>
        </template>
    </el-dialog>
    <my-modal v-model="show">
        <el-input></el-input>
    </my-modal>
</template>




<script>
import { ElTabs, ElTabPane, ElInput, ElSelect, ElButton, ElDialog, ElDivider, ElDropdown, ElDropdownItem, ElOption, ElTable, ElTableColumn } from 'element-plus';
import axios from 'axios';
import MyModal from '../components/MyModal.vue';

export default {
    name: 'Admin',
    components: {
        ElTabs, ElTabPane, ElInput, ElSelect, ElButton, ElDialog, ElDivider, ElDropdown, ElDropdownItem, ElOption, ElTable, ElTableColumn, MyModal
    },
    data() {
        return {
            listContactsManagers: [],
            value: null,
            dialogVisible: false,
            contactManager: {},
            selectedManager: null,
            categorySpare: {},
            categories: [],
            spares: [],
            show: Boolean,
            showModal: false,
            spare: {

            }
        }
    },
    computed: {
        showDialog() {
            if (this.selectedManager) {
                return true;
            }

        },
        resetValue() {
            this.value = null;
        }
    },
    methods: {
        getContactsManagers() {
            axios.get('http://localhost/contacts')
                .then(({ data }) => {
                    this.listContactsManagers = data;

                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                });
        },
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
        showManager(value) {
            this.selectedManager = this.listContactsManagers.find(item => item.id === this.value);
        },
        changeInfoManager() {

            const updateContact = {
                name: this.value.name,
                phone_number: this.value.phone_number,
                id: this.value.id
            }

            axios.put(`http://localhost/contacts/contact/${updateContact.id}/change`, updateContact)
                .then(({ data }) => {
                    this.value = data;
                    this.dialogVisible = false;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });

        },
        createManager() {
            if (this.contactManager.name && this.contactManager.phone) {
                const newContact = {
                    name: this.contactManager.name,
                    phone: this.contactManager.phone,
                }
                axios.post('http://localhost/contacts/create', newContact)
                    .then(({ data }) => {
                        console.log(data);
                        this.getContactsManagers();
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .finally(function () {

                    });
            }
        },
        removeContactManager(value) {
            axios.delete(`http://localhost/contacts/${value}`)
                .then(({ data }) => {
                    const index = this.listContactsManagers.findIndex(item => item.id === data.id);
                    this.listContactsManagers.splice(index, 1);
                    this.contactManager.name = '';
                    this.contactManager.phone = '';
                    this.value = '';
                    this.dialogVisible = false;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        },
        showModalSpare() {
            this.showModal = true;
            console.log(this.value);
        },
      
        addSpare(value) {
            if (this.spare.name && this.spare.price && this.spare.code) {
                const newSpare = {
                    name: this.spare.name,
                    price: this.spare.price,
                    code: this.spare.code,
                    category_id: value,
            };
                axios.post('http://localhost/spares/add', newSpare)
                    .then(({ data }) => {
                        console.log(data);
                        this.spares.push(data);
                        this.showModal = false;
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .finally(function () {

                    });
            }
        },
        deleteSpare(index, id) {
            console.log(index, id);
            axios.delete(`http://localhost/spares/spare/${id}`)
            .then(({ data }) => {
                        console.log(data);
                        this.spares.splice(index, 1);
                        this.getCategorySpares();
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .finally(function () {

                    });
        }
        
    },
    mounted() {
        this.getContactsManagers();
        this.getCategories();

    },
    created() {

    }
}


</script>

<style>
.admin-menu {
    display: flex;
}

.demo-tabs {
    margin: 0 auto;
}

.el-tabs__item {
    font-size: large !important;
    font-weight: 700 !important;
}

.contacts-managers {
    display: flex;
    flex-direction: column;
}

.input-info {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.input-info-dialog {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.create-contact-manager {
    display: block;
}

.save-contact-manager {
    width: 50%;
}

.input-name,
.input-phone {
    margin: 15px;
}

.input-dialog {
    margin: 15px;
}

.create-contact-manager {
    width: 45%;
}

.buttons-edit-delete-admin {
    display: flex;

}

.input-add-spare-admin {
    margin: 10px;
    width:60%;
}


</style>