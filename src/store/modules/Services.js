import db from '@/datastore-services'

const state = {
  services: []
}

const mutations = {
  LOAD_LOCATIONS(state, services) {
    state.services = services
  },
  ADD_LOCATION(state, service) {
    state.services.push(service)
  },
  DELETE_LOCATION(state, service) {
    state.services = state.services.filter(n => n._id !== service._id)
  }
}

const actions = {
  loadServices(store) {
    store.commit('LOADING', true)
    db.find({}, (err, services) => {
      if (!err) {
        store.commit('LOAD_LOCATIONS', services)
        store.commit('LOADING', false)
      }
    })
  },
  addService(store, service) {
    store.commit('LOADING', true)
    db.insert(service, (err, service) => {
      if (!err) {
        store.commit('ADD_LOCATION', service)
        store.commit('LOADING', false)
      }
    })
  },
  updateService(store, service) {
    db.update({
      _id: service._id
    }, service, {}, err => {
      if (!err) {
        store.dispatch('loadServices')
      }
    })
  },
  deleteService(store, service) {
    store.commit('LOADING', true)
    db.remove({
      _id: service._id
    }, {}, err => {
      if (!err) {
        store.commit('DELETE_LOCATION', service)
        store.commit('LOADING', false)
      }
    })
  }
}

const getters = {
  services: state => state.services,
  serviceById: state => id => state.services.find(service => service._id === id)
}

export default {
  state,
  mutations,
  actions,
  getters
}