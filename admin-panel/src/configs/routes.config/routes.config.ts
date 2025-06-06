import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import Tariffs from "@/pages/core/Tariffs/Tariffs";

export const publicRoutes: Routes = [...authRoute]

const dev =  ['admin','developer']

export const protectedRoutes = [
  {
    key: 'users',
    path: '/users',
    component: lazy(() => import('@/pages/core/Users')),
    authority: dev
  },
  {
    key: 'restaurant',
    path: '/restaurant',
    component: lazy(() => import('@/pages/core/Restaurant/Restaurant')),
    authority: dev
  },
  {
    key: 'account',
    path: '/account',
    component: lazy(() => import('@/pages/core/Account/Profile')),
    authority: dev
  },
  {
    key: 'restaurantCreate',
    path: '/restaurant/create',
    component: lazy(() => import('@/pages/core/Restaurant/steps/FormAboutRest')),
    authority: dev
  },
  {
    key: 'restaurantUploadImage',
    path: '/restaurant/:id/uploadImage',
    component: lazy(() => import('@/pages/core/Restaurant/steps/PhotoStep')),
    authority: dev
  },
  {
    key: 'restaurantEdit',
    path: '/restaurant/edit/:id',
    component: lazy(() => import('@/pages/core/Restaurant/RestaurantEdit')),
    authority: dev
  },
  {
    key: 'statistics',
    path: '/statistics',
    component: lazy(() => import('@/pages/core/Statistics')),
    authority: dev
  },
  {
    key: 'tariffs',
    path: '/tariffs',
    component: lazy(() => import('@/pages/core/Tariffs/Tariffs')),
    authority: []
  },
  {
    key: 'tariffs',
    path: '/tariffs/edit',
    component: lazy(() => import('@/pages/core/Tariffs/TariffsEdit')),
    authority: dev
  },
  {
    key: 'menu',
    path: '/menu',
    component: lazy(() => import('@/pages/core/Menu/Menu')),
    authority: dev
  },
  {
    key: 'menuCreate',
    path: '/menu/create',
    component: lazy(() => import('@/pages/core/Menu/steps/AboutMenu')),
    authority: dev,
  },
  {
    key: 'menuUpdate',
    path: '/menu/:id',
    component: lazy(() => import('@/pages/core/Menu/steps/AboutMenu')),
    authority: dev,
  },
  {
    key: 'menuAddCategories',
    path: '/menu/:id/categories',
    component: lazy(() => import('@/pages/core/Menu/steps/Categories')),
    authority: dev,
    state: {
      nextStep: '/categories',
      prevStep: '/'
    },
  },
  {
    key: 'menuAddDishes',
    path: '/menu/:id/dishes',
    component: lazy(() => import('@/pages/core/Menu/steps/Dishes')),
    authority: dev,
    state: {
      nextStep: '/modifiers',
      prevStep: '/categories'
    },
  },
  {
    key: 'menuAddModifiers',
    path: '/menu/:id/modifiers',
    component: lazy(() => import('@/pages/core/Menu/steps/Modifiers')),
    authority: dev,
    state: {
      prevStep: '/dishes'
    },
  },
]
