import request from '@/utils/request'

export function storeGoodsType(params) {
  return request({
    url: '/goods-type',
    method: 'post',
    params: params
  })
}

export function goodsTypeList(listQuery) {
  return request({
    url: '/goods-type',
    method: 'get',
    params: listQuery
  })
}

export function editGoodsType(id) {
  return request({
    url: '/goods-type/'+id+'/edit',
    method: 'get'
  })
}

export function updateGoodsType(id,params) {
  return request({
    url: '/goods-type/'+id,
    method: 'patch',
    params:params
  })
}

export function changeGoodsType(id,params) {
  return request({
    url: '/goods-type-status/'+id,
    method: 'post',
    params:params
  })
}
