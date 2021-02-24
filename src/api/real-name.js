import request from '@/utils/request'


export function realNameList(listQuery) {
  return request({
    url: '/real-name',
    method: 'get',
    params: listQuery
  })
}


export function updateRealName(id,status) {
  return request({
    url: '/real-name/'+id,
    method: 'patch',
    params:{
      status:status
    }
  })
}
