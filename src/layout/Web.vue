<template>
    <div class="header">
        <div class="inner">
            <div class="icon-name-company">
                <div class="icon">
                    <el-image style="width: 100px; height: 80px" :src="image"></el-image>
                </div>
                <div class="company">
                    <span class="name-company">ТК «УралСбыт»</span>
                    <span class="info">Запчасти к а/м Урал</span>
                </div>
            </div>
            <div class="search">
                <el-input size="large" style="width: 315px" placeholder="Поиск по сайту" v-model="input">
                    <template #suffix>
                        <router-link to="/search">
                            <el-icon class="el-input__icon">
                                <search />
                            </el-icon>
                        </router-link>
                    </template>
                </el-input>
            </div>
            <div class="contacts-managers-mail">
                <div class="contacts">
                    <span v-for="contact of contactsManagers" :key="contact.id"><strong>{{ contact.phone_number
                    }}</strong>{{ contact.name }}</span>
                </div>
                <div class="mail-call">
                    <a class="mail" href="">le4138@bk.ru</a>
                    <a class="call" href="">Обратный звонок</a>
                </div>
            </div>
            <div class="cart" style="margin-left: 20px;">
                <div>
                    <h1>
                        <el-badge :value="`${Array.from(new Set(this.$store.state.cartSpares)).length}`">
                            <router-link to="/cart"><el-icon class="icon-cart" style="width: 40px;height: 35px;">
                                    <ShoppingCart />
                                </el-icon>
                            </router-link>
                        </el-badge>
                    </h1>
                </div>
            </div>

        </div>
    </div>
    <div class="horizontal-menu">
        <div class="menu">
            <el-menu class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">Главная</el-menu-item>
                <el-sub-menu index="2">
                    <template style="font-weight: normal;font-size: 15px;" #title>О компании</template>
                    <el-menu-item index="2-1">Полезная информация</el-menu-item>
                    <el-menu-item index="2-2">
                        <router-link to="/reviews">Отзывы</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-3">Видео</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="3">
                    <router-link to="/certificate">Сертификаты</router-link>
                </el-menu-item>
                <el-menu-item index="4">Производство</el-menu-item>
                <el-menu-item index="5">
                    <router-link to="/catalog">Каталог</router-link>
                </el-menu-item>
                <el-menu-item index="6">
                    <router-link :to="{ name: 'Services' }">Услуги</router-link>
                </el-menu-item>
                <el-menu-item index="7">Литейное производство</el-menu-item>
                <el-menu-item index="8">Покупателю</el-menu-item>
                <el-menu-item index="9">Контакты</el-menu-item>
            </el-menu>
        </div>
    </div>
    <div class="catalog">
        <div class="catalog-menu">
            <div class="vertical-menu">
                <el-menu class="el-menu-demo" mode="vertical" style="width:260px;">
                    <el-sub-menu index="new">
                        <template #title>Новинки</template>
                    </el-sub-menu>
                    <el-sub-menu v-for="item in categories" :key="item.id" :index="`${item.id}`">
                        <template #title><a @click.prevent="goToCategory(item.name)" href="#">{{ item.title
                        }}</a></template>
                    </el-sub-menu>
                    <el-sub-menu index="total">
                        <template #title>Тотальная распродажа!!</template>
                    </el-sub-menu>
                </el-menu>
                <div class="review">
                    <div class="review-container">
                        <div class="review-name">Отзывы</div>
                        <el-row class="review-content">
                            <div class="name-client">
                                Павел Олегович
                            </div>
                            <div class="text-review">
                                Компания ООО «ТК«УралСбыт» в рамках государственного контракта выполняла работы по закупу
                                зап.частей к а/м
                                «Урал».
                                Работы были выполнены в полной мере в заранее оговоренные сроки, а также в полном
                                соответствии с условиями
                                заключенного контракта и СНиП, установленными действующим законодательством. В ходе
                                выполнения своих
                                обязательств компания ООО «ТК«УралСбыт» оперативно и профессионально справлялась с
                                поставленными задачами,
                                максимально учитывая наши пожелания, как Заказчика.
                                Надеемся на взаимовыгодное и плодотворное сотрудничество в будущем.
                            </div>
                        </el-row>
                    </div>
                </div>
            </div>
            <router-view />
        </div>
    </div>
    <div class="map">
        <div class="map-container">
            <h3 class="find-us">КАК НАС НАЙТИ</h3>
            <div class="map-yandex" style="position:relative;overflow:hidden;"><a
                    href="https://yandex.ru/maps/11212/miass/?utm_medium=mapframe&utm_source=maps"
                    style="color:#eee;font-size:12px;position:absolute;top:0px;">Миасс</a><a
                    href="https://yandex.ru/maps/11212/miass/?ll=60.125408%2C55.080187&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=60.125226%2C55.080181&whatshere%5Bzoom%5D=17&z=19.2"
                    style="color:#eee;font-size:12px;position:absolute;top:14px;">55.080181,60.125226 —
                    Яндекс Карты</a><iframe
                    src="https://yandex.ru/map-widget/v1/?ll=60.125408%2C55.080187&mode=whatshere&utm_source=main_stripe_big&whatshere%5Bpoint%5D=60.125226%2C55.080181&whatshere%5Bzoom%5D=17&z=19.2"
                    width="100%" height="400" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe>
            </div>
        </div>

    </div>
    <footer>
        <div class="footer">
            <div class="menu">
                <el-menu class="el-menu-demo" mode="horizontal" background-color="#409f3b">
                    <el-menu-item index="1">Главная</el-menu-item>
                    <el-sub-menu index="2">
                        <template style="font-weight: normal;font-size: 15px;" #title>О компании</template>
                        <el-menu-item index="2-1">Полезная информация</el-menu-item>
                        <el-menu-item index="2-2">
                            <router-link to="/reviews">Отзывы</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-3">Видео</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="3">
                        <router-link to="/certificate">Сертификаты</router-link>
                    </el-menu-item>
                    <el-menu-item index="4">Производство</el-menu-item>
                    <el-menu-item index="5">
                        <router-link to="/catalog">Каталог</router-link>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <router-link :to="{ name: 'Services' }">Услуги</router-link>
                    </el-menu-item>
                    <el-menu-item index="7">Литейное производство</el-menu-item>
                    <el-menu-item index="8">Покупателю</el-menu-item>
                    <el-menu-item index="9">Контакты</el-menu-item>
                </el-menu>
            </div>
        </div>
    </footer>
</template>

<script>

import { ElButton, ElImage, ElInput, ElMenu, ElCard, ElDialog } from 'element-plus';
import imageLogo from "../assets/logo.png";
import { Calendar, Search } from '@element-plus/icons-vue';
import axios from 'axios';


export default {
    name: 'Web',
    components: {
        ElButton, ElImage, ElInput, ElMenu, ElCard, ElDialog, Calendar, Search,
    },
    data() {
        return {
            image: imageLogo,
            categories: [],
            input: '',
            contactsManagers: [],
        }
    },
    computed: {

    },
    methods: {
        goToCategory(categoryName) {
            console.log(categoryName);
            this.$router.push({ name: 'Category', params: { category: categoryName } })
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
        goToSearchSpare() {
            console.log(this.input);
        },
        getContactsManagers() {
            axios.get('http://localhost/contacts')
                .then(({ data }) => {
                    this.contactsManagers = data;
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
    }
}


</script>

<style>
.map {}

.map-container {
    display: flex;
    flex-direction: column;
    background: #f4f4f4;
    padding: 50px;
}

.find-us {}

.map-yandex {
    border: none;

}

footer {}

.footer {
    display: flex;
    background: #409f3b;
    height: 200px;
}</style>
