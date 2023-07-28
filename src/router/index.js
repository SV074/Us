import { createRouter, createWebHistory } from "vue-router";
import Certificate from '../pages/Certificate.vue';
import CatalogCategory from '../pages/CatalogCategory.vue';
import Home from '../pages/Home.vue';
import Services from '../pages/Services.vue';
import Category from '../pages/Category.vue';
import Spare from '../pages/Spare.vue';
import Cart from '../pages/Cart.vue';

export default createRouter ({
    history: createWebHistory(),
    routes: [
        { 
            path: '/',
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: Home
                },
                {
                    path: 'catalog',
                    children: [
                        {
                            path: '',
                            name: 'Catalog',
                            component: CatalogCategory
                        },
                        {
                            path: ':category',
                            children: [
                                {
                                    path: '',
                                    name: 'Category',
                                    component: Category
                                },
                                {
                                    path: ':itemId',
                                    name: 'Item',
                                    component: Spare
                                }
                            ] 
                        }
                    ]
                },
                {
                    path: 'service',
                    name: 'Services',
                    component: Services
                },
                {
                    path: 'certificate',
                    name: 'Certificate',
                    component: Certificate
                },
                {
                    path: 'cart',
                    name: 'Cart',
                    component: Cart
                },
            ]
        },
       
    ]
    
})
