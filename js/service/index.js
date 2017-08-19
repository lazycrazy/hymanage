 import _ from 'lodash'

 import store from 'src/store'


 import { api_url } from '../env'

 async function AdminFetch(url, params, method = 'get') {

     let query = ''
     if (method === 'get' && params) {
         query += '?'
         for (let [key, value] of Object.entries(params))
             query += key + '=' + encodeURIComponent(value) + '&';
     }
     let init = { credentials: 'include', method, }
     if (method === "POST" && params) {
         init.body = JSON.stringify(params)
         init.headers = { 'Content-Type': 'application/json' }
     }
     return fetch(api_url + url + query, init).then(res => res.json())
 }

 let AdminAPI = {
     async login(data) {
         return AdminFetch("/login", data, "POST")
     },
     async signup(data) {
         return AdminFetch("/Register", data, "POST")
     },
     async signout() {
         return AdminFetch('/logout')
     },
     async getAdminInfo() {
         return AdminFetch('/account')
     },
     async getApps() {
         return AdminFetch(`/apps`)
     },
     async getGzhs() {
         return AdminFetch(`/gzhs`)
     },
     async getSyncs(data) {
         return AdminFetch(`/syncs`,data)
     },
     async getAuthorize(data) {
         return AdminFetch(`/authorize`,data,'POST')
     },
     async refreshToken(data){
         return AdminFetch(`/refreshtoken`,data,'POST')
     },
     async uploadMember(data){
         return AdminFetch(`/uploadMember`,data,'POST')
     },
     async downloadMember(data){
         return AdminFetch(`/downloadMember`,data,'POST')
     },
     async startScheduler(){
         return AdminFetch(`/startScheduler`,null,'POST')
     },
     async stopScheduler(){
         return AdminFetch(`/stopScheduler`,null,'POST')
     },



     userCount(date) {
         return AdminFetch(`/statis/api/${date}/count`)
     },
     orderCount(date) {
         return AdminFetch(`/statis/api/${date}/count`)
     },
     apiAllCount(date) {
         return AdminFetch(`/statis/api/count`)
     },
     getOrderCount(date) {
         return AdminFetch(`/statis/api/count`)
     },
     adminDayCount(date) {
         return AdminFetch(`/statis/api/${date}/count`)
     },
     adminCount(date) {
         return AdminFetch(`/statis/api/count`)
     },
     getUserCount(date) {
         return AdminFetch(`/admin/count`)
     },
     getUserList(data) {
         return AdminFetch(`/admin`, data)
     },
     cityGuess() {
         return AdminFetch('/city')
     },
     addShop(data) {
         let token = store.token || getStorage('token')

         if (!token) {
             return { status: 0, message: '没有token' }
         }
         var form = new FormData()
         form.append("json", JSON.stringify(data))
         return fetch(api_url + "/addshop", {
                 headers: {
                     'Authorization': 'Bearer ' + token
                 },
                 method: "POST",
                 body: form
             })
             .then(res => res.json())
     },
     searchplace(data) {
         return AdminFetch(`/searchplace`, data)
     },
     foodCategory(data) {
         return AdminFetch(`/admin`, data)
     },
     getResturants(data) {
         return AdminFetch('/shop', data)
     },
     getResturantsCount(data) {
         return AdminFetch('/shop/count', data)
     },
     deleteResturant(id) {
         let token = store.token || getStorage('token')

         if (!token) {
             return { status: 0, message: '没有token' }
         }
         return fetch(api_url + "/shop/" + id, {
                 headers: {
                     'Authorization': 'Bearer ' + token
                 },
                 method: "DELETE"
             })
             .then(res => res.json())
     }
 }

 export {
     AdminAPI
 }


 export const setStorage = (key, value) => {
     if (!key) return
     // if (typeof value !== 'string')
     value = JSON.stringify(value)
     window.localStorage.setItem(key, value)
 }

 export const getStorage = key => {
     return JSON.parse(window.localStorage.getItem(key))
 }

 export const removeStorage = key => {
     window.localStorage.removeItem(key)
 }