import { createRouter, createWebHistory } from "vue-router";
import Certificate from '../pages/Certificate.vue';
import CatalogCategory from '../pages/CatalogCategory.vue';
import Home from '../pages/Home.vue';
import Services from '../pages/Services.vue';
import Category from '../pages/Category.vue';
import Spare from '../pages/Spare.vue';
import Cart from '../pages/Cart.vue';
import Reviews from '../pages/Reviews.vue';
import Search from '../pages/Search.vue';
import Admin from '../pages/Admin.vue';
import Web from '../layout/Web.vue';
import CategoryAdmin from '../pages/CategoryAdmin.vue';
import SpareAdmin from '../pages/SpareAdmin.vue';

export default createRouter ({
    history: createWebHistory(),
    routes: [
        { 
            path: '/',
            component: Web ,
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
                {
                    path: 'reviews',
                    name: 'Reviews',
                    component: Reviews
                },
                {
                    path: 'search',
                    name: 'Search',
                    component: Search
                },
                
            ]
        },
        {
            path: '/admin',
            component: Admin,
            children: [
                    {
                    path: '/admin/category',
                    name: 'CategoryAdmin',
                    component: CategoryAdmin
                    },
                    {
                        path: '/admin/spares',
                        name: 'SpareAdmin',
                        component: SpareAdmin
                        },
                    
                
               
            ]
        },
    ]
    
})
