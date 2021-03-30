<template>
  <div class="map card shadow-lg p-1">
    <MglMap
      :accessToken="mapboxAccessToken"
      :mapStyle.sync="mapStyle"
      :center="coordinates"
      :zoom="3"
    >
      <MglMarker :coordinates="coordinates" color="blue" />
    </MglMap>
    <button class="button btn btn-primary" @click="currentLocation">
      <i class="fas fa-crosshairs"></i>
    </button>
  </div>
</template>

<script>
import { MglMap, MglMarker } from 'vue-mapbox'

export default {
  components: {
    MglMap,
    MglMarker
  },
  data () {
    return {
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      coordinates: [-111.549668, 39.014],
      mapboxAccessToken: 'pk.eyJ1IjoiZWtvbXVudGhlIiwiYSI6ImNrbXZnN3BrczA0dDkycHFpMWR3bTEyamIifQ.afTkngjxQNi1IPBfIe_McA'
    }
  },
  methods: {
    currentLocation () {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          console.log(latitude, longitude)
          this.coordinates = [longitude, latitude]
        },
        error => {
          console.log(error.message)
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .map {
    width: 320px;
    height: 240px;
  }
  .button {
      z-index:10;
      position: absolute;
  }
  @media (min-width: 1200px) {
    .map {
      width: 1320px;
      height: 500px;
    }
  }
  @media (min-width: 992px) {
    .map {
      width: 768px;
      height: 500px;
    }
  }
  @media (min-width: 768px) {
    .map {
      width: 576px;
      height: 250px;
    }
  }
  @media (min-width: 576px) {
    .map {
      width: 324px;
      height: 250px;
    }
  }
</style>
