import request from '@/utils/request'


export function storeAgreement(params) {
  return request({
    url: '/agreement',
    method: 'post',
    params: params
  })
}

export function agreementList() {
  return request({
    url: '/agreement',
    method: 'get'
  })
}

export function editAgreement(id) {
  return request({
    url: '/agreement/'+id+'/edit',
    method: 'get'
  })
}

export function updateAgreement(id, content) {
  return request({
    url: '/agreement/'+id,
    method: 'patch',
    params:{'content':content}
  })
}
