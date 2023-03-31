<template>
  <div class="rarity-dropdown" v-on-clickaway="hideDropdown">
    <div class="top">
      <p>Categories</p>
    </div>

    <div class="filter-wrapper">
      <div class="categories">
        <button
          class="category-btn"
          :class="{ active: selectedCategory == '' }"
          @click="handleApply('')"
        >
          All
        </button>
        <button
          class="category-btn"
          :class="{ active: selectedCategory == item.id }"
          @click="handleApply(item)"
          v-for="(item, idx) in data"
          :key="'cat_' + idx"
        >
          {{ item.title }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";

@Component({
  name: "NewsArticleFilter",
})
export default class NewsArticleFilter extends Vue {
  @Prop() filterData;
  @Prop() data;

  selectedCategory = "";

  @Watch("filterData", { immediate: true })
  handleFilterDataChange(val, oldVal) {
    this.selectedCategory = val.selectedCategory;
  }

  handleApply(item) {
    if (item) {
      var params = {
        selectedCategory: item.id,
        categoryTitle: item.title,
      };
    } else {
      var params = {
        selectedCategory: "",
        categoryTitle: "",
      };
    }

    this.$emit("apply", params);
  }

  hideDropdown() {
    this.$emit("hide-filter-dropdown");
  }
}
</script>

<style lang="scss" scoped>
.rarity-dropdown {
  position: absolute;
  top: 54px;
  left: 0;
  padding: 25px 0px 40px;
  width: 270px;
  background: #1f3241;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  z-index: 1;

  .top {
    border-bottom: 1px solid #f1f1f1;

    p {
      font-weight: 500;
      font-size: 18px;
      line-height: 16px;
      color: $primary-color;
      padding: 0 18px 20px;
      margin: 0;
    }
  }

  .filter-wrapper {
    padding: 20px 18px 16px;

    .categories {
      margin-bottom: 25px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;

      .category-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background: white;
        box-shadow: 0px 4px 4px rgba(21, 25, 60, 0.25);
        border-radius: 5px;
        border: none;
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        color: black;
      }

      .active {
        background: grey;
        color: white;
      }

      .mb-10 {
        margin-bottom: 10px;
      }
    }

    .sort-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      color: $secondary-color;
      margin-bottom: 18px !important;
    }

    .name {
      margin-bottom: 25px;

      .gap-20 {
        gap: 20px;
      }
    }

    .price {
      margin-bottom: 25px;
    }

    .form-check {
      margin-bottom: 10px;
    }

    .form-check-label {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: rgba(255, 255, 255, 0.75);
      margin-left: 5px;
    }

    .form-check-input {
      width: 20px;
      height: 20px;
      margin-top: 0;
      background: transparent;
      border: 1.5px solid #cfcfcf;

      &:checked {
        background: linear-gradient(90deg, #dc5ced 0%, #25e1fb 100%);
        border: 3.5px solid #15193c;
        outline-offset: -1px;
        outline-style: solid;
        outline-color: #ffffff;
        outline-width: 1.5px;
      }

      &:checked ~ label {
        color: $primary-color !important;
      }

      &:focus {
        box-shadow: none;
      }
    }
  }

  .bottom {
    padding: 25px 18px 40px;

    span {
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      color: $primary-color;
    }

    .toggle-switch {
      position: relative;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      label {
        width: 100%;
        height: 24px;
        background-color: #8195ae;
        border-radius: 50px;
        cursor: pointer;
      }

      input {
        position: absolute;
        display: none;

        &:checked ~ .slider {
          background: linear-gradient(180deg, #6b36fc 0%, #d894e6 100%);
        }

        &:checked ~ .slider::before {
          transform: translateX(15px);
          background-color: $primary-color;
          box-shadow: none;
        }
      }

      .slider {
        position: absolute;
        width: 40px;
        height: 24px;
        border-radius: 50px;
        transition: 0.3s;

        &::before {
          content: "";
          position: absolute;
          top: 2px;
          left: 3px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: $primary-color;
          transition: 0.3s;
        }
      }
    }
  }

  .apply {
    padding: 0 18px;

    .apply-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 234px;
      height: 38px;
      background: $button-bg;
      border-radius: 50px;
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      color: $primary-color;
      border: none;
    }
  }
}
</style>
