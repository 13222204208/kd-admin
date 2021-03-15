import request from '@/utils/request'


export function orderList(query) {
  return request({
    url: '/order',
    method: 'get',
    params: query
  })
}

export function delOrder(id) {
  return request({
    url: '/order/'+id,
    method: 'delete',
  })
}

export function editOrder(id) {
  return request({
    url: '/order/'+id+'/edit',
    method: 'get'
  })
}

export function updateOrder(id, params) {
  return request({
    url: '/order/'+id,
    method: 'patch',
    params:params
  })
}

export function changeOrder(id, params) {
  return request({
    url: '/change-order/'+id,
    method: 'post',
    params:params
  })
}
