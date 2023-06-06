<template>
  <div class="company-content">
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company1">
        <div class="title">المجموع النهائي</div>
        <div class="rating">
          <i
            v-for="(rate, ridx) in totalFullStar(
              companyDetail.company1.overal_evaluation
            )"
            :key="'ratef_' + ridx"
            class="bi bi-star-fill rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalHalfStar(
              companyDetail.company1.overal_evaluation
            )"
            :key="'rateh_' + ridx"
            class="bi bi-star-half rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalEmptyStar(
              companyDetail.company1.overal_evaluation
            )"
            :key="'ratee_' + ridx"
            class="bi bi-star rating-color"
          ></i>
          <div class="rating-value">
            ({{ companyDetail.company1.overal_evaluation }})
          </div>
        </div>
      </div>
      <div class="recommendation" v-if="companyDetail.company1">
        <div
          v-html="
            renderLocaleField(
              companyDetail.company1,
              'recommendation_text',
              $i18n.locale
            )
          "
        ></div>
      </div>
      <div class="origin-country" v-if="companyDetail.company1">
        <div class="title">بلد المنشأ</div>
        <div class="country-name">
          {{ companyDetail.company1.origin_branch.name }}
        </div>
      </div>
    </div>
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company2">
        <div class="title">المجموع النهائي</div>
        <div class="rating">
          <i
            v-for="(rate, ridx) in totalFullStar(
              companyDetail.company2.overal_evaluation
            )"
            :key="'ratef_' + ridx"
            class="bi bi-star-fill rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalHalfStar(
              companyDetail.company2.overal_evaluation
            )"
            :key="'rateh_' + ridx"
            class="bi bi-star-half rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalEmptyStar(
              companyDetail.company2.overal_evaluation
            )"
            :key="'ratee_' + ridx"
            class="bi bi-star rating-color"
          ></i>
          <div class="rating-value">
            ({{ companyDetail.company2.overal_evaluation }})
          </div>
        </div>
      </div>
      <div class="recommendation" v-if="companyDetail.company2">
        <div
          v-html="
            renderLocaleField(
              companyDetail.company2,
              'recommendation_text',
              $i18n.locale
            )
          "
        ></div>
      </div>
      <div class="origin-country" v-if="companyDetail.company2">
        <div class="title">بلد المنشأ</div>
        <div class="country-name">
          {{ companyDetail.company2.origin_branch.name }}
        </div>
      </div>
    </div>
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company3">
        <div class="title">المجموع النهائي</div>
        <div class="rating">
          <i
            v-for="(rate, ridx) in totalFullStar(
              companyDetail.company3.overal_evaluation
            )"
            :key="'ratef_' + ridx"
            class="bi bi-star-fill rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalHalfStar(
              companyDetail.company3.overal_evaluation
            )"
            :key="'rateh_' + ridx"
            class="bi bi-star-half rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalEmptyStar(
              companyDetail.company3.overal_evaluation
            )"
            :key="'ratee_' + ridx"
            class="bi bi-star rating-color"
          ></i>
          <div class="rating-value">
            ({{ companyDetail.company3.overal_evaluation }})
          </div>
        </div>
      </div>
      <div class="recommendation" v-if="companyDetail.company3">
        <div
          v-html="
            renderLocaleField(
              companyDetail.company3,
              'recommendation_text',
              $i18n.locale
            )
          "
        ></div>
      </div>
      <div class="origin-country" v-if="companyDetail.company3">
        <div class="title">بلد المنشأ</div>
        <div class="country-name">
          {{ companyDetail.company3.origin_branch.name }}
        </div>
      </div>
    </div>
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company4">
        <div class="title">المجموع النهائي</div>
        <div class="rating">
          <i
            v-for="(rate, ridx) in totalFullStar(
              companyDetail.company4.overal_evaluation
            )"
            :key="'ratef_' + ridx"
            class="bi bi-star-fill rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalHalfStar(
              companyDetail.company4.overal_evaluation
            )"
            :key="'rateh_' + ridx"
            class="bi bi-star-half rating-color"
          ></i>
          <i
            v-for="(rate, ridx) in totalEmptyStar(
              companyDetail.company4.overal_evaluation
            )"
            :key="'ratee_' + ridx"
            class="bi bi-star rating-color"
          ></i>
          <div class="rating-value">
            ({{ companyDetail.company4.overal_evaluation }})
          </div>
        </div>
      </div>
      <div class="recommendation" v-if="companyDetail.company4">
        <div
          v-html="
            renderLocaleField(
              companyDetail.company4,
              'recommendation_text',
              $i18n.locale
            )
          "
        ></div>
      </div>
      <div class="origin-country" v-if="companyDetail.company4">
        <div class="title">بلد المنشأ</div>
        <div class="country-name">
          {{ companyDetail.company4.origin_branch.name }}
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
import { renderLocaleField } from "../../utils/utils";

@Component({
  name: "BasicData",
  components: {},
})
export default class BasicData extends Vue {
  @Prop() companyDetail;
  renderLocaleField = renderLocaleField;

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
  .recommendation {
    width: 70%;
    @media (max-width: 700px) {
      width: 90%;
    }
    div {
      text-align: center;
      line-height: 1.25rem;
    }
  }
  .origin-country {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
    .title {
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }
    .country-name {
      font-size: 13px;
      font-weight: 400;
    }
  }
}
</style>
