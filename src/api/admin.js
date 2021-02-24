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

export function delgoodsType(id) {
  return request({
    url: '/goods-type/'+id,
    method: 'delete'
  })
}

export function updateGoodsType(params) {
  return request({
    url: '/goods-type/1',//1只为替代，没有作用
    method: 'patch',
    params:params
  })
}
