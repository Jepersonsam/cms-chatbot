import { ReceiptRussianRuble } from 'lucide-vue-next'
import api from './api'

export default {
    getAll(){
        return api.get('/roles')
    },
    create(data) {
        return api.post('/roles', data)
    },
    update(id, data){
        return api.put(`/roles/${id}`, data)
    },
    delete(id){
        return api.delete(`/roles/${id}`)
    },
    getPermissions(){
        return api.get('/permissions')
    }
}