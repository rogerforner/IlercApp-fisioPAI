import db from '@/datastore-locations'

const state = {
  locations: []
}

const mutations = {
  LOAD_LOCATIONS(state, locations) {
    state.locations = locations
  },
  ADD_LOCATION(state, location) {
    state.locations.push(location)
  },
  DELETE_LOCATION(state, location) {
    state.locations = state.locations.filter(n => n._id !== location._id)
  }
}

const actions = {
  loadLocations(store) {
    store.commit('LOADING', true)
    db.find({}, (err, locations) => {
      if (!err) {
        store.commit('LOAD_LOCATIONS', locations)
        store.commit('LOADING', false)
      }
    })
  },
  addLocation(store, location) {
    store.commit('LOADING', true)
    db.insert(location, (err, location) => {
      if (!err) {
        store.commit('ADD_LOCATION', location)
        store.commit('LOADING', false)
      }
    })
  },
  updateLocation(store, location) {
    db.update({
      _id: location._id
    }, location, {}, err => {
      if (!err) {
        store.dispatch('loadLocations')
      }
    })
  },
  deleteLocation(store, location) {
    store.commit('LOADING', true)
    db.remove({
      _id: location._id
    }, {}, err => {
      if (!err) {
        store.commit('DELETE_LOCATION', location)
        store.commit('LOADING', false)
      }
    })
  }
}

const getters = {
  locations: state => state.locations,
  locationById: state => id => state.locations.find(location => location._id === id)
}

export default {
  state,
  mutations,
  actions,
  getters
}