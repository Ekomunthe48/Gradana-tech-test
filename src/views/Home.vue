<template>
  <div>
    <h3 class="mb-3 text-center">Gradana Technical Test API</h3>
    <div class="container d-flex justify-content-center flex-wrap">
      <div class="">
        <Camera />
      </div>
      <div class="content p-1 w-100">
        <div class="row p-2">
          <div class="col-12 col-md-6">
            <FormLocation :location_data="location_data" />
          </div>
          <div class="col-12 col-md-6">
            <div class="card border border-3 border-success shadow-sm ml-2 p-2" v-if="province">
              <h4>Location Card</h4>
              <table style="text-align:left">
                <tr>
                  <td>Province</td>
                  <td>:</td>
                  <td>{{province}}</td>
                </tr>
                <tr>
                  <td>District</td>
                  <td>:</td>
                  <td>{{district}}</td>
                </tr>
                <tr>
                  <td>Sub District</td>
                  <td>:</td>
                  <td>{{subDistrict}}</td>
                </tr>
                <tr>
                  <td>Village</td>
                  <td>:</td>
                  <td>{{village}}</td>
                </tr>
                <tr>
                  <td>Postal Code</td>
                  <td>:</td>
                  <td>{{postalCode}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="align-content-center mb-3">
        <Map />
      </div>
    </div>
  </div>
</template>

<script>
import FormLocation from '../components/FormLocation'
import Camera from '../components/Camera.vue'
import Map from '../components/Map.vue'

export default {
  name: 'Home',
  components: {
    Map,
    FormLocation,
    Camera
  },
  data () {
    return {
      province: null,
      district: null,
      subDistrict: null,
      village: null,
      postalCode: null
    }
  },
  methods: {
    location_data: function ({ province, district, subDistrict, village, postalCode }) {
      this.province = province
      this.district = district
      this.subDistrict = subDistrict
      this.village = village
      this.postalCode = postalCode
    }
  }
}
</script>
