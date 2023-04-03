<template>
  <div class="company-content">
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company1">
        <div class="title">نقاط الإيداع والسحب</div>
        <div class="rating">
          <i
            v-for="(rate, ridx) in totalFullStar(
              companyDetail.company1.deposit_withdraw_rating
            )"
            :key="'ratef_' + ridx"
            class="bi bi-star-fill rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalHalfStar(
              companyDetail.company1.deposit_withdraw_rating
            )"
            :key="'rateh_' + ridx"
            class="bi bi-star-half rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalEmptyStar(
              companyDetail.company1.deposit_withdraw_rating
            )"
            :key="'ratee_' + ridx"
            class="bi bi-star rating-color"
          ></i>
          <div class="rating-value">
            ({{ companyDetail.company1.deposit_withdraw_rating }})
          </div>
        </div>
      </div>
    </div>
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company2">
        <div class="title">نقاط الإيداع والسحب</div>
        <div class="rating">
          <i
            v-for="(rate, ridx) in totalFullStar(
              companyDetail.company2.deposit_withdraw_rating
            )"
            :key="'ratef_' + ridx"
            class="bi bi-star-fill rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalHalfStar(
              companyDetail.company2.deposit_withdraw_rating
            )"
            :key="'rateh_' + ridx"
            class="bi bi-star-half rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalEmptyStar(
              companyDetail.company2.deposit_withdraw_rating
            )"
            :key="'ratee_' + ridx"
            class="bi bi-star rating-color"
          ></i>
          <div class="rating-value">
            ({{ companyDetail.company2.deposit_withdraw_rating }})
          </div>
        </div>
      </div>
    </div>
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company3">
        <div class="title">نقاط الإيداع والسحب</div>
        <div class="rating">
          <i
            v-for="(rate, ridx) in totalFullStar(
              companyDetail.company3.deposit_withdraw_rating
            )"
            :key="'ratef_' + ridx"
            class="bi bi-star-fill rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalHalfStar(
              companyDetail.company3.deposit_withdraw_rating
            )"
            :key="'rateh_' + ridx"
            class="bi bi-star-half rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalEmptyStar(
              companyDetail.company3.deposit_withdraw_rating
            )"
            :key="'ratee_' + ridx"
            class="bi bi-star rating-color"
          ></i>
          <div class="rating-value">
            ({{ companyDetail.company3.deposit_withdraw_rating }})
          </div>
        </div>
      </div>
    </div>
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company4">
        <div class="title">نقاط الإيداع والسحب</div>
        <div class="rating">
          <i
            v-for="(rate, ridx) in totalFullStar(
              companyDetail.company4.deposit_withdraw_rating
            )"
            :key="'ratef_' + ridx"
            class="bi bi-star-fill rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalHalfStar(
              companyDetail.company4.deposit_withdraw_rating
            )"
            :key="'rateh_' + ridx"
            class="bi bi-star-half rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalEmptyStar(
              companyDetail.company4.deposit_withdraw_rating
            )"
            :key="'ratee_' + ridx"
            class="bi bi-star rating-color"
          ></i>
          <div class="rating-value">
            ({{ companyDetail.company4.deposit_withdraw_rating }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Watch, Prop } from "nuxt-property-decorator";
import { namespaced } from "~/utils/utils";
import {} from "../../utils/store/action.names";
import {} from "../../utils/store/getter.names";
import {} from "../../utils/store/namespace.names";

@Component({
  name: "DepositWithdraw",
  components: {},
})
export default class DepositWithdraw extends Vue {
  @Prop() companyDetail;

  get HOST() {
    return this.$config.HOST;
  }

  totalFullStar(rating) {
    return Math.floor(rating);
  }

  totalHalfStar(rating) {
    var x = rating - Math.floor(rating);
    if (x > 0.1) {
      return 1;
    }
    return 0;
  }

  totalEmptyStar(rating) {
    var x = 5 - Math.ceil(rating);
    if (x >= 1) {
      return x;
    }
    return 0;
  }
}
</script>

<style scoped lang="scss">
.company-content-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  margin-top: 15px;
  align-items: center;
  .overall-score {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 2px;
    .title {
      font-size: 13px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
