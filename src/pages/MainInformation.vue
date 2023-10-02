<template>
    <div class="contacts-managers">
        <div class="contacts-select">
            <span style="font-weight: bold;">Контакты менеджеров: </span>
            <el-table :data="listContactsManagers" style="width: 100%">
                <el-table-column prop="name" label="Имя" width="180" class="table-column">
                    <template #default="scope">
                        <el-input v-if="scope.row.show_input" v-model="newManager.name" class="input-name-manager-admin"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="phone_number" label="Номер телефона" width="150" class="number-phone-manager" >
                    <template #default="scope" >
                        <el-input v-if="scope.row.show_input" v-model="newManager.phone_number"></el-input>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="Операции" width="200">
                    <template #default="scope">
                        <el-button link type="primary" v-if="!scope.row.show_button" size="small" @click="editContactManager(scope.row, scope.$index)">Редактировать</el-button>
                        <el-button link type="primary" v-if="scope.row.show_button" size="small" @click="saveEditContactManager(scope.row)">Сохранить</el-button>
                        <el-button link type="danger" size="small"
                            @click="removeContactManager(scope.row.id)">Удалить</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <el-button v-if="!showButton" class="create-contact-manager" @click="addNewManager()">Добавить менеджера</el-button>
        <el-button v-if="showButton" @click="saveNewManager()">Сохранить</el-button>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import { ElInput, ElSelect, ElButton, ElDialog, ElDivider, ElTable, ElTableColumn } from 'element-plus';
import { timePanelSharedProps } from 'element-plus/es/components/time-picker/src/props/shared';

export default {
    name: 'MainInformation',
    components: {
        ElDialog, ElInput, ElSelect, ElButton, ElDivider, ElTable, ElTableColumn
    },
    data() {
        return {
            listContactsManagers: [],
            dialogVisible: false,
            contactManager: {},
            selectedManager: null,
            newManager: {
                name: null,
                phone_number: null,
            },
            showButton: false,
        }
    },
    computed: {
       
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
        changeInfoManager() {
            
            const updateContact = {
                name: this.contactManager.name,
                phone_number: this.contactManager.phone_number,
                id: this.contactManager.id
            }

            axios.put(`http://localhost/contacts/contact/${updateContact.id}/change`, updateContact)
                .then(({ data }) => {
                    this.contactManager = data;
                    this.dialogVisible = false;
                    this.contactManager.name = '';
                    this.contactManager.phone_number = '';
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });

        },
        addNewManager() {
            this.showButton = true;
            this.newManager.show_input = true;
            this.listContactsManagers.push(this.newManager);
        },
        saveNewManager() {
            if (this.newManager.name && this.newManager.phone_number) {
               
               const newContact = {
                   name: this.newManager.name,
                   phone: this.newManager.phone_number,
               }
               axios.post('http://localhost/contacts/create', newContact)
                   .then(({ data }) => {
                        this.getContactsManagers();
                        this.newManager.name = '';
                        this.newManager.phone_number = '';
                    })
                   .catch(function (error) {
                       console.log(error);
                   })
                   .finally(function () {

                   });
           } else {
                this.newManager.show_input = false;
                this.listContactsManagers.splice(this.listContactsManagers.length - 1, 1);
           }
           this.showButton = false;
        },
        editContactManager(element, index) {
            element.show_button = true;
            element.show_input = true;
            this.newManager = element;

        },
        saveEditContactManager() {
            const updateContact = {
                name: this.newManager.name,
                phone_number: this.newManager.phone_number,
                id: this.newManager.id
            }

            axios.put(`http://localhost/contacts/contact/${updateContact.id}/change`, updateContact)
                .then(({ data }) => {
                    this.newManager = data;
                    this.newManager.show_input = false;
                    this.getContactsManagers();
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
                
        },
        removeContactManager(id) {
            axios.delete(`http://localhost/contacts/${id}`)
                .then(({ data }) => {
                    const index = this.listContactsManagers.findIndex(item => item.id === data.id);
                    this.listContactsManagers.splice(index, 1);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
        },
        showDialog(scope) {
            this.dialogVisible = true;
            this.contactManager = scope;
        },
       
    },
    mounted() {
        this.getContactsManagers();
        
    }
}


</script>

<style>
.noborder {
    border: none;
}

.table-column {

}

.input-name-manager-admin {
    background: transparent !important;
    border: none !important;
 
}


</style>