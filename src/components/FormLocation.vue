<template>
  <div>
    <div class="input-group mb-3">
      <label class="input-group-text" for="province">Province</label>
      <select class="form-select" id="province" v-model="data.province" :disabled="!options.province">
        <option v-for="(val,key) in options.province" :key="key" :value="{name:val,id:key}">{{val}}</option>
      </select>
    </div>
    <div class="input-group mb-3">
      <label class="input-group-text" for="district">District</label>
      <select class="form-select" id="district" v-model="data.district" :disabled="!options.district">
        <option v-for="(val,key) in options.district" :key="key" :value="{name:val,id:key}">{{val}}</option>
      </select>
    </div>
    <div class="input-group mb-3">
      <label class="input-group-text" for="subDistrict">Sub-District</label>
      <select class="form-select" id="subDistrict" v-model="data.subDistrict" :disabled="!options.subDistrict">
        <option v-for="(val,key) in options.subDistrict" :key="key" :value="{name:val.name,postalCode:val.postalCode,villages:val.villages}">{{val.name}}</option>
      </select>
    </div>
    <div class="input-group mb-3">
      <label class="input-group-text" for="village">Village</label>
      <select class="form-select" id="village" v-model="data.village" :disabled="!options.village">
        <option v-for="(val,key) in options.village" :key="key" :value="{name:val}">{{val}}</option>
      </select>
    </div>
    <div>
      <button class="btn btn-primary" :class="(data.village ? '' : 'disabled')" @click="showLocation">Show</button>
    </div>
  </div>
</template>

<script>
import axios from '../api/axios'
export default {
  props: ['location_data'],
  data () {
    return {
      data: {
        province: null,
        district: null,
        subDistrict: null,
        village: null,
        postalCode: null
      },
      options: {
        province: null,
        district: null,
        subDistrict: null,
        village: null,
        postalCode: null
      }
    }
  },
  methods: {
    showLocation: function () {
      this.location_data({
        province: this.data.province.name,
        district: this.data.district.name,
        postalCode: this.data.postalCode,
        village: this.data.village.name,
        subDistrict: this.data.subDistrict.name
      })
    }
  },
  watch: {
    'data.province.id': function (provinceID) {
      this.options.subDistrict = null
      this.options.village = null
      this.data.subDistrict = null
      this.data.village = null
      axios({
        url: `list_kotakab/${provinceID}.json?print=pretty`,
        methods: 'GET'
      })
        .then(({ data }) => {
          this.options.district = data
        })
        .catch(console.error)
    },
    'data.district.id': function (districtID) {
      this.options.village = null
      this.data.village = null
      axios({
        url: `kota_kab/${districtID}.json?print=pretty`,
        methods: 'GET'
      })
        .then(({ data }) => {
          const newData = []
          data.forEach(districtData => {
            const idxSubDistrict = newData.findIndex(subDistrict => subDistrict.name === districtData.kecamatan)
            if (idxSubDistrict < 0) {
              newData.push({
                name: districtData.kecamatan,
                postalCode: districtData.kodepos,
                villages: [districtData.kelurahan]
              })
            } else {
              newData[idxSubDistrict].villages.push(districtData.kelurahan)
            }
          })
          this.options.subDistrict = newData
        })
        .catch(console.error)
    },
    'data.subDistrict': function (subDistrictID) {
      this.options.village = subDistrictID.villages
      this.data.postalCode = subDistrictID.postalCode
    }
  },
  mounted () {
    axios({
      url: 'list_propinsi.json?print=pretty',
      methods: 'GET'
    })
      .then(({ data }) => {
        this.options.province = data
      })
      .catch(console.error)
  }
}
</script>

<style>

</style>
