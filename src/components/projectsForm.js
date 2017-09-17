// import axios from 'axios'

export class Errors {
  constructor () {
    this.errors = {}
  }
  has (field) {
    return this.errors.hasOwnProperty(field)
  }
  any () {
    return Object.keys(this.errors).length > 0
  }
  get (field) {
    if (Object.keys(this.errors).length === 0) {
      return ''
    } else if (this.errors[field]) {
      return this.errors[field][0]
    } else {
      return this.errors
    }
  }
  record (errors) {
    this.errors = errors
  }
  clear (field) {
    if (this.errors[field]) {
      delete this.errors[field]
    } else {
      this.errors = ''
    }
  }
}

export class Form {
  constructor (data) {
    this.originalData = data
    for (let field in data) {
      this[field] = data[field]
    }
    this.errors = new Errors()
  }
  data () {
    let data = {}
    for (let property in this.originalData) {
      data[property] = this[property]
    }
    return data
  }
  reset () {
    for (let field in this.originalData) {
      this[field] = ''
    }
    this.errors.clear()
  }
  // post(url) {
  //     return this.submit('POST', url);
  // }
  // delete(url) {
  //     return this.submit('DELETE', url);
  // }
  submit (requestType, url) {  // form.submit('POST', '/some-endpoint')
    // return new Promise((resolve, reject) => {
    //   axios[requestType](url, this.data())
    //     .then(response => {
    //       this.onSuccess(response.data)
    //       resolve(response.data)
    //     })
    //     .catch(error => {
    //       this.onFail(error.response.data)
    //       reject(error.response.data)
    //     })
    // })
    return new Promise((resolve, reject) => {
      if (this.data.name !== '') {
        let data = this.data()
        this.onSuccess(data)
        resolve(data)
      } else {
        reject('No data')
      }
    })
  }
  onSuccess (data) {
    alert(data) // temporary
    this.reset()
  }
  onFail (errors) {
    this.errors.record(errors)
  }
}
