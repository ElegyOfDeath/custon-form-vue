<!--地址选择器-->
<template>
  <div>
    <div class="address-select">
      <el-select
        v-model="localProvince"
        clearable
        placeholder="省/自治区"
        size="mini"
        @change="provinceChange"
      >
        <el-option
          v-for="province in provinceList"
          :key="province.value"
          :value="province.value"
          :label="province.label"
        />
      </el-select>
      <el-select
        v-model="localCity"
        clearable
        placeholder="市"
        size="mini"
        @change="cityChange"
      >
        <el-option
          v-for="city in cityList"
          :key="city.value"
          :value="city.value"
          :label="city.label"
        />
      </el-select>
      <el-select
        v-model="localPrefecture"
        clearable
        placeholder="县/区"
        size="mini"
        @change="prefectureChange"
      >
        <el-option
          v-for="prefecture in prefectureList"
          :key="prefecture.value"
          :value="prefecture.value"
          :label="prefecture.label"
        />
      </el-select>
    </div>
    <!-- 提示文字 -->
    <InputTextItem
      v-if="showDetail"
      v-model="localDetail"
      :maxLength="100"
      :enableEmpty="true"
      label=""
      inputPlaceholder="详细地址"
      inputType="textarea"
      placement="bottom"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import InputTextItem from "../ConfigItem/InputTextItem.vue";

@Component({
  components: {
    InputTextItem
  }
})
export default class AddressSelectItem extends Vue {
  @Prop() province?: string; // 省
  @Prop() city?: string; // 市
  @Prop() prefecture?: string; // 区。县
  @Prop() detail?: string;
  @Prop({ type: Boolean, default: true }) showDetail?: boolean;

  localProvince = this.province;
  localCity = this.city;
  localPrefecture = this.prefecture;
  localDetail = this.detail;
  provinceList: Array<any> = [];

  get cityList(): Array<any> {
    const data = this.provinceList.find(el => el.value === this.localProvince);
    if (data && data.children) {
      return data.children;
    }
    return [];
  }
  get prefectureList(): Array<any> {
    const data = this.cityList.find(el => el.value === this.localCity);
    if (data && data.children) {
      return data.children;
    }
    return [];
  }

  // 省市联动
  provinceChange() {
    this.localCity = "";
    this.localPrefecture = "";
    this.localDetail = "";
  }
  // 市县联动
  cityChange() {
    this.localPrefecture = "";
    this.localDetail = "";
  }
  // 区详细地址联动
  prefectureChange() {
    this.localDetail = "";
  }
  // 传递地址给父组件
  dataChange() {
    const {
      localProvince: province,
      localCity: city,
      localPrefecture: prefecture,
      localDetail: detail
    } = this.$data;
    this.$emit("getData", { province, city, prefecture, detail });
  }

  @Emit("getData")
  addressEmit() {
    const {
      localProvince: province,
      localCity: city,
      localPrefecture: prefecture,
      localDetail: detail
    } = this.$data;
    return { province, city, prefecture, detail };
  }

  @Watch("localProvince")
  @Watch("localCity")
  @Watch("localPrefecture")
  @Watch("localDetail")
  addressHandler() {
    this.addressEmit;
  }
}
</script>
<style scoped lang="scss">
.address-select {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
}
</style>
